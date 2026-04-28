"use client";

import { useEffect, useState } from "react";
import { ConceptVisualSection } from "@/components/home/ConceptVisualSection";
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
  const [homeCollection, setHomeCollection] = useState<PublicCollection | null>(
    null,
  );
  const [homeProducts, setHomeProducts] = useState<Product[]>([]);
  const [adoreCollection, setAdoreCollection] = useState<{
    collection: PublicCollection;
    products: Product[];
  } | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sRes, pRes, hRes, aRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/products"),
          fetch("/api/collections/home"),
          fetch("/api/collections/adore"),
        ]);
        const sJson = (await sRes.json()) as PublicBrandSettings & {
          error?: string;
        };
        const pJson = (await pRes.json()) as Product[] | { error?: string };
        const hJson = (await hRes.json()) as
          | { collection: PublicCollection; products: Product[] }
          | { error?: string };
        const aJson = (await aRes.json()) as
          | { collection: PublicCollection; products: Product[] }
          | { error?: string };
        if (cancelled) return;
        if (sRes.ok && !("error" in sJson && sJson.error)) {
          setSettings(sJson as PublicBrandSettings);
        }

        const allProducts = pRes.ok && Array.isArray(pJson) ? pJson : [];

        if (
          hRes.ok &&
          hJson &&
          "collection" in hJson &&
          Array.isArray(hJson.products)
        ) {
          setHomeCollection(hJson.collection);
          setHomeProducts(hJson.products);
        } else {
          setHomeCollection(null);
          setHomeProducts(allProducts.filter((p) => p.featured));
        }

        if (
          aRes.ok &&
          aJson &&
          "collection" in aJson &&
          Array.isArray(aJson.products)
        ) {
          setAdoreCollection({
            collection: aJson.collection,
            products: aJson.products,
          });
        } else {
          setAdoreCollection(null);
        }
      } catch {
        if (!cancelled) {
          setSettings(null);
          setHomeProducts([]);
          setHomeCollection(null);
          setAdoreCollection(null);
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

  const gridTitle = homeCollection?.title ?? t("home.signals");
  const gridSubtitle = homeCollection?.subtitle;
  const gridHref = homeCollection?.viewAllHref ?? "/shop";
  const gridCols = homeCollection?.layout?.columnsLg ?? 4;
  const adoreCols = adoreCollection?.collection.layout?.columnsLg ?? 4;

  return (
    <main>
      <ConceptVisualSection
        headline={settings.dropTitle}
        tagline={settings.heroTagline}
      />
      {adoreCollection ? (
        <ProductGrid
          products={adoreCollection.products}
          title={adoreCollection.collection.title}
          subtitle={
            adoreCollection.collection.subtitle || t("home.adore.subtitle")
          }
          viewAllHref={adoreCollection.collection.viewAllHref}
          linkLabel={t("home.viewProducts", {
            count: adoreCollection.products.length,
          })}
          columnsLg={adoreCols}
          compactTop
          fullWidth
        />
      ) : null}
      <ProductGrid
        products={homeProducts}
        title={gridTitle}
        subtitle={gridSubtitle}
        viewAllHref={gridHref}
        linkLabel={t("home.viewProducts", { count: homeProducts.length })}
        columnsLg={gridCols}
        hideHeader
        compactTop
        fullWidth
      />
      <HeroSection />
      <LookbookSection />
      <ManifestoSection />
      <NewsletterSection />
    </main>
  );
}
