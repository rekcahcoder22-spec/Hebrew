"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

type LanguageTextProps = {
  en: string;
  vi: string;
};

export function LanguageText({ en, vi }: LanguageTextProps) {
  const { language } = useLanguage();
  return <>{language === "vi" ? vi : en}</>;
}
