"use client";

import { motion } from "framer-motion";
import { motionVariants } from "@/lib/content";

type Props = {
  text: string;
};

export function EasterEgg({ text }: Props) {
  return (
    <motion.div
      variants={motionVariants.easterEggReveal}
      initial="hidden"
      whileHover="visible"
      className="border-l border-[#8B1A1A] pl-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      <p className="font-editorial text-sm italic text-[#8B1A1A]">{text}</p>
    </motion.div>
  );
}
