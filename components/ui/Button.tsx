import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center px-5 py-2.5 text-sm font-body uppercase tracking-widest transition-colors disabled:opacity-40";
  const styles = {
    primary: "bg-hb-red text-hb-white hover:bg-hb-red/90",
    ghost: "text-hb-white hover:bg-hb-gray",
    outline:
      "border border-hb-border text-hb-white hover:border-hb-gold hover:text-hb-gold",
  };
  return (
    <button
      type="button"
      className={cn(base, styles[variant], className)}
      {...props}
    />
  );
}
