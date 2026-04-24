"use client";

import { cn } from "@/lib/utils";

/** Đoạn lặp cho animation marquee (2 bản sao = loop mượt). */
const SEGMENT =
  "FREESHIP — ĐƠN TỪ TRÊN 2 SẢN PHẨM — ƯU ĐÃI GIAO HÀNG — HEBREW — ";

type Props = {
  /** Giỏ có trên 2 món (≥3) — nhấn mạnh viền/chữ */
  unlocked?: boolean;
};

export function FreeShipMarquee({ unlocked = false }: Props) {
  const row = `${SEGMENT}${SEGMENT}`;
  return (
    <div
      className={cn(
        "flex h-10 w-full shrink-0 items-center overflow-hidden border-b bg-blood-ink transition-colors duration-300",
        unlocked
          ? "border-luxury-gold/60 shadow-[0_0_20px_rgba(201,169,98,0.12)]"
          : "border-luxury-gold/30",
      )}
    >
      <div
        className={cn(
          "animate-marquee flex w-max whitespace-nowrap font-product text-[11px] font-medium uppercase tracking-[0.32em]",
          unlocked ? "text-luxury-gold" : "text-hb-white/90",
        )}
        aria-live="polite"
      >
        <span className="pr-10">{row}</span>
        <span className="pr-10">{row}</span>
      </div>
    </div>
  );
}
