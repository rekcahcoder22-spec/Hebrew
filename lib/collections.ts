import { connectDB } from "@/lib/mongodb";
import { getProducts } from "@/lib/products";
import {
  CollectionModel,
  type CollectionDocument,
  type CollectionProductFilter,
} from "@/models/Collection";
import type { Collection, Product, PublicCollection } from "@/types";

const DEFAULT_HOME_SLUG = "signals";
const ADORE_SLUG = "adore";

const DEFAULT_HOME: Omit<
  Collection,
  "createdAt" | "updatedAt"
> = {
  slug: DEFAULT_HOME_SLUG,
  title: "SIGNALS",
  subtitle: "DROP 001 — LIMITED PIECES",
  viewAllHref: "/shop",
  isHome: true,
  active: true,
  order: 0,
  productFilter: { mode: "featured", limit: 24 },
  layout: { columnsLg: 4 },
};

/** Built-in ADORE: mọi sản phẩm có tag `adore` (không phụ thuộc category). */
const ADORE_COLLECTION_UPSERT: Omit<
  Collection,
  "createdAt" | "updatedAt"
> = {
  slug: ADORE_SLUG,
  title: "ADORE",
  subtitle: "CONCEPT — mọi piece gắn tag adore",
  viewAllHref: "/collections/adore",
  isHome: false,
  active: true,
  order: 1,
  productFilter: {
    mode: "tag",
    tag: "adore",
    limit: 48,
  },
  layout: { columnsLg: 4 },
};

export function toPublicCollection(c: Collection): PublicCollection {
  return { ...c };
}

