"use client";

import { useMemo, useState } from "react";
import { useClientMounted } from "@/hooks/useClientMounted";
import Image from "next/image";
import Link from "next/link";
import { SizeSelector } from "@/components/shop/SizeSelector";
import { ProductCard } from "@/components/shop/ProductCard";
import { StockBadge } from "@/components/ui/StockBadge";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
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

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [size, setSize] = useState<Size | null>(product.sizes[0] ?? null);
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const inWishlistStored = useWishlistStore((s) => s.has(product.id));
  const mounted = useClientMounted();
  const inWishlist = mounted && inWishlistStored;

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
            <div className="relative aspect-[3/4] overflow-hidden bg-hb-gray">
              <Image
                src={product.images[img] ?? product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImg(i)}
                    className={`relative h-20 w-16 overflow-hidden border transition ${
                      i === img
                        ? "border-hb-gold ring-1 ring-hb-gold"
                        : "border-hb-border hover:border-hb-white/30"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
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

        {related.length > 0 && (
          <section className="mt-20 border-t border-hb-border pt-16">
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
              Related
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-[0.12em] text-hb-white">
              MORE IN {product.category.toUpperCase()}
            </h2>
            <div className="mt-10 grid gap-px bg-hb-border sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
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
