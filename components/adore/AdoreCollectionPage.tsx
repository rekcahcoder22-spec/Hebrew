"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { EyebrowLabel } from "@/components/EyebrowLabel";
import { EasterEgg } from "@/components/EasterEgg";
import { ImageSlot } from "@/components/ImageSlot";
import { motionVariants, adorePageContent } from "@/lib/content";
import { getAdoreImagePool } from "@/lib/adoreImages";
import type { Product } from "@/types";

export function AdoreCollectionPage() {
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

  const heroImage = useMemo(() => imagePool[0], [imagePool]);
  const productImages = useMemo(() => imagePool.slice(1, 4), [imagePool]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-24 text-[#f0ece8]">
      <div className="mx-auto max-w-6xl">
        <motion.section
          variants={motionVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <EyebrowLabel>{adorePageContent.subtitle}</EyebrowLabel>
          <h1 className="mt-3 font-editorial text-7xl font-light italic md:text-9xl">
            {adorePageContent.title}
          </h1>
          <p className="mt-6 max-w-3xl font-body text-sm font-light leading-8 text-[#5a5550]">
            {adorePageContent.concept}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
              href="/shop"
              className="border border-[#1b1b1b] px-4 py-2 font-body text-[9px] uppercase tracking-[0.35em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
            >
              Xem Shop
            </Link>
          </div>
          <div className="mt-10">
            <ImageSlot
              aspectRatio="21/9"
              label="ADORE HERO FRAME"
              hint="chapter-wide visual atmosphere"
              imageSrc={heroImage}
              preserveOriginalColors
            />
          </div>
        </motion.section>

        <div className="mt-16 space-y-10">
          {adorePageContent.products.map((product, index) => (
            <motion.article
              key={product.name}
              variants={motionVariants.fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="group grid grid-cols-1 gap-px bg-[#161616] md:grid-cols-[minmax(0,420px)_1fr]"
            >
              <div className="bg-[#0a0a0a] p-5">
                <ImageSlot
                  aspectRatio="3/4"
                  label={`${product.name} SLOT`}
                  hint={`chapter ${product.chapter} still`}
                  imageSrc={productImages[index]}
                  preserveOriginalColors
                />
              </div>
              <div className="bg-[#0a0a0a] p-6">
                <EyebrowLabel>
                  CHAPTER {product.chapter} — {product.name}
                </EyebrowLabel>
                <div className="mt-6 border border-[#1b1b1b]">
                  {product.details.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[140px_1fr] border-b border-[#1b1b1b] last:border-b-0"
                    >
                      <p className="border-r border-[#1b1b1b] px-3 py-2 font-body text-xs font-light text-[#8B1A1A]">
                        {label}
                      </p>
                      <p className="px-3 py-2 font-body text-xs font-light text-[#5a5550]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <EasterEgg text={product.easterEgg} />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/shop"
                    className="border border-[#8B1A1A] px-3 py-2 font-body text-[9px] uppercase tracking-[0.3em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
                  >
                    Đặt Hàng
                  </Link>
                  <Link
                    href="/cart"
                    className="border border-[#1b1b1b] px-3 py-2 font-body text-[9px] uppercase tracking-[0.3em] text-[#f0ece8] transition-transform duration-200 hover:scale-[0.98]"
                  >
                    Vào Giỏ
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {imagePool.length > 0 ? (
          <motion.section
            variants={motionVariants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-16"
          >
            <EyebrowLabel>ADORE IMAGE ARCHIVE</EyebrowLabel>
            <div className="mt-4 grid grid-cols-2 gap-px bg-[#161616] sm:grid-cols-3 md:grid-cols-4">
              {imagePool.map((src, index) => (
                <div key={`${src}-${index}`} className="bg-[#0a0a0a] p-2">
                  <ImageSlot
                    aspectRatio="1/1"
                    label={`FRAME ${index + 1}`}
                    imageSrc={src}
                    preserveOriginalColors
                  />
                </div>
              ))}
            </div>
          </motion.section>
        ) : null}
      </div>
    </main>
  );
}
