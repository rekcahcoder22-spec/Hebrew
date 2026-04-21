"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export function ManifestoSection() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-hb-border bg-hb-gray px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-[10px] uppercase tracking-[0.4em] text-hb-red">
          {t("manifesto.label")}
        </p>
        <blockquote className="mt-6 font-display text-3xl leading-tight tracking-[0.08em] text-hb-white md:text-4xl">
          {t("manifesto.quote")}
        </blockquote>
        <p className="mt-8 font-body text-sm text-hb-white/50">
          {t("manifesto.desc")}
        </p>
      </div>
    </section>
  );
}
