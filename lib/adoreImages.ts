import type { Product } from "@/types";

export function getAdoreImagePool(products: Product[]): string[] {
  const byNewest = [...products].sort((a, b) => {
    const ca = new Date(a.createdAt).getTime();
    const cb = new Date(b.createdAt).getTime();
    if (cb !== ca) return cb - ca;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const pool = new Set<string>();
  for (const product of byNewest) {
    const hasAdoreTag = product.tags.some(
      (tag) => tag.trim().toLowerCase() === "adore",
    );
    if (!hasAdoreTag) continue;
    for (const image of product.images) {
      if (typeof image === "string" && image.trim()) {
        pool.add(image);
      }
    }
  }
  return Array.from(pool);
}
