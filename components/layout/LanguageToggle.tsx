"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

function VietnamFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="16" fill="#DA251D" />
      <path
        d="M12 3.3l1.23 3.31h3.54l-2.88 2.06 1.1 3.48L12 10.02 9 12.15l1.1-3.48-2.88-2.06h3.54L12 3.3z"
        fill="#FFDE00"
      />
    </svg>
  );
}

function UkFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#FFF" strokeWidth="3" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M12 0v16M0 8h24" stroke="#FFF" strokeWidth="5" />
      <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
}

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-hb-border bg-hb-black/65 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur">
      <button
        type="button"
        onClick={() => setLanguage("vi")}
        aria-label={t("lang.switchToVi")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[10px] uppercase tracking-widest transition-colors",
          language === "vi"
            ? "bg-hb-red text-white shadow"
            : "text-hb-white/60 hover:text-hb-white",
        )}
      >
        <VietnamFlag className="h-3 w-4 rounded-[2px]" />
        VI
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-label={t("lang.switchToEn")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[10px] uppercase tracking-widest transition-colors",
          language === "en"
            ? "bg-hb-red text-white shadow"
            : "text-hb-white/60 hover:text-hb-white",
        )}
      >
        <UkFlag className="h-3 w-4 rounded-[2px]" />
        EN
      </button>
    </div>
  );
}
