"use client";

import { useCallback, useState } from "react";
import { Inter_Tight } from "next/font/google";
import { LanguageText } from "@/components/i18n/LanguageText";
import { LOOKBOOK_VOLUME } from "@/lib/lookbookVolume";

import { cn } from "@/lib/utils";

const interTight = Inter_Tight({
  weight: "800",
  subsets: ["latin", "vietnamese"],
  variable: "--font-lookbook-title",
  display: "swap",
});

const shots = LOOKBOOK_VOLUME.shots;

/** Xếp chồng 8 ảnh + lệch nhẹ desktop */
const stripWrap = [
  "w-full shrink-0",
  "w-full shrink-0 lg:max-w-[min(92%,920px)] lg:translate-x-[4%]",
  "w-full shrink-0 lg:max-w-[min(78%,780px)] lg:-translate-x-[2%]",
  "w-full shrink-0 lg:max-w-[min(94%,960px)] lg:ml-auto lg:translate-x-[-3%]",
  "w-full shrink-0",
  "w-full shrink-0 lg:max-w-[min(72%,680px)] lg:translate-x-[6%]",
  "w-full shrink-0 lg:max-w-[min(88%,880px)] lg:ml-auto lg:-translate-x-[4%]",
  "w-full shrink-0 lg:max-w-[min(80%,800px)] lg:translate-x-[3%]",
] as const;

const imgClass = "block h-auto w-full object-cover select-none";

function LookbookFrame({
  src,
  fallbackSrc,
  alt,
  intrinsicW,
  intrinsicH,
  maxHeightClass = "max-h-[min(75vh,800px)]",
  objectPosition = "center center",
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  intrinsicW: number;
  intrinsicH: number;
  maxHeightClass?: string;
  objectPosition?: string;
}) {
  const [activeSrc, setActiveSrc] = useState(src);

  const onError = useCallback(() => {
    setActiveSrc((prev) => (prev !== fallbackSrc ? fallbackSrc : prev));
  }, [fallbackSrc]);

  return (
    <div className="w-full overflow-hidden rounded-none border border-zinc-800 bg-zinc-950 transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">
      <img
        key={activeSrc}
        src={activeSrc}
        alt={alt}
        width={intrinsicW}
        height={intrinsicH}
        loading="eager"
        decoding="async"
        onError={onError}
        className={cn(imgClass, maxHeightClass)}
        style={{ objectPosition }}
      />
    </div>
  );
}

export function LookbookVolume() {
  return (
    <div className={`${interTight.variable} min-h-screen bg-black text-white`}>
      <header className="mx-auto max-w-[1600px] px-6 pb-16 pt-10 md:px-12 md:pb-24 md:pt-16 lg:px-16">
        <p className="font-body text-[11px] uppercase tracking-[0.4em] text-zinc-500">
          <LanguageText en="Lookbook" vi="Lookbook" />
        </p>
        <h1
          className="mt-5 font-[family-name:var(--font-lookbook-title)] text-[clamp(3rem,11vw,7.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-white"
          style={{ fontStretch: "condensed" }}
        >
          VOLUME {LOOKBOOK_VOLUME.number}
        </h1>
        <p className="mt-6 max-w-xl font-editorial text-base leading-[1.65] text-zinc-400 md:mt-8 md:text-[17px] md:leading-[1.7]">
          <LanguageText
            en="Editorial spreads and on-body fits from the latest covenant drop. Shot in Seoul — night grade, minimal flash, maximum negative space."
            vi="Bộ ảnh editorial và on-body fit từ đợt phát hành mới nhất. Chụp tại Seoul — tông đêm, flash tối giản, khoảng trống tối đa."
          />
        </p>
        <div className="mt-10 h-px w-20 bg-zinc-700" aria-hidden />
      </header>

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-12 md:pb-32 lg:px-16">
        <div className="flex flex-col gap-14 md:gap-16 lg:gap-[5.5rem]">
          {shots.map((shot, i) => (
            <article key={shot.id} className={cn("mx-auto", stripWrap[i])}>
              <LookbookFrame
                src={shot.src}
                fallbackSrc={shot.fallbackSrc}
                alt={shot.alt}
                intrinsicW={shot.intrinsicW}
                intrinsicH={shot.intrinsicH}
                maxHeightClass={shot.maxHeightClass}
                objectPosition={shot.objectPosition}
              />
              <FrameLabel index={i} />
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-14 md:px-12 lg:px-16">
        <p className="font-editorial text-base italic text-zinc-500">
          <LanguageText
            en="The Broken — Vol. I · HEBREW"
            vi="The Broken — Vol. I · HEBREW"
          />
        </p>
      </footer>
    </div>
  );
}

function FrameLabel({ index }: { index: number }) {
  return (
    <p className="mt-4 font-body text-[10px] uppercase tracking-[0.3em] text-zinc-600">
      {String(index + 1).padStart(2, "0")} /{" "}
      {String(LOOKBOOK_VOLUME.shots.length).padStart(2, "0")}
    </p>
  );
}
