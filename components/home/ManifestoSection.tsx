"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

export function ManifestoSection() {
  const { t, language } = useLanguage();

  return (
    <section className="border-b border-hb-border bg-hb-gray px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p
          className={cn(
            "font-body text-[10px] uppercase text-hb-red",
            language === "vi" ? "tracking-[0.28em]" : "tracking-[0.4em]",
          )}
        >
          {t("manifesto.label")}
        </p>
        <blockquote
          className={cn(
            "mt-6 text-hb-white md:text-4xl",
            language === "vi"
              ? "font-body text-[2rem] font-semibold leading-[1.35] tracking-[0.02em]"
              : "font-display text-3xl leading-tight tracking-[0.08em]",
          )}
        >
          {t("manifesto.quote")}
        </blockquote>
        <p
          className={cn(
            "mt-8 font-body text-sm text-hb-white/50",
            language === "vi" ? "leading-7 tracking-[0.01em]" : "",
          )}
        >
          {t("manifesto.desc")}
        </p>
      </div>
    </section>
  );
}
