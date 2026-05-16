"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

/** Inline bilingual text — use inside server or client parents. */
export function B({ en, vi }: { en: string; vi: string }) {
  const { language } = useLanguage();
  return <>{language === "vi" ? vi : en}</>;
}