/** New listings first (by createdAt), then most recently touched. */
function sortNewest(list: Product[]): Product[] {
  return [...list].sort((a, b) => {
    const ca = new Date(a.createdAt).getTime();
    const cb = new Date(b.createdAt).getTime();
    if (cb !== ca) return cb - ca;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

function narrowByCategories(
  products: Product[],
  categories: string[] | undefined,
): Product[] {
  const allow = categories?.map((c) => c.trim()).filter(Boolean) ?? [];
  if (allow.length === 0) return products;
  const set = new Set(allow);
  return products.filter((p) => set.has(p.category));
}

function applyProductFilter(
  products: Product[],
  filter: CollectionProductFilter,
): Product[] {
  const limit = Math.min(Math.max(filter.limit ?? 24, 1), 100);

  switch (filter.mode) {
    case "featured":
      return sortNewest(products.filter((p) => p.featured)).slice(0, limit);
    case "tag": {
      const tag = filter.tag?.trim().toLowerCase();
      if (!tag) return [];
      const tagged = products.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === tag),
      );
      return sortNewest(narrowByCategories(tagged, filter.categories)).slice(
        0,
        limit,
      );
    }
    case "category": {
      const cat = filter.category?.trim();
      if (!cat) return [];
      return sortNewest(products.filter((p) => p.category === cat)).slice(
        0,
        limit,
      );
    }
    case "ids": {
      const ids = filter.ids?.filter(Boolean) ?? [];
      if (ids.length === 0) return [];
      const map = new Map(products.map((p) => [p.id, p]));
      const ordered: Product[] = [];
      for (const id of ids) {
        const p = map.get(id);
        if (p) ordered.push(p);
      }
      return ordered.slice(0, limit);
    }
    case "all":
    default: {
      return sortNewest(products).slice(0, limit);
    }
  }
}

async function ensureBuiltinCollections(): Promise<void> {
  await connectDB();
  const homeExists = await CollectionModel.exists({ slug: DEFAULT_HOME_SLUG });
  if (!homeExists) {
    await CollectionModel.create({
      ...DEFAULT_HOME,
      productFilter: { ...DEFAULT_HOME.productFilter },
    });
  }

  await CollectionModel.findOneAndUpdate(
    { slug: ADORE_SLUG },
    {
      $set: {
        title: ADORE_COLLECTION_UPSERT.title,
        subtitle: ADORE_COLLECTION_UPSERT.subtitle,
        viewAllHref: ADORE_COLLECTION_UPSERT.viewAllHref,
        isHome: ADORE_COLLECTION_UPSERT.isHome,
        active: ADORE_COLLECTION_UPSERT.active,
        order: ADORE_COLLECTION_UPSERT.order,
        productFilter: { ...ADORE_COLLECTION_UPSERT.productFilter },
        layout: ADORE_COLLECTION_UPSERT.layout,
      },
      $setOnInsert: { slug: ADORE_SLUG },
    },
    { upsert: true },
  );
}

export async function ensureDefaultHomeCollection(): Promise<void> {
  await ensureBuiltinCollections();
}

export async function getHomeCollection(): Promise<Collection | null> {
  await connectDB();
  await ensureDefaultHomeCollection();

  const doc = await CollectionModel.findOne({
    isHome: true,
    active: true,
  })
    .sort({ order: 1, slug: 1 })
    .lean<CollectionDocument | null>();

  if (!doc) return null;
  const d = doc as unknown as CollectionDocument;
  return {
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle,
    viewAllHref: d.viewAllHref,
    isHome: d.isHome,
    active: d.active,
    order: d.order,
    productFilter: d.productFilter ?? { mode: "featured", limit: 24 },
    layout: d.layout,
    createdAt:
      (doc as { createdAt?: Date }).createdAt?.toISOString?.() ??
      new Date().toISOString(),
    updatedAt:
      (doc as { updatedAt?: Date }).updatedAt?.toISOString?.() ??
      new Date().toISOString(),
  };
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  await connectDB();
  const doc = await CollectionModel.findOne({
    slug,
    active: true,
  }).lean<CollectionDocument | null>();

  if (!doc) return null;
  const d = doc as unknown as CollectionDocument;
  return {
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle,
    viewAllHref: d.viewAllHref,
    isHome: d.isHome,
    active: d.active,
    order: d.order,
    productFilter: d.productFilter ?? { mode: "featured", limit: 24 },
    layout: d.layout,
    createdAt:
      (doc as { createdAt?: Date }).createdAt?.toISOString?.() ??
      new Date().toISOString(),
    updatedAt:
      (doc as { updatedAt?: Date }).updatedAt?.toISOString?.() ??
      new Date().toISOString(),
  };
}

export async function listCollections(): Promise<Collection[]> {
  await connectDB();
  await ensureBuiltinCollections();
  const docs = await CollectionModel.find({ active: true })
    .sort({ order: 1, slug: 1 })
    .lean<CollectionDocument[]>();

  return docs.map((raw) => {
    const d = raw as unknown as CollectionDocument;
    return {
      slug: d.slug,
      title: d.title,
      subtitle: d.subtitle,
      viewAllHref: d.viewAllHref,
      isHome: d.isHome,
      active: d.active,
      order: d.order,
      productFilter: d.productFilter ?? { mode: "featured", limit: 24 },
      layout: d.layout,
      createdAt:
        (raw as { createdAt?: Date }).createdAt?.toISOString?.() ??
        new Date().toISOString(),
      updatedAt:
        (raw as { updatedAt?: Date }).updatedAt?.toISOString?.() ??
        new Date().toISOString(),
    };
  });
}

export async function getHomeCollectionWithProducts(): Promise<{
  collection: PublicCollection;
  products: Product[];
}> {
  const collection = await getHomeCollection();
  if (!collection) {
    const products = await getProducts();
    const featured = products.filter((p) => p.featured);
    return {
      collection: toPublicCollection({
        ...DEFAULT_HOME,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
      products: featured,
    };
  }

  const all = await getProducts();
  const products = applyProductFilter(all, collection.productFilter);
  return {
    collection: toPublicCollection(collection),
    products,
  };
}

export async function getCollectionWithProductsBySlug(
  slug: string,
): Promise<{ collection: PublicCollection; products: Product[] } | null> {
  await ensureBuiltinCollections();
  const collection = await getCollectionBySlug(slug);
  if (!collection) return null;
  const all = await getProducts();
  const products = applyProductFilter(all, collection.productFilter);
  return {
    collection: toPublicCollection(collection),
    products,
  };
}
