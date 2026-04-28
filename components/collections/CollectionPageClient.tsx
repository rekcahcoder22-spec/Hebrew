"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/home/ProductGrid";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Product, PublicCollection } from "@/types";

export function CollectionPageClient() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const { language } = useLanguage();
  const [collection, setCollection] = useState<PublicCollection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("missing_slug");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/collections/${slug}`);
        if (!res.ok) {
          if (!cancelled) setError("not_found");
          return;
        }
        const data = (await res.json()) as {
          collection: PublicCollection;
          products: Product[];
        };
        if (!cancelled) {
          setCollection(data.collection);
          setProducts(data.products);
        }
      } catch {
        if (!cancelled) setError("load_failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[40vh] border-b border-hb-border bg-hb-black px-4 py-24 text-center font-body text-sm text-hb-white/50">
        {language === "vi" ? "Đang tải bộ sưu tập…" : "Loading collection…"}
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-[40vh] border-b border-hb-border bg-hb-black px-4 py-24 text-center font-body text-sm text-hb-white/50">
        {language === "vi"
          ? "Không tìm thấy bộ sưu tập."
          : "Collection not found."}
      </div>
    );
  }

  const cols = collection.layout?.columnsLg ?? 4;

  return (
    <div className="border-b border-hb-border bg-hb-black px-4 py-12 md:px-8">
      <div className="mx-auto max-w-[1600px]">
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
          {language === "vi" ? "Bộ sưu tập" : "Collection"}
        </p>
        <ProductGrid
          products={products}
          title={collection.title}
          subtitle={collection.subtitle}
          viewAllHref={collection.viewAllHref}
          linkLabel={
            language === "vi"
              ? `Xem cửa hàng đầy đủ →`
              : `Full shop →`
          }
          columnsLg={cols}
        />
      </div>
    </div>
  );
}
