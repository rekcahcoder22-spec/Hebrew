"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Editorial word-mark CTAs - Cinzel caps + thin rule (HEBREW voice). */
export const hebrewWordMarkVariants = {
  blood: "border-hb-red text-[#f0ece8] hover:border-[#f0ece8]",
  ash: "border-[#3d2b2b] text-[#f0ece8]/90 hover:border-hb-red hover:text-[#f0ece8]",
  ghost: "border-transparent text-hb-white/45 hover:border-hb-red hover:text-hb-red",
  onAccent: "border-white/55 text-white hover:border-white",
} as const;

export type HebrewWordMarkVariant = keyof typeof hebrewWordMarkVariants;

const wordInline =
  "inline-flex items-center gap-2 border-b pb-[0.38rem] font-brand-serif text-[10px] font-semibold uppercase tracking-[0.26em] transition-colors duration-300";

const wordBlockBlood =
  "flex w-full items-center justify-center border-b-2 border-hb-red bg-hb-red/[0.06] py-4 font-brand-serif text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f0ece8] transition-all duration-300 hover:bg-hb-red/12 hover:border-[#f0ece8] disabled:pointer-events-none disabled:opacity-40";

const wordBlockMuted =
  "flex w-full items-center justify-center border-b-2 border-hb-border bg-transparent py-3.5 font-brand-serif text-[11px] font-semibold uppercase tracking-[0.28em] text-hb-white/55 transition-all duration-300 hover:border-hb-white/40 hover:text-hb-white disabled:pointer-events-none disabled:opacity-40";

type LinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & {
  variant?: HebrewWordMarkVariant;
  /** Full-width rule strip - checkout, cart primary */
  block?: boolean;
  className?: string;
};

export function HebrewWordCTA({
  variant = "blood",
  block = false,
  className,
  ...props
}: LinkProps) {
  return (
    <Link
      className={cn(
        block ? wordBlockBlood : cn(wordInline, hebrewWordMarkVariants[variant]),
        className,
      )}
      {...props}
    />
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: HebrewWordMarkVariant;
  block?: boolean;
  /** Second row primary - wishlist-style rule */
  blockTone?: "blood" | "muted";
};

export function HebrewWordButton({
  variant = "blood",
  block = false,
  blockTone = "blood",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const blockClass = blockTone === "muted" ? wordBlockMuted : wordBlockBlood;
  return (
    <button
      type={type}
      className={cn(
        block ? blockClass : cn(wordInline, hebrewWordMarkVariants[variant]),
        className,
      )}
      {...props}
    />
  );
}
