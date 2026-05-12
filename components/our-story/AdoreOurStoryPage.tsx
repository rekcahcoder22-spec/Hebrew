"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChapterHeader } from "@/components/ChapterHeader";
import { HebrewWordCTA } from "@/components/ui/HebrewWordMark";
import { ImageSlot } from "@/components/ImageSlot";
import { ManifestoCol } from "@/components/ManifestoCol";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SeamGrid } from "@/components/SeamGrid";
import { EyebrowLabel } from "@/components/EyebrowLabel";
import { adoreEditorialCtas, motionVariants, ourStoryContent } from "@/lib/content";
import { getAdoreImagePool } from "@/lib/adoreImages";
import type { Product } from "@/types";

/** Chapter 01 - cố định flat lay front basic tee (không lấy random từ pool). */
const OUR_STORY_CHAPTER1_IMAGE = "/images/our-story/front-basic-tee.png";

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

  /** Bỏ slot đầu pool - Chapter 01 dùng ảnh static front basic tee. */
  const heroStoryImages = useMemo(() => imagePool.slice(1, 6), [imagePool]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-24 text-[#f0ece8]">
      <div className="mx-auto max-w-6xl">
        <EyebrowLabel>{ourStoryContent.subtitle}</EyebrowLabel>
        <h1 className="mt-4 font-editorial text-6xl font-light italic md:text-8xl">
          {ourStoryContent.title}
        </h1>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
          <HebrewWordCTA href="/shop" variant="blood">
            {adoreEditorialCtas.orderInDrop}
          </HebrewWordCTA>
          <HebrewWordCTA href="/cart" variant="ash">
            {adoreEditorialCtas.openCart}
          </HebrewWordCTA>
          <HebrewWordCTA href="/adore" variant="blood">
            {adoreEditorialCtas.collectionAdore}
          </HebrewWordCTA>
          <HebrewWordCTA href="/" variant="ash">
            {adoreEditorialCtas.homeLayer}
          </HebrewWordCTA>
        </div>

        <motion.section
          variants={motionVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 grid grid-cols-1 items-start gap-10 md:grid-cols-2"
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
            aspectRatio="1/1"
            fit="contain"
            label="Front basic tee · HEBREW®"
            hint="flat lay / studio"
            imageSrc={OUR_STORY_CHAPTER1_IMAGE}
            imageAlt="HEBREW front basic tee"
            preserveOriginalColors
            className="mx-auto w-full max-w-md md:mx-0 md:ml-auto md:max-w-lg"
            sizes="(max-width: 768px) min(100vw, 28rem), (max-width: 1200px) 45vw, 32rem"
            priority
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
            imageSrc={heroStoryImages[0]}
            preserveOriginalColors
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
                  imageSrc={heroStoryImages[1 + index]}
                  preserveOriginalColors
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
              aspectRatio="3/2"
              fit="contain"
              label="Chapter still · product on set"
              hint="full frame garment"
              imageSrc={heroStoryImages[4]}
              imageAlt="HEBREW · product still"
              preserveOriginalColors
              sizes="(max-width: 768px) 100vw, min(100vw, 72rem)"
            />
          </div>
        </motion.section>

        <div className="py-20 text-center">
          <p className="font-editorial text-4xl font-light italic md:text-5xl">
            {ourStoryContent.closing.line}
          </p>
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
              <HebrewWordCTA href="/adore" variant="blood">
                {adoreEditorialCtas.closingAdore}
              </HebrewWordCTA>
              <HebrewWordCTA href="/shop" variant="blood">
                {adoreEditorialCtas.closingShop}
              </HebrewWordCTA>
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
