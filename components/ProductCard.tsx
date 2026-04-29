"use client";

import { motion } from "framer-motion";
import { EasterEgg } from "@/components/EasterEgg";
import { EyebrowLabel } from "@/components/EyebrowLabel";
import { ImageSlot } from "@/components/ImageSlot";
import { motionVariants } from "@/lib/content";

type Props = {
  chapter: string;
  name: string;
  conceptLine: string;
  copy: string;
  easterEgg: string;
  imageSrc?: string;
  hoverImageSrc?: string;
  imageFit?: "cover" | "contain";
  imagePriority?: boolean;
};

export function ProductCard({
  chapter,
  name,
  conceptLine,
  copy,
  easterEgg,
  imageSrc,
  hoverImageSrc,
  imageFit,
  imagePriority = false,
}: Props) {
  return (
    <motion.article
      variants={motionVariants.fadeUp}
      className="group flex h-full flex-col bg-[#0a0a0a] p-5"
    >
      <ImageSlot
        aspectRatio="3/4"
        label={`${name} IMAGE SLOT`}
        hint="editorial still — no stock photo"
        imageSrc={imageSrc}
        hoverImageSrc={hoverImageSrc}
        imageAlt={name}
        fit={imageFit}
        preserveOriginalColors
        priority={imagePriority}
      />
      <div className="mt-6 space-y-4">
        <EyebrowLabel>{chapter}</EyebrowLabel>
        <h3 className="font-editorial text-4xl font-light text-[#f0ece8]">
          {name}
        </h3>
        <p className="font-editorial text-lg italic text-[#8B1A1A]">
          {conceptLine}
        </p>
        <p className="whitespace-pre-line font-body text-sm font-light leading-7 text-[#5a5550]">
          {copy}
        </p>
        <EasterEgg text={easterEgg} />
      </div>
    </motion.article>
  );
}
