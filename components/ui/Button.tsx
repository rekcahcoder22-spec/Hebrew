import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

/** Newsletter / compact forms - word-mark style aligned with {@link HebrewWordMark}. */
export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center px-4 py-2.5 font-brand-serif text-[10px] font-semibold uppercase tracking-[0.26em] transition-colors duration-300 disabled:opacity-40 border-b pb-2.5 pt-1";
  const styles = {
    primary: "border-hb-red bg-transparent text-[#f0ece8] hover:border-[#f0ece8]",
    ghost: "border-transparent text-hb-white hover:border-hb-white/35",
    outline:
      "border-hb-border text-hb-white hover:border-hb-red hover:text-hb-red",
  };
  return (
    <button
      type={type}
      className={cn(base, styles[variant], className)}
      {...props}
    />
  );
}
