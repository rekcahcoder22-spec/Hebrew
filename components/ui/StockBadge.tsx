import { cn } from "@/lib/utils";
import type { StockStatus } from "@/types";

function lowStockLabel(stock?: number) {
  if (stock != null && stock > 0) return `${stock} LEFT`;
  return "LOW STOCK";
}

export function StockBadge({
  status,
  stock,
  className,
}: {
  status: StockStatus;
  stock?: number;
  className?: string;
}) {
  const config: Record<
    StockStatus,
    { label: string; style: string }
  > = {
    "sold-out": {
      label: "SOLD OUT",
      style: "bg-hb-red text-white",
    },
    "low-stock": {
      label: lowStockLabel(stock),
      style: "bg-hb-gold text-hb-black",
    },
    "in-stock": {
      label: "IN STOCK",
      style: "bg-hb-white text-hb-black",
    },
    "coming-soon": {
      label: "COMING SOON",
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
