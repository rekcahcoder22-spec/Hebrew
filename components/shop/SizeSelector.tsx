"use client";

import { cn } from "@/lib/utils";
import type { Size } from "@/types";

export function SizeSelector({
  sizes,
  value,
  onChange,
  stock,
}: {
  sizes: Size[];
  value: Size | null;
  onChange: (s: Size) => void;
  stock: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:grid-cols-none">
      {sizes.map((s) => {
        const qty = stock[s] ?? 0;
        const disabled = qty <= 0;
        const active = value === s;
        return (
          <button
            key={s}
            type="button"
            disabled={disabled}
            onClick={() => onChange(s)}
            className={cn(
              "min-h-[44px] border px-3 py-2.5 font-body text-xs uppercase tracking-widest transition",
              active
                ? "border-hb-red bg-hb-red text-hb-white"
                : "border-hb-border text-hb-white/70 hover:border-hb-white/40",
              disabled && "cursor-not-allowed opacity-30",
            )}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
