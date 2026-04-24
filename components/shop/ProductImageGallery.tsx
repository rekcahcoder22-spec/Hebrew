"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProgressiveProductImage } from "@/components/ui/ProgressiveProductImage";
import { isUploadImagePath } from "@/lib/image";

type Props = {
  images: string[];
  productName: string;
};

const THUMB_IO_MARGIN = "80px";

export function ProductImageGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isLoading, setIsLoading] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const thumbsRailRef = useRef<HTMLDivElement>(null);
  const [thumbsInView, setThumbsInView] = useState(false);

  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const activeSrc = safeImages[activeIndex];

  useEffect(() => {
    setIsLoading(true);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex >= safeImages.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, safeImages.length]);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % safeImages.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [safeImages.length]);

  useEffect(() => {
    const el = thumbsRailRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setThumbsInView(true);
      },
      { rootMargin: THUMB_IO_MARGIN, threshold: 0.01 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [safeImages.length]);

  if (safeImages.length === 0) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center bg-card-well">
        <span className="font-display text-6xl text-hb-white/[0.04]">HB</span>
      </div>
    );
  }

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % safeImages.length);

  return (
    <div className="lg:flex lg:gap-4">
      <div
        ref={thumbsRailRef}
        className="order-2 mt-2 flex gap-2 overflow-x-auto pb-2 scrollbar-hide lg:order-1 lg:mt-0 lg:w-20 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {safeImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-[3/4] w-16 shrink-0 overflow-hidden border transition-all duration-200 lg:w-20 ${
              activeIndex === index
                ? "border-hb-white opacity-100"
                : "border-hb-border opacity-50 hover:border-hb-border hover:opacity-80"
            }`}
          >
            <ProgressiveProductImage
              shouldLoad={thumbsInView}
              src={image}
              alt={`${productName} view ${index + 1}`}
              sizes="80px"
              className="object-cover object-center"
            />
            {activeIndex === index && (
              <span className="absolute bottom-0 left-0 top-0 w-[2px] bg-hb-red" aria-hidden />
            )}
          </button>
        ))}
      </div>

      <div
        className={`group relative order-1 aspect-[3/4] flex-1 overflow-hidden bg-card-well ${
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setZoomPosition({ x, y });
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onTouchStart={(e) => setTouchStartX(e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          if (touchStartX == null) return;
          const delta = (e.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
          if (delta > 50) goPrev();
          if (delta < -50) goNext();
          setTouchStartX(null);
        }}
      >
        <ProgressiveProductImage
          shouldLoad
          src={activeSrc}
          alt={productName}
          sizes="(max-width:768px) 100vw, 50vw"
          priority={activeIndex === 0}
          className={`object-cover object-center transition-transform duration-700 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
          onLoad={() => setIsLoading(false)}
          unoptimized={isUploadImagePath(activeSrc)}
        />
        {isLoading && <div className="absolute inset-0 animate-pulse bg-blood-ink/40" />}

        <div className="absolute bottom-3 right-3 bg-hb-black/70 px-2 py-1 font-body text-[9px] uppercase tracking-[0.15em] text-hb-white">
          {activeIndex + 1} / {safeImages.length}
        </div>

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-hb-border bg-hb-black/60 font-body text-sm text-white opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-hb-red hover:bg-hb-red"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-hb-border bg-hb-black/60 font-body text-sm text-white opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-hb-red hover:bg-hb-red"
            >
              ›
            </button>
          </>
        )}

        {safeImages.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 lg:hidden">
            {safeImages.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all duration-200 ${
                  idx === activeIndex ? "w-4 bg-hb-white" : "w-1 bg-hb-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
