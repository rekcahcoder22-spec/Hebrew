import { nanoid } from "nanoid";
import { connectDB } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import { SettingsModel } from "@/models/Settings";
import type { BrandSettings, Product } from "@/types";

const DEFAULT_SETTINGS: BrandSettings = {
  dropDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  dropTitle: "DROP 001 - THE ADORE COLLECTION",
  heroTagline: "ROOTED IN THE STREETS. WRITTEN IN STONE.",
  announcement: "FREE SHIPPING ON ORDERS OVER 1,000,000 ₫",
  instagramUrl: "",
  tiktokUrl: "",
  adminPassword:
    "$2a$10$fef59OoILdLzIoQfdhK4X.PY/cV68mQXPQO3g5xNOAxM4D2w2dULS", // "hebrew123"
};

/** Mongo may still store the old hero / banner title; migrate once when read. */
function shouldMigrateDropTitle(title: string): boolean {
  const t = title.trim();
  if (!t) return false;
  if (/covenant collection/i.test(t)) return true;
  if (/^covenant ss/i.test(t)) return true;
  return false;
}

type ProductLike = Product & {
  stock?: Record<string, number> | Map<string, number>;
};

function clampRating(value: number): number {
  return Math.min(5, Math.max(1, Math.round(value * 10) / 10));
}

function fallbackRatingFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const normalized = (hash % 11) / 10; // 0.0 -> 1.0
  return clampRating(4 + normalized); // 4.0 -> 5.0
}

function getProductRating(product: Pick<Product, "id" | "rating">): number {
  if (typeof product.rating === "number" && Number.isFinite(product.rating)) {
    return clampRating(product.rating);
  }
  return fallbackRatingFromId(product.id);
}

function normalizeStock(
  stock: ProductLike["stock"],
): Record<string, number> {
  if (!stock) return {};
  if (stock instanceof Map) {
    return Object.fromEntries(stock);
  }
  return Object.fromEntries(Object.entries(stock));
}

function docToProduct(doc: ProductLike): Product {
  return {
    id: doc.id,
    name: doc.name,
    rating: getProductRating(doc),
    price: doc.price,
    originalPrice: doc.originalPrice,
    description: doc.description,
    images: doc.images ?? [],
    category: doc.category,
    sizes: doc.sizes ?? [],
    stock: normalizeStock(doc.stock),
    stockStatus: doc.stockStatus,
    tags: doc.tags ?? [],
    featured: Boolean(doc.featured),
    isNew: Boolean(doc.isNew),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function getProducts(): Promise<Product[]> {
  await connectDB();
  const docs = await ProductModel.find({}).sort({ createdAt: -1 }).lean<Product[]>();
  return docs.map((doc) => docToProduct(doc));
}

export async function getProductById(id: string): Promise<Product | null> {
  await connectDB();
  const doc = await ProductModel.findOne({ id }).lean<Product | null>();
  return doc ? docToProduct(doc) : null;
}

/** @deprecated use getProductById */
export async function getProduct(id: string): Promise<Product | null> {
  return getProductById(id);
}

export async function saveProducts(products: Product[]): Promise<void> {
  await connectDB();
  await ProductModel.deleteMany({});
  if (products.length > 0) {
    await ProductModel.insertMany(products);
  }
}

export async function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">,
): Promise<Product> {
  await connectDB();
  const id = `hb-${nanoid(10)}`;
  const now = new Date().toISOString();
  const doc = await ProductModel.create({
    ...data,
    rating: getProductRating({ id, rating: data.rating }),
    id,
    createdAt: now,
    updatedAt: now,
  });
  return docToProduct(doc.toObject() as Product);
}

export async function updateProduct(
  id: string,
  data: Partial<Product>,
): Promise<Product | null> {
  await connectDB();
  const patch = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined),
  ) as Partial<Product>;
  const doc = await ProductModel.findOneAndUpdate(
    { id },
    {
    ...patch,
    updatedAt: new Date().toISOString(),
    },
    { new: true },
  ).lean<Product | null>();
  return doc ? docToProduct(doc) : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  await connectDB();
  const res = await ProductModel.deleteOne({ id });
  return res.deletedCount === 1;
}

export async function getSettings(): Promise<BrandSettings> {
  await connectDB();
  const doc = await SettingsModel.findOne({ key: "brand" }).lean<{
    key: string;
    value: BrandSettings;
  } | null>();
  const value = doc?.value ?? DEFAULT_SETTINGS;
  if (doc && shouldMigrateDropTitle(value.dropTitle)) {
    const next: BrandSettings = {
      ...value,
      dropTitle: DEFAULT_SETTINGS.dropTitle,
    };
    await SettingsModel.findOneAndUpdate(
      { key: "brand" },
      { key: "brand", value: next },
      { upsert: true, new: true },
    );
    return next;
  }
  return value;
}

export async function saveSettings(settings: BrandSettings): Promise<void> {
  await connectDB();
  await SettingsModel.findOneAndUpdate(
    { key: "brand" },
    { key: "brand", value: settings },
    { upsert: true, new: true },
  );
}

export type PublicBrandSettings = Omit<BrandSettings, "adminPassword">;

export function toPublicSettings(
  settings: BrandSettings,
): PublicBrandSettings {
  const { adminPassword, ...rest } = settings;
  void adminPassword;
  return rest;
}

