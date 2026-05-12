"use client";

import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { HebrewWordCTA } from "@/components/ui/HebrewWordMark";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function DropBanner({
  dropTitle,
  dropDate,
}: {
  dropTitle: string;
  dropDate: string;
}) {
  const { t } = useLanguage();

  return (
    <section className="bg-hb-red py-8">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="font-display text-4xl uppercase tracking-[0.08em] text-white">
          🔴 {t("drop.liveNow")} · {dropTitle}
        </p>
        <div className="mt-8 flex justify-center">
          <CountdownTimer targetDate={dropDate} />
        </div>
        <div className="mt-10">
          <HebrewWordCTA href="/shop" variant="onAccent" className="text-[11px] tracking-[0.3em]">
            {t("drop.shopNow")} →
          </HebrewWordCTA>
        </div>
      </div>
    </section>
  );
}
