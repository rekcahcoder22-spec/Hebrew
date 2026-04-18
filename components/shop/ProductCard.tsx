"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { StockBadge } from "@/components/ui/StockBadge";
import { useCartStore } from "@/store/cartStore";
import type { Product, Size } from "@/types";

const stripeStyle = {
  background:
    "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.04) 12px, rgba(255,255,255,0.04) 13px)",
} as const;

function firstBuyableSize(product: Product): Size | null {
  for (const sz of product.sizes) {
    const q = product.stock[sz] ?? 0;
    if (q > 0) return sz;
  }
  return null;
}

function totalStock(product: Product) {
  return Object.values(product.stock).reduce((a, b) => a + b, 0);
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const img = product.images[0];
  const soldOut = product.stockStatus === "sold-out";
  const lowQty =
    product.stockStatus === "low-stock" ? totalStock(product) : undefined;
  const canQuickAdd =
    !soldOut &&
    product.stockStatus !== "coming-soon" &&
    firstBuyableSize(product) != null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = firstBuyableSize(product);
    if (!size) return;
    addItem(product, size, 1);
    openCart();
  };

  return (
    <div className="group relative cursor-pointer bg-hb-gray">
      <div className="relative aspect-[3/4] overflow-hidden bg-hb-black">
        <Link
          href={`/shop/${product.id}`}
          className="absolute inset-0 z-0 block"
          aria-label={product.name}
        >
          {img ? (
            <Image
              src={img}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 bg-hb-gray"
              style={stripeStyle}
            />
          )}
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 z-10">
          <StockBadge
            status={product.stockStatus}
            stock={lowQty}
          />
        </div>

        {soldOut && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-hb-black/60">
            <span
              className="font-display text-4xl uppercase tracking-widest text-hb-red"
              style={{ transform: "rotate(-30deg)" }}
            >
              SOLD OUT
            </span>
          </div>
        )}

        {canQuickAdd && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="absolute inset-x-0 bottom-0 z-20 translate-y-full bg-hb-red py-3 font-body text-xs uppercase tracking-widest text-white transition-transform duration-300 group-hover:translate-y-0"
          >
            ADD TO CART
          </button>
        )}
      </div>

      <Link href={`/shop/${product.id}`} className="block p-4">
        <h3 className="font-display text-2xl uppercase tracking-[0.06em] text-hb-white">
          {product.name}
        </h3>
        <p className="mt-1 font-body text-sm text-hb-gold">
          {formatPrice(product.price)}
        </p>
      </Link>
    </div>
  );
}
