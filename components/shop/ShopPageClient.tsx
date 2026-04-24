"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductGrid } from "@/components/home/ProductGrid";
import type { Product } from "@/types";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function ShopPageClient() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/products");
        const data = (await res.json()) as Product[];
        if (!cancelled && Array.isArray(data)) setProducts(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedProducts = useMemo(
    () =>
      [...products].sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }),
    [products],
  );

  return (
    <div className="border-b border-hb-border bg-hb-black px-4 py-12">
      <div className="mx-auto max-w-[1600px]">
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
          {language === "vi" ? "Cửa hàng / Danh mục" : "Shop / Catalog"}
        </p>

        <p className="mb-4 mt-8 font-body text-[10px] text-hb-white/40">
          {sortedProducts.length} {language === "vi" ? "sản phẩm" : "items"}
        </p>

        {loading ? (
          <p className="font-body text-sm text-hb-white/50">
            {language === "vi" ? "Đang tải…" : "Loading…"}
          </p>
        ) : (
          <ProductGrid
            products={sortedProducts}
            title={language === "vi" ? "TẤT CẢ SẢN PHẨM" : "ALL PIECES"}
            subtitle={language === "vi" ? "HEBREW — MỚI & CỐT LÕI" : "HEBREW — NEW & CORE"}
            viewAllHref="/shop"
            linkLabel={`Xem ${sortedProducts.length} sản phẩm →`}
            columnsLg={4}
          />
        )}
      </div>
    </div>
  );
}
