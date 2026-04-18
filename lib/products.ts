import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import type { BrandSettings, Product } from "@/types";

const dataDir = path.join(process.cwd(), "data");
const DATA_FILE = path.join(process.cwd(), "data", "products.json");
const settingsPath = path.join(dataDir, "settings.json");

function readProductsRaw(): Product[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

function writeProductsFile(products: Product[]): void {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

export function getProducts(): Product[] {
  return readProductsRaw();
}

export function getProductById(id: string): Product | null {
  return getProducts().find((p) => p.id === id) ?? null;
}

/** @deprecated use getProductById */
export function getProduct(id: string): Product | null {
  return getProductById(id);
}

export function saveProducts(products: Product[]): void {
  writeProductsFile(products);
}

export function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">,
): Product {
  const id = `hb-${nanoid(10)}`;
  const now = new Date().toISOString();
  const product: Product = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  };
  const all = getProducts();
  all.push(product);
  writeProductsFile(all);
  return product;
}

export function updateProduct(
  id: string,
  data: Partial<Product>,
): Product | null {
  const all = getProducts();
  const idx = all.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  const prev = all[idx];
  const patch = Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined),
  ) as Partial<Product>;
  const merged: Product = {
    ...prev,
    ...patch,
    id,
    updatedAt: new Date().toISOString(),
  };
  all[idx] = merged;
  writeProductsFile(all);
  return merged;
}

export function deleteProduct(id: string): boolean {
  const all = getProducts();
  const next = all.filter((p) => p.id !== id);
  if (next.length === all.length) return false;
  writeProductsFile(next);
  return true;
}

export function getSettings(): BrandSettings {
  const raw = fs.readFileSync(settingsPath, "utf-8");
  return JSON.parse(raw) as BrandSettings;
}

export function saveSettings(settings: BrandSettings): void {
  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
}

export type PublicBrandSettings = Omit<BrandSettings, "adminPassword">;

export function toPublicSettings(
  settings: BrandSettings,
): PublicBrandSettings {
  const { adminPassword, ...rest } = settings;
  void adminPassword;
  return rest;
}

