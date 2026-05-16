"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";
import type { StockStatus } from "@/types";

export function StockBadge({
  status,
  stock,
  className,
}: {
  status: StockStatus;
  stock?: number;
  className?: string;
}) {
  const { t } = useLanguage();

  const lowStockLabel =
    stock != null && stock > 0
      ? t("stock.left", { count: stock })
      : t("stock.lowStock");

  const config: Record<StockStatus, { label: string; style: string }> = {
    "sold-out": {
      label: t("stock.soldOut"),
      style: "bg-hb-red text-white",
    },
    "low-stock": {
      label: lowStockLabel,
      style: "bg-hb-gold text-hb-black",
    },
    "in-stock": {
      label: t("stock.inStock"),
      style: "bg-hb-white text-hb-black",
    },
    "coming-soon": {
      label: t("stock.comingSoon"),
      style: "border border-hb-border bg-hb-gray text-hb-white",
    },
  };

  const { label, style } = config[status];

  return (
    <span
      className={cn(
        "inline-flex px-2 py-1 font-body text-[10px] uppercase tracking-widest",
        style,
        className,
      )}
    >
      {label}
    </span>
  );
}
