"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL_MS = 1500;

/** Ảnh concept — carousel nền (3 slide) */
const CONCEPT_SLIDES = [
  {
    src: "/images/concept/00-gothic-wall-v2.png",
    alt: "Concept — gothic wall collage",
    imageClass:
      "object-contain object-[50%_58%] [filter:grayscale(1)_saturate(0)_contrast(1.22)_brightness(0.72)]",
  },
  {
    src: "/images/concept/01-gat-tan.png",
    alt: "Concept — still life",
    imageClass:
      "object-cover object-center [image-rendering:auto] [filter:grayscale(1)_saturate(0)_contrast(1.16)_brightness(0.82)]",
  },
  {
    src: "/images/concept/02-ban-tay.png",
    alt: "Concept — hand on glass",
    imageClass:
      "object-cover object-center [image-rendering:auto] [filter:grayscale(1)_saturate(0)_contrast(1.16)_brightness(0.82)]",
  },
  {
    src: "/images/concept/03-kinh-vo.png",
    alt: "Concept — fractured glass",
    imageClass:
      "object-cover object-center [image-rendering:auto] [filter:grayscale(1)_saturate(0)_contrast(1.16)_brightness(0.82)]",
  },
] as const;

function grainDataUrl(baseFrequency: string, numOctaves: string) {
  const svg = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><filter id="n" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const GRAIN_COARSE = grainDataUrl("0.72", "4");
const GRAIN_FINE = grainDataUrl("1.35", "2");

type Props = {
  headline: string;
  tagline: string;
};

export function ConceptVisualSection({ headline, tagline }: Props) {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % CONCEPT_SLIDES.length);
  }, []);

  useEffect(() => {
    tickRef.current = setInterval(advance, SLIDE_INTERVAL_MS);
    return () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [advance]);

  const goTo = (index: number) => {
    setActive(index);
  };

  return (
    <section
      className="relative min-h-[calc(52vh+200px)] w-full overflow-hidden bg-hb-black pt-20 md:min-h-[calc(56vh+200px)] md:pt-24"
    >
      {/* —— Background carousel —— */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {CONCEPT_SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
              index === active ? "z-[1] opacity-100" : "z-0 opacity-0",
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              quality={96}
              sizes="100vw"
              className={slide.imageClass}
            />
          </div>
        ))}
      </div>

      {/* Đọc chữ + mood */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-hb-black/92 via-hb-black/68 to-hb-black/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-hb-black/45 via-transparent to-hb-black/75"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_70%_60%_at_30%_40%,rgba(139,26,26,0.1),transparent_62%)]"
        aria-hidden
      />
      {/* Film grain — trên toàn khung hình, blend giống ảnh in / celluloid */}
      <div
        className="concept-grain-coarse pointer-events-none absolute inset-0 z-[3] mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_COARSE,
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
        }}
        aria-hidden
      />
      <div
        className="concept-grain-fine pointer-events-none absolute inset-0 z-[3] mix-blend-soft-light"
        style={{
          backgroundImage: GRAIN_FINE,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[4] flex select-none items-center justify-end overflow-hidden pr-[4%] opacity-[0.07] md:pr-[8%]"
        aria-hidden
      >
        <span className="font-display text-[min(38vw,22rem)] leading-none tracking-[0.2em] text-hb-white">
          HEBREW
        </span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(52vh+200px-5rem)] max-w-[1600px] flex-col justify-center px-4 py-14 md:min-h-[calc(56vh+200px-6rem)] md:px-8 md:py-20">
        <p className="font-body text-[9px] uppercase tracking-[0.35em] text-hb-gold/90">
          {t("concept.kicker")}
        </p>
        <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[0.95] tracking-tight text-hb-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
          {headline}
        </h2>
        <p className="mt-8 max-w-xl font-body text-sm font-medium leading-relaxed tracking-wide text-hb-white/70 drop-shadow-[0_1px_12px_rgba(0,0,0,0.8)]">
          {tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/our-story"
            className="inline-flex items-center border border-hb-border/60 bg-hb-black/50 px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.25em] text-hb-white/90 backdrop-blur-sm transition-colors hover:border-hb-red hover:text-hb-red"
          >
            {t("concept.cta")}
          </Link>
          <Link
            href="/collections/adore"
            className="font-body text-[10px] uppercase tracking-[0.2em] text-hb-white/50 transition-colors hover:text-hb-gold"
          >
            {t("concept.shop")}
          </Link>
        </div>
      </div>

      {/* Carousel indicators */}
      <div
        className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 md:bottom-8"
        role="tablist"
        aria-label="Concept background slides"
      >
        {CONCEPT_SLIDES.map((_, index) => (
          <button
            key={CONCEPT_SLIDES[index].src}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              index === active
                ? "w-8 bg-hb-white"
                : "w-1 bg-hb-white/35 hover:bg-hb-white/55",
            )}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-px bg-gradient-to-r from-transparent via-hb-border/80 to-transparent"
        aria-hidden
      />
    </section>
  );
}
