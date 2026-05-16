"use client";

import { PolicyTable } from "@/components/layouts/PolicyLayout";
import { useLanguage } from "@/components/providers/LanguageProvider";

type BilingualRow = { en: string[]; vi: string[] };

export function BilingualPolicyTable({
  headers,
  rows,
}: {
  headers: { en: string[]; vi: string[] };
  rows: BilingualRow[];
}) {
  const { language } = useLanguage();
  const pick = (pair: { en: string[]; vi: string[] }) =>
    language === "vi" ? pair.vi : pair.en;

  return (
    <PolicyTable
      headers={pick(headers)}
      rows={rows.map((row) => pick(row))}
    />
  );
}
