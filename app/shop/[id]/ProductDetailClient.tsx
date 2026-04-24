"use client";

import { useEffect, useMemo, useState } from "react";
import { useClientMounted } from "@/hooks/useClientMounted";
import Link from "next/link";
import { Check, ShieldCheck, Star } from "lucide-react";
import { SizeSelector } from "@/components/shop/SizeSelector";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductImageGallery } from "@/components/shop/ProductImageGallery";
import { StockBadge } from "@/components/ui/StockBadge";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Product, Size } from "@/types";

function totalStock(product: Product) {
  return Object.values(product.stock).reduce((a, b) => a + b, 0);
}

const SIZE_ROWS: { label: string; cm: string }[] = [
  { label: "XS", cm: "44–46" },
  { label: "S", cm: "46–48" },
  { label: "M", cm: "48–50" },
  { label: "L", cm: "50–52" },
  { label: "XL", cm: "52–54" },
  { label: "XXL", cm: "54–56" },
];

const SEEDED_REVIEW_DATES = ["2026-03-12", "2026-03-20", "2026-04-02"] as const;

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [size, setSize] = useState<Size | null>(product.sizes[0] ?? null);
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { t, language } = useLanguage();

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const inWishlistStored = useWishlistStore((s) => s.has(product.id));
  const mounted = useClientMounted();
  const inWishlist = mounted && inWishlistStored;

  useEffect(() => {
    const first = product.images.filter(Boolean)[0];
    if (!first) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = first;
    link.setAttribute("fetchPriority", "high");
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [product.images]);

  const lowQty =
    product.stockStatus === "low-stock" ? totalStock(product) : undefined;

  const maxQty = useMemo(() => {
    if (!size) return 1;
    return Math.max(1, product.stock[size] ?? 0);
  }, [product, size]);

  const canAdd =
    size != null &&
    product.stockStatus !== "sold-out" &&
    product.stockStatus !== "coming-soon" &&
    maxQty > 0;

  const clampQty = (n: number) =>
    Math.min(maxQty, Math.max(1, Math.floor(n)));

  const seededReviews = [
    {
      key: "review1",
      author: t("productDetail.reviews.seed.review1.name"),
      content: t("productDetail.reviews.seed.review1.content"),
      rating: 5,
      date: SEEDED_REVIEW_DATES[0],
    },
    {
      key: "review2",
      author: t("productDetail.reviews.seed.review2.name"),
      content: t("productDetail.reviews.seed.review2.content"),
      rating: 5,
      date: SEEDED_REVIEW_DATES[1],
    },
    {
      key: "review3",
      author: t("productDetail.reviews.seed.review3.name"),
      content: t("productDetail.reviews.seed.review3.content"),
      rating: 4,
      date: SEEDED_REVIEW_DATES[2],
    },
  ] as const;

  const averageRating =
    seededReviews.reduce((sum, review) => sum + review.rating, 0) /
    seededReviews.length;

  const overviewPrimary =
    (language === "vi"
      ? product.content?.overview?.primary?.vi
      : product.content?.overview?.primary?.en) ??
    t("productDetail.overview.story1", { name: product.name });
  const overviewSecondary =
    (language === "vi"
      ? product.content?.overview?.secondary?.vi
      : product.content?.overview?.secondary?.en) ??
    t("productDetail.overview.story2", { category: product.category });
  const specsMaterial =
    (language === "vi"
      ? product.content?.specs?.material?.vi
      : product.content?.specs?.material?.en) ?? t("productDetail.specs.materialValue");
  const specsFit =
    (language === "vi" ? product.content?.specs?.fit?.vi : product.content?.specs?.fit?.en) ??
    t("productDetail.specs.fitValue");
  const specsSecurePrint =
    (language === "vi"
      ? product.content?.specs?.securePrint?.vi
      : product.content?.specs?.securePrint?.en) ??
    t("productDetail.specs.securePrintValue");
  const specsOrigin =
    (language === "vi"
      ? product.content?.specs?.origin?.vi
      : product.content?.specs?.origin?.en) ?? t("productDetail.specs.originValue");

  return (
    <div className="border-b border-hb-border bg-hb-black px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <nav className="font-body text-[10px] uppercase tracking-[0.25em] text-hb-white/40">
          <Link href="/shop" className="hover:text-hb-gold">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-hb-gold"
          >
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-hb-white/60">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          <div>
            <h1 className="font-display text-5xl tracking-[0.08em] text-hb-white">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-body text-sm tracking-wider text-hb-gold">
                {"★".repeat(Math.round(product.rating ?? 4.5))}
                {"☆".repeat(5 - Math.round(product.rating ?? 4.5))}
              </span>
              <span className="font-body text-xs text-hb-white/50">
                {(product.rating ?? 4.5).toFixed(1)} / 5
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              {product.originalPrice != null && (
                <span className="font-body text-lg text-hb-white/35 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="font-body text-xl text-hb-gold">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StockBadge
                status={product.stockStatus}
                stock={lowQty}
              />
              {product.isNew && (
                <span className="bg-hb-red px-2 py-0.5 font-body text-[9px] uppercase tracking-widest text-hb-white">
                  New
                </span>
              )}
            </div>
            <p className="mt-6 font-body text-sm leading-relaxed text-hb-white/55">
              {product.description}
            </p>

            <div className="mt-8">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-white/50">
                Size
              </p>
              <div className="mt-3 max-w-md">
                <SizeSelector
                  sizes={product.sizes as Size[]}
                  value={size}
                  onChange={(s) => {
                    setSize(s);
                    setQty(1);
                  }}
                  stock={product.stock}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-white/50">
                Quantity
              </p>
              <div className="mt-2 inline-flex items-center border border-hb-border">
                <button
                  type="button"
                  disabled={!canAdd || qty <= 1}
                  onClick={() => setQty((q) => clampQty(q - 1))}
                  className="px-4 py-2 font-body text-sm text-hb-white hover:bg-hb-gray disabled:opacity-30"
                >
                  −
                </button>
                <span className="min-w-[3rem] border-x border-hb-border px-4 py-2 text-center font-body text-sm text-hb-white">
                  {qty}
                </span>
                <button
                  type="button"
                  disabled={!canAdd || qty >= maxQty}
                  onClick={() => setQty((q) => clampQty(q + 1))}
                  className="px-4 py-2 font-body text-sm text-hb-white hover:bg-hb-gray disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              disabled={!canAdd}
              onClick={() => {
                if (!size || !canAdd) return;
                addItem(product, size, qty);
                openCart();
              }}
              className="mt-8 w-full bg-hb-red py-4 font-body text-xs uppercase tracking-[0.3em] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ADD TO CART
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`mt-3 w-full border py-3 font-body text-xs uppercase tracking-[0.3em] transition ${
                inWishlist
                  ? "border-hb-gold text-hb-gold"
                  : "border-hb-border text-hb-white/50 hover:border-hb-white/40 hover:text-hb-white"
              }`}
            >
              {inWishlist ? "SAVED TO WISHLIST" : "ADD TO WISHLIST"}
            </button>

            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="mt-4 font-body text-[10px] uppercase tracking-[0.3em] text-hb-gold underline-offset-4 hover:underline"
            >
              Size guide
            </button>
          </div>
        </div>

        <section className="mt-16 grid gap-8 border-t border-hb-border pt-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-8">
            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
                {t("productDetail.overview.kicker")}
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-[0.1em] text-hb-white">
                {t("productDetail.overview.title")}
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-hb-white/60">
                {overviewPrimary}
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-hb-white/60">
                {overviewSecondary}
              </p>
            </div>

            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
                {t("productDetail.specs.kicker")}
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-[0.08em] text-hb-white">
                {t("productDetail.specs.title")}
              </h3>
              <div className="mt-5 grid gap-px bg-hb-border sm:grid-cols-2">
                <div className="bg-hb-gray p-4">
                  <p className="font-body text-[9px] uppercase tracking-[0.25em] text-hb-white/35">
                    {t("productDetail.specs.material")}
                  </p>
                  <p className="mt-2 font-body text-sm text-hb-white/80">
                    {specsMaterial}
                  </p>
                </div>
                <div className="bg-hb-gray p-4">
                  <p className="font-body text-[9px] uppercase tracking-[0.25em] text-hb-white/35">
                    {t("productDetail.specs.fit")}
                  </p>
                  <p className="mt-2 font-body text-sm text-hb-white/80">
                    {specsFit}
                  </p>
                </div>
                <div className="bg-hb-gray p-4">
                  <p className="font-body text-[9px] uppercase tracking-[0.25em] text-hb-white/35">
                    {t("productDetail.specs.securePrint")}
                  </p>
                  <p className="mt-2 flex items-center gap-2 font-body text-sm text-hb-white/80">
                    <ShieldCheck className="h-4 w-4 text-hb-gold" />
                    {specsSecurePrint}
                  </p>
                </div>
                <div className="bg-hb-gray p-4">
                  <p className="font-body text-[9px] uppercase tracking-[0.25em] text-hb-white/35">
                    {t("productDetail.specs.origin")}
                  </p>
                  <p className="mt-2 flex items-center gap-2 font-body text-sm text-hb-white/80">
                    <Check className="h-4 w-4 text-hb-gold" />
                    {specsOrigin}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-hb-border bg-hb-gray/60 p-6">
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
              {t("productDetail.reviews.kicker")}
            </p>
            <h3 className="mt-3 font-display text-2xl tracking-[0.08em] text-hb-white">
              {t("productDetail.reviews.title")}
            </h3>

            <div className="mt-5 flex items-center justify-between border-y border-hb-border py-4">
              <div>
                <p className="font-display text-4xl text-hb-white">
                  {averageRating.toFixed(1)}
                </p>
                <p className="font-body text-xs text-hb-white/45">
                  {t("productDetail.reviews.averageLabel")}
                </p>
              </div>
              <div className="text-right">
                <div className="flex justify-end gap-1 text-hb-gold">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className="h-4 w-4"
                      fill={value <= Math.round(averageRating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="mt-2 font-body text-xs text-hb-white/45">
                  {t("productDetail.reviews.totalLabel", {
                    count: seededReviews.length,
                  })}
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-4">
              {seededReviews.map((review) => (
                <li key={review.key} className="border-b border-hb-border/70 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-body text-sm font-medium text-hb-white">
                        {review.author}
                      </p>
                      <p className="mt-1 font-body text-[11px] text-hb-white/40">
                        {new Date(review.date).toLocaleDateString(
                          language === "vi" ? "vi-VN" : "en-US",
                        )}
                      </p>
                    </div>
                    <div className="flex gap-0.5 text-hb-gold">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                          key={value}
                          className="h-3.5 w-3.5"
                          fill={value <= review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-hb-white/65">
                    {review.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-20 border-t border-hb-border pt-16">
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
              Related
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-[0.12em] text-hb-white">
              MORE IN {product.category.toUpperCase()}
            </h2>
            <div className="mt-10 grid gap-px bg-hb-border sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, index) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  priorityImage={index === 0}
                  eagerVisual={index === 0}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {sizeGuideOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-hb-border bg-hb-gray p-6">
            <div className="flex items-center justify-between">
              <h2
                id="size-guide-title"
                className="font-display text-2xl tracking-widest text-hb-white"
              >
                SIZE GUIDE
              </h2>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                className="font-body text-xs text-hb-red"
              >
                Close
              </button>
            </div>
            <p className="mt-4 font-body text-xs text-hb-white/50">
              Chest measurement (cm). Fit is oversized; size down for a closer
              block.
            </p>
            <table className="mt-6 w-full border-collapse font-body text-xs text-hb-white">
              <thead>
                <tr className="border-b border-hb-border text-left text-hb-white/50">
                  <th className="py-2 pr-4">Size</th>
                  <th className="py-2">Chest (cm)</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-hb-border/60">
                    <td className="py-2 pr-4 font-medium">{row.label}</td>
                    <td className="py-2 text-hb-white/70">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
