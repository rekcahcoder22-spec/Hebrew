"use client";

import { useEffect, useState } from "react";
import { DropBanner } from "@/components/home/DropBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { LookbookSection } from "@/components/home/LookbookSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import type { Product } from "@/types";
import type { PublicBrandSettings } from "@/lib/products";

export function HomePage() {
  const [settings, setSettings] = useState<PublicBrandSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sRes, pRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/products"),
        ]);
        const sJson = (await sRes.json()) as PublicBrandSettings & {
          error?: string;
        };
        const pJson = (await pRes.json()) as Product[] | { error?: string };
        if (cancelled) return;
        if (sRes.ok && !("error" in sJson && sJson.error)) {
          setSettings(sJson as PublicBrandSettings);
        }
        if (pRes.ok && Array.isArray(pJson)) {
          setProducts(pJson);
        }
      } catch {
        if (!cancelled) {
          setSettings(null);
          setProducts([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!settings) {
    return (
      <main className="min-h-[50vh] bg-hb-black pt-24 text-center font-body text-sm text-hb-white/40">
        Loading…
      </main>
    );
  }

  const featured = products.filter((p) => p.featured);

  return (
    <main>
      <DropBanner dropTitle={settings.dropTitle} dropDate={settings.dropDate} />
      <HeroSection />
      <ProductGrid products={featured} title="SIGNALS" />
      <LookbookSection />
      <ManifestoSection />
      <NewsletterSection />
    </main>
  );
}
