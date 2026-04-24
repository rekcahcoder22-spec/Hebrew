"use client";

import { useEffect, useState } from "react";
import { ConceptVisualSection } from "@/components/home/ConceptVisualSection";
import { DropBanner } from "@/components/home/DropBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { LookbookSection } from "@/components/home/LookbookSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import type { Product } from "@/types";
import type { PublicBrandSettings } from "@/lib/products";
import type { PublicCollection } from "@/types";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function HomePage() {
  const [settings, setSettings] = useState<PublicBrandSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [homeCollection, setHomeCollection] = useState<PublicCollection | null>(
    null,
  );
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sRes, pRes, hRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/products"),
          fetch("/api/collections/home"),
        ]);
        const sJson = (await sRes.json()) as PublicBrandSettings & {
          error?: string;
        };
        const pJson = (await pRes.json()) as Product[] | { error?: string };
        const hJson = (await hRes.json()) as
          | { collection: PublicCollection; products: Product[] }
          | { error?: string };
        if (cancelled) return;
        if (sRes.ok && !("error" in sJson && sJson.error)) {
          setSettings(sJson as PublicBrandSettings);
        }
        if (pRes.ok && Array.isArray(pJson)) {
          setProducts(pJson);
        }
        if (
          hRes.ok &&
          hJson &&
          "collection" in hJson &&
          Array.isArray(hJson.products)
        ) {
          setHomeCollection(hJson.collection);
          setProducts(hJson.products);
        }
      } catch {
        if (!cancelled) {
          setSettings(null);
          setProducts([]);
          setHomeCollection(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!settings) {
    return (
      <main className="min-h-[50vh] bg-void pt-24 text-center font-body text-sm text-hb-white/40">
        {t("home.loading")}
      </main>
    );
  }

  const gridProducts = homeCollection
    ? products
    : products.filter((p) => p.featured);
  const gridTitle = homeCollection?.title ?? t("home.signals");
  const gridSubtitle = homeCollection?.subtitle;
  const gridHref = homeCollection?.viewAllHref ?? "/shop";
  const gridCols = homeCollection?.layout?.columnsLg ?? 4;

  return (
    <main>
      <ConceptVisualSection
        headline={settings.dropTitle}
        tagline={settings.heroTagline}
      />
      <DropBanner dropTitle={settings.dropTitle} dropDate={settings.dropDate} />
      <HeroSection />
      <ProductGrid
        products={gridProducts}
        title={gridTitle}
        subtitle={gridSubtitle}
        viewAllHref={gridHref}
        linkLabel={`Xem ${gridProducts.length} sản phẩm →`}
        columnsLg={gridCols}
      />
      <LookbookSection />
      <ManifestoSection />
      <NewsletterSection />
    </main>
  );
}
