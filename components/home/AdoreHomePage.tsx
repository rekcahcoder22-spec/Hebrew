"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { EyebrowLabel } from "@/components/EyebrowLabel";
import { HebrewWordCTA } from "@/components/ui/HebrewWordMark";
import { ProductCard } from "@/components/ProductCard";
import { QuoteBlock } from "@/components/QuoteBlock";
import { RedLine } from "@/components/RedLine";
import { SeamGrid } from "@/components/SeamGrid";
import { adoreEditorialCtas, homeContent, motionVariants } from "@/lib/content";
import { getAdoreImagePool } from "@/lib/adoreImages";
import type { Product } from "@/types";

type AdoreCollectionResponse = {
  products: Product[];
};

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

function hasAnyKeyword(input: string, keywords: string[]): boolean {
  return keywords.some((keyword) => input.includes(keyword));
}

type ProductSlotRule = {
  idHints: string[];
  nameKeywords: string[];
};

type SlotImages = {
  entryFront?: string;
  entryBack?: string;
  birthFront?: string;
  birthBack?: string;
  inevitableFront?: string;
  inevitableBack?: string;
};

const EMPTY_SLOT_IMAGES: SlotImages = {
  entryFront: undefined,
  entryBack: undefined,
  birthFront: undefined,
  birthBack: undefined,
  inevitableFront: undefined,
  inevitableBack: undefined,
};

const ADORE_SLOT_RULES: Record<"entry" | "birth" | "inevitable", ProductSlotRule> = {
  entry: {
    idHints: ["entry", "adore-entry", "the-entry"],
    nameKeywords: ["entry"],
  },
  birth: {
    idHints: ["birth", "adore-birth", "the-birth"],
    nameKeywords: ["birth"],
  },
  inevitable: {
    idHints: [
      "hb-bx2yjbvomd",
      "inevitable",
      "crypt",
      "adore-inevitable",
      "the-inevitable",
    ],
    nameKeywords: ["inevitable", "crypt"],
  },
};

function normalizeId(id: string): string {
  return id.trim().toLowerCase();
}

function matchProductByRule(
  products: Product[],
  rule: ProductSlotRule,
): Product | undefined {
  const byId = products.find((product) => {
    const id = normalizeId(product.id);
    return rule.idHints.some((hint) => id === hint || id.includes(hint));
  });
  if (byId) return byId;

  return products.find((product) =>
    hasAnyKeyword(normalizeName(product.name), rule.nameKeywords),
  );
}

export function AdoreHomePage() {
  const [imagePool, setImagePool] = useState<string[]>([]);
  const [slotImages, setSlotImages] = useState<SlotImages>(EMPTY_SLOT_IMAGES);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/collections/adore");
        if (!res.ok) throw new Error("Failed to load adore collection");
        const data = (await res.json()) as AdoreCollectionResponse;
        if (!cancelled && Array.isArray(data?.products)) {
          const adoreProducts = data.products;
          setImagePool(getAdoreImagePool(adoreProducts));

          const entryProduct =
            matchProductByRule(adoreProducts, ADORE_SLOT_RULES.entry) ?? adoreProducts[0];
          const birthProduct =
            matchProductByRule(adoreProducts, ADORE_SLOT_RULES.birth) ?? adoreProducts[1];
          const inevitableProduct =
            matchProductByRule(adoreProducts, ADORE_SLOT_RULES.inevitable) ?? adoreProducts[2];

          setSlotImages({
            entryFront: entryProduct?.images[0],
            entryBack: entryProduct?.images[1],
            birthFront: birthProduct?.images[0],
            birthBack: birthProduct?.images[1],
            inevitableFront: inevitableProduct?.images[0],
            inevitableBack: inevitableProduct?.images[1],
          });
        }
      } catch {
        if (!cancelled) {
          setImagePool([]);
          setSlotImages(EMPTY_SLOT_IMAGES);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cardImages = useMemo(() => imagePool.slice(0, 3), [imagePool]);
  const entryFront = slotImages.entryFront ?? cardImages[0] ?? "/images/adore/entry-front.png";
  const entryBack = slotImages.entryBack ?? imagePool[1] ?? entryFront;
  const birthFront = slotImages.birthFront ?? cardImages[1] ?? "/images/adore/birth-front.png";
  const birthBack = slotImages.birthBack ?? imagePool[3] ?? imagePool[2] ?? birthFront;
  const inevitableFront =
    slotImages.inevitableFront ?? cardImages[2] ?? imagePool[4] ?? birthFront;
  const inevitableBack = slotImages.inevitableBack ?? imagePool[5] ?? imagePool[4] ?? inevitableFront;

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
          <p className="mx-auto max-w-2xl px-1 font-body text-[15px] font-light leading-[1.9] tracking-[0.1em] text-[#a39e98] sm:text-base sm:tracking-[0.12em] md:text-[17px] md:leading-8 md:tracking-[0.14em]">
            {homeContent.viLead}
          </p>
          <div className="flex justify-center">
            <RedLine />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <HebrewWordCTA href="/shop" variant="blood">
              {adoreEditorialCtas.orderInDrop}
            </HebrewWordCTA>
            <HebrewWordCTA href="/cart" variant="blood">
              {adoreEditorialCtas.openCart}
            </HebrewWordCTA>
            <HebrewWordCTA href="/our-story" variant="blood">
              {adoreEditorialCtas.readOurStory}
            </HebrewWordCTA>
            <HebrewWordCTA href="/adore" variant="ash" featured>
              {adoreEditorialCtas.stepIntoAdore}
            </HebrewWordCTA>
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
              imageSrc={
                index === 0
                  ? entryFront
                  : index === 1
                    ? birthFront
                    : inevitableFront
              }
              hoverImageSrc={
                index === 0 ? entryBack : index === 1 ? birthBack : inevitableBack
              }
              imageFit="contain"
              imagePriority={index === 0}
            />
          ))}
        </SeamGrid>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
          <HebrewWordCTA href="/shop" variant="blood">
            {adoreEditorialCtas.sizeThenOrder}
          </HebrewWordCTA>
          <HebrewWordCTA href="/cart" variant="ash">
            {adoreEditorialCtas.peekCart}
          </HebrewWordCTA>
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
