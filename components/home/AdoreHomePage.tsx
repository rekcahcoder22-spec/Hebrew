"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { EyebrowLabel } from "@/components/EyebrowLabel";
import { ProductCard } from "@/components/ProductCard";
import { QuoteBlock } from "@/components/QuoteBlock";
import { RedLine } from "@/components/RedLine";
import { SeamGrid } from "@/components/SeamGrid";
import { homeContent, motionVariants } from "@/lib/content";
import { getAdoreImagePool } from "@/lib/adoreImages";
import type { Product } from "@/types";

export function AdoreHomePage() {
  const [imagePool, setImagePool] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/products");
        const data = (await res.json()) as Product[];
        if (!cancelled && Array.isArray(data)) {
          setImagePool(getAdoreImagePool(data));
        }
      } catch {
        if (!cancelled) setImagePool([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cardImages = useMemo(() => imagePool.slice(0, 3), [imagePool]);
  const entryFront = "/images/adore/entry-front.png";
  const entryBack = "/images/adore/entry-back.png";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f0ece8]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          variants={motionVariants.fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <EyebrowLabel>{homeContent.eyebrow}</EyebrowLabel>
          <h1 className="font-editorial text-[clamp(96px,18vw,140px)] font-light leading-[0.9] text-[#f0ece8]">
            {homeContent.title}
          </h1>
          <p className="font-editorial text-3xl font-light italic text-[#f0ece8] md:text-4xl">
            {homeContent.subtitle}
          </p>
          <p className="mx-auto max-w-2xl font-body text-sm font-light leading-8 text-[#5a5550]">
            {homeContent.viLead}
          </p>
          <div className="flex justify-center">
            <RedLine />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="border border-[#8B1A1A] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
            >
              Đặt Hàng Ngay
            </Link>
            <Link
              href="/cart"
              className="border border-[#8B1A1A] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
            >
              Vào Giỏ Hàng
            </Link>
            <Link
              href="/our-story"
              className="border border-[#8B1A1A] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
            >
              Xem Our Story
            </Link>
            <Link
              href="/adore"
              className="border border-[#1b1b1b] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
            >
              Xem ADORE
            </Link>
          </div>
          <p className="font-body text-[10px] uppercase tracking-[0.45em] text-[#2a2525]">
            {homeContent.volumeLabel}
          </p>
        </motion.div>
      </section>

      <section className="border-y border-[#1b1b1b] px-6 py-20 text-center">
        <p className="font-editorial text-3xl font-light italic text-[#f0ece8] md:text-4xl">
          {homeContent.manifestoQuote}
        </p>
        <div className="mt-8 flex justify-center">
          <RedLine orientation="horizontal" length={48} />
        </div>
      </section>

      <motion.section
        variants={motionVariants.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="px-6 py-20"
      >
        <SeamGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {homeContent.products.map((product, index) => (
            <ProductCard
              key={product.name}
              chapter={product.chapter}
              name={product.name}
              conceptLine={product.conceptLine}
              copy={product.copy}
              easterEgg={product.easterEgg}
              imageSrc={index === 0 ? entryFront : cardImages[index]}
              hoverImageSrc={index === 0 ? entryBack : undefined}
              imageFit={index === 0 ? "contain" : "cover"}
            />
          ))}
        </SeamGrid>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="border border-[#8B1A1A] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
          >
            Chọn Size & Đặt Hàng
          </Link>
          <Link
            href="/cart"
            className="border border-[#1b1b1b] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
          >
            Xem Giỏ Hàng
          </Link>
        </div>
      </motion.section>

      <motion.section
        variants={motionVariants.fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="px-6 pb-20"
      >
        <SeamGrid className="grid-cols-1 sm:grid-cols-1 lg:grid-cols-3">
          <div className="bg-[#0a0a0a] p-6">
            <EyebrowLabel>{homeContent.visualDirection.paletteLabel}</EyebrowLabel>
            <div className="mt-6 space-y-3">
              <div className="h-8 border border-[#1b1b1b] bg-[#8B1A1A]" />
              <div className="h-8 border border-[#1b1b1b] bg-[#0a0a0a]" />
              <div className="h-8 border border-[#1b1b1b] bg-[#F0EAE4]" />
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <EyebrowLabel>Photography</EyebrowLabel>
            <p className="mt-6 font-body text-sm font-light leading-7 text-[#5a5550]">
              {homeContent.visualDirection.photography}
            </p>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <EyebrowLabel>Visual tone</EyebrowLabel>
            <div className="mt-6 space-y-2">
              {homeContent.visualDirection.visualTone.map((line) => (
                <p
                  key={line}
                  className="font-editorial text-2xl font-light italic text-[#f0ece8]"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </SeamGrid>
      </motion.section>

      <QuoteBlock
        quote={homeContent.closingQuote}
        attribution={homeContent.closingEyebrow}
      />
    </main>
  );
}
