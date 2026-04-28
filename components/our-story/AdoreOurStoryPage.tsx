"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChapterHeader } from "@/components/ChapterHeader";
import { ImageSlot } from "@/components/ImageSlot";
import { ManifestoCol } from "@/components/ManifestoCol";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SeamGrid } from "@/components/SeamGrid";
import { EyebrowLabel } from "@/components/EyebrowLabel";
import { motionVariants, ourStoryContent } from "@/lib/content";
import { getAdoreImagePool } from "@/lib/adoreImages";
import type { Product } from "@/types";

export function AdoreOurStoryPage() {
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

  const heroStoryImages = useMemo(() => imagePool.slice(0, 6), [imagePool]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-24 text-[#f0ece8]">
      <div className="mx-auto max-w-6xl">
        <EyebrowLabel>{ourStoryContent.subtitle}</EyebrowLabel>
        <h1 className="mt-4 font-editorial text-6xl font-light italic md:text-8xl">
          {ourStoryContent.title}
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="border border-[#8B1A1A] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
          >
            Đặt Hàng Ngay
          </Link>
          <Link
            href="/cart"
            className="border border-[#1b1b1b] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
          >
            Vào Giỏ Hàng
          </Link>
          <Link
            href="/adore"
            className="border border-[#8B1A1A] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
          >
            Xem Collection ADORE
          </Link>
          <Link
            href="/"
            className="border border-[#1b1b1b] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
          >
            Xem Trang Chủ
          </Link>
        </div>

        <motion.section
          variants={motionVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2"
        >
          <div>
            <ChapterHeader
              number={ourStoryContent.chapter1.number}
              title={ourStoryContent.chapter1.title}
            />
            <p className="font-body text-sm font-light leading-8 text-[#5a5550]">
              {ourStoryContent.chapter1.body}
            </p>
          </div>
          <ImageSlot
            aspectRatio="3/4"
            label="Founder portrait — no face visible"
            hint="portrait still / underexposed / anonymous"
            imageSrc={heroStoryImages[0]}
          />
        </motion.section>

        <motion.section
          variants={motionVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2"
        >
          <ImageSlot
            aspectRatio="1/1"
            label="Close-up: handwritten Hebrew tag, dark red ink"
            hint="ink texture / paper grain / hand motion"
            imageSrc={heroStoryImages[1]}
          />
          <div>
            <ChapterHeader
              number={ourStoryContent.chapter2.number}
              title={ourStoryContent.chapter2.title}
            />
            <p className="font-body text-sm font-light leading-8 text-[#5a5550]">
              {ourStoryContent.chapter2.body}
            </p>
          </div>
        </motion.section>

        <motion.section
          variants={motionVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 bg-[#080808] p-8"
        >
          <ChapterHeader
            number={ourStoryContent.chapter3.number}
            title={ourStoryContent.chapter3.title}
          />
          <p className="max-w-4xl font-editorial text-3xl font-light italic leading-tight text-[#f0ece8]">
            {ourStoryContent.chapter3.lead}
          </p>
          <SeamGrid className="mt-10 grid-cols-1 sm:grid-cols-3">
            {ourStoryContent.chapter3.chapters.map((chapter, index) => (
              <div key={chapter.name} className="bg-[#0a0a0a] p-4">
                <ImageSlot
                  aspectRatio="1/1"
                  label={chapter.name}
                  hint={chapter.note}
                  imageSrc={heroStoryImages[2 + index]}
                />
              </div>
            ))}
          </SeamGrid>
        </motion.section>

        <motion.section
          variants={motionVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20"
        >
          <ChapterHeader
            number={ourStoryContent.chapter4.number}
            title={ourStoryContent.chapter4.title}
          />
          <SeamGrid className="grid-cols-1 sm:grid-cols-3">
            {ourStoryContent.chapter4.beliefs.map((belief) => (
              <ManifestoCol
                key={belief.index}
                index={belief.index}
                title={belief.title}
                body={belief.body}
              />
            ))}
          </SeamGrid>
          <div className="mt-10">
            <ImageSlot
              aspectRatio="16/7"
              label="Two people, never facing each other. Red light. Underexposed."
              hint="cinematic landscape still"
              imageSrc={heroStoryImages[5]}
            />
          </div>
        </motion.section>

        <div className="py-20 text-center">
          <p className="font-editorial text-4xl font-light italic md:text-5xl">
            {ourStoryContent.closing.line}
          </p>
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/adore"
                className="inline-block border border-[#8B1A1A] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
              >
                Xem ADORE
              </Link>
              <Link
                href="/shop"
                className="inline-block border border-[#8B1A1A] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
              >
                Mua Ngay
              </Link>
            </div>
          </div>
          <p className="mt-8 font-body text-[9px] uppercase tracking-[0.45em] text-[#5a5550]">
            {ourStoryContent.closing.footer}
          </p>
        </div>
      </div>

      <QuoteBlock quote={ourStoryContent.closing.quote} />
    </main>
  );
}
