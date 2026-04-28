"use client";

import { motion } from "framer-motion";
import { motionVariants } from "@/lib/content";

type Props = {
  orientation?: "vertical" | "horizontal";
  length?: number;
  className?: string;
};

export function RedLine({
  orientation = "vertical",
  length = 80,
  className = "",
}: Props) {
  const style =
    orientation === "vertical" ? { height: length, width: 1 } : { width: length, height: 1 };

  return (
    <motion.span
      aria-hidden
      variants={motionVariants.redLineReveal}
      className={`block origin-top bg-[#8B1A1A] ${className}`}
      style={style}
    />
  );
}
