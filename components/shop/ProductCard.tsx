"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProgressiveProductImage } from "@/components/ui/ProgressiveProductImage";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const HOVER_CYCLE_MS = 1400;

const IO_ROOT_MARGIN = "200px 0px 320px 0px";

type Props = {
  product: Product;
  /** Ảnh đầu của card này được ưu tiên LCP (thường chỉ card đầu grid). */
  priorityImage?: boolean;
  /** Bỏ chờ IO — tải ngay (sản phẩm đầu trên home/shop). */
  eagerVisual?: boolean;
};

export function ProductCard({
  product,
  priorityImage = false,
  eagerVisual = false,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [cardInView, setCardInView] = useState(() => !!eagerVisual);

  const images = product.images.filter(Boolean);
  const n = images.length;
  const soldOut = product.stockStatus === "sold-out";
  const rating = product.rating ?? 0;
  const hasFrom =
    product.originalPrice != null &&
    product.originalPrice > product.price;

  useEffect(() => {
    if (eagerVisual) return;
    const el = visualRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCardInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: IO_ROOT_MARGIN, threshold: 0.01 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [eagerVisual]);

  useEffect(() => {
    if (!hovered || n <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % n);
    }, HOVER_CYCLE_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hovered, n]);

  useEffect(() => {
    if (!hovered) setActiveImg(0);
  }, [hovered]);

  useEffect(() => {
    if (activeImg >= n) setActiveImg(0);
  }, [activeImg, n]);

  const firstImagePriority = priorityImage && cardInView;

  return (
    <Link
      href={`/shop/${product.id}`}
      className="group block cursor-pointer bg-transparent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={visualRef}
        className="relative w-full aspect-square overflow-hidden bg-card-well"
      >
        {n > 0 ? (
          images.map((src, index) => (
            <ProgressiveProductImage
              key={`${src}-${index}`}
              shouldLoad={cardInView}
              src={src}
              alt=""
              sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 28vw"
              priority={firstImagePriority && index === 0}
              onLoad={() => {
                if (index === 0) setImageLoaded(true);
              }}
              className={cn(
                "object-cover object-center transition-transform duration-700 ease-out",
                index === activeImg
                  ? cn(
                      "z-[1] opacity-100",
                      hovered ? "scale-[1.05]" : "scale-100",
                    )
                  : "pointer-events-none z-0 opacity-0",
              )}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-card-well font-display text-4xl text-hb-white/[0.06]">
            HB
          </div>
        )}

        {!imageLoaded && n > 0 && cardInView && (
          <div className="absolute inset-0 animate-shimmer" />
        )}

        {product.isNew && (
          <span className="absolute left-0 top-0 z-10 bg-blood-ink px-2 py-1 font-product text-[8px] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            New In
          </span>
        )}

        {n > 1 && (
          <span
            className="absolute right-3 top-3 z-10 h-1.5 w-1.5 rounded-full bg-void/50"
            aria-hidden
          />
        )}

        {soldOut && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-void/70 backdrop-blur-[1px]">
            <span
              className="font-display text-2xl tracking-wide text-hb-red"
              style={{ transform: "rotate(-18deg)" }}
            >
              SOLD OUT
            </span>
          </div>
        )}

        {n > 1 && !soldOut && (
          <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 w-1 rounded-full",
                  i === activeImg ? "bg-hb-white" : "bg-hb-white/20",
                )}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <p className="font-brand-serif text-[11px] font-semibold uppercase tracking-[0.42em] text-hb-white">
          HEBREW
        </p>
      </div>

      <div className="mt-2 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 min-w-0 flex-1 font-product text-[13px] font-normal uppercase leading-snug tracking-[0.2em] text-white">
          {product.name}
        </h3>
        <div className="flex shrink-0 items-center gap-1 font-product text-[11px] tracking-[0.14em] text-hb-gold">
          <span>{rating.toFixed(1)}</span>
          <span aria-hidden>★</span>
        </div>
      </div>

      <div className="mt-1.5 font-product text-[11px] font-light tracking-[0.16em] text-hb-muted">
        {hasFrom ? (
          <>
            <span>FROM </span>
            <span>{formatPrice(product.price).replace(/\s/g, " ")}</span>
          </>
        ) : (
          <span>{formatPrice(product.price).replace(/\s/g, " ")}</span>
        )}
      </div>
    </Link>
  );
}
