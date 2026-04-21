"use client";

import { MarqueeTicker } from "@/components/home/MarqueeTicker";
import { useLanguage } from "@/components/providers/LanguageProvider";

const noiseDataUrl =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="hb-hero-cursor relative min-h-[100vh] overflow-hidden bg-hb-black">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: noiseDataUrl }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px)",
        }}
      />

      <div className="relative z-10 flex min-h-[100vh] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-32 pt-8 text-center">
          <h1 className="animate-glitch select-none font-display text-[20vw] leading-none tracking-[0.05em] text-hb-white">
            HEBREW
          </h1>
          <p className="mt-6 font-body text-xs uppercase tracking-[0.4em] text-hb-white/70">
            {t("hero.tagline")}
          </p>
          <p className="mt-4 animate-pulse font-body text-xs uppercase tracking-widest text-hb-red">
            {t("hero.newDrop")} ↓
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <MarqueeTicker />
        </div>
      </div>
    </section>
  );
}
