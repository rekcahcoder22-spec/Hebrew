import type { Product, Size, StockStatus } from "@/types";

export function totalStock(product: Product): number {
  return Object.values(product.stock).reduce((a, b) => a + b, 0);
}

export function isInStock(product: Product): boolean {
  if (product.stockStatus === "sold-out") return false;
  return totalStock(product) > 0;
}

export function buildStockForSizes(
  sizes: Size[],
  stockStatus: StockStatus,
): Record<string, number> {
  const qty =
    stockStatus === "sold-out" || stockStatus === "coming-soon"
      ? 0
      : stockStatus === "low-stock"
        ? 3
        : 12;
  const stock: Record<string, number> = {};
  for (const s of sizes) stock[s] = qty;
  return stock;
}
