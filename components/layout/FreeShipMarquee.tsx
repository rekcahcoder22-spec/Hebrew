"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

type Props = {
  /** Giỏ có từ 2 món trở lên — nhấn mạnh viền/chữ nhẹ */
  unlocked?: boolean;
};

export function FreeShipMarquee({ unlocked = false }: Props) {
  const { t } = useLanguage();
  const segment = t("marquee.segment");
  const row = `${segment}${segment}`;
  return (
    <div
      className={cn(
        "flex h-7 w-full shrink-0 items-center overflow-hidden border-b border-hb-border/40 bg-void/95 transition-colors duration-500",
        unlocked && "border-luxury-gold/35 bg-blood-ink/80",
      )}
    >
      <div
        className={cn(
          "animate-marquee-slow flex w-max whitespace-nowrap font-body text-[9px] font-light uppercase tracking-[0.42em]",
          unlocked ? "text-luxury-gold/85" : "text-hb-white/40",
        )}
        aria-live="polite"
      >
        <span className="pr-10">{row}</span>
        <span className="pr-10">{row}</span>
      </div>
    </div>
  );
}
