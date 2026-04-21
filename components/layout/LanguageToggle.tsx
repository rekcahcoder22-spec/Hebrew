"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded border border-hb-border bg-hb-black/60 p-0.5">
      <button
        type="button"
        onClick={() => setLanguage("vi")}
        className={cn(
          "px-2 py-1 font-body text-[10px] uppercase tracking-widest transition-colors",
          language === "vi"
            ? "bg-hb-red text-white"
            : "text-hb-white/60 hover:text-hb-white",
        )}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={cn(
          "px-2 py-1 font-body text-[10px] uppercase tracking-widest transition-colors",
          language === "en"
            ? "bg-hb-red text-white"
            : "text-hb-white/60 hover:text-hb-white",
        )}
      >
        EN
      </button>
    </div>
  );
}
