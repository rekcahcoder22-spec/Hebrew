"use client";

import type { Product } from "@/types";

const categories = [
  "all",
  "hoodies",
  "tees",
  "pants",
  "accessories",
  "outerwear",
] as const;

export function ProductFilter({
  value,
  onChange,
  products,
}: {
  value: string;
  onChange: (c: string) => void;
  products: Product[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const count =
          c === "all"
            ? products.length
            : products.filter((p) => p.category === c).length;
        const active = value === c;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`border px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.2em] transition ${
              active
                ? "border-hb-gold text-hb-gold"
                : "border-hb-border text-hb-white/50 hover:border-hb-white/40 hover:text-hb-white"
            }`}
          >
            {c} ({count})
          </button>
        );
      })}
    </div>
  );
}
