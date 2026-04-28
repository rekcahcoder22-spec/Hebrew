import { Suspense } from "react";
import { CollectionPageClient } from "@/components/collections/CollectionPageClient";
import { LanguageText } from "@/components/i18n/LanguageText";

export default function CollectionBySlugPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] border-b border-hb-border bg-hb-black px-4 py-24 text-center font-body text-sm text-hb-white/50">
          <LanguageText en="Loading…" vi="Đang tải…" />
        </div>
      }
    >
      <CollectionPageClient />
    </Suspense>
  );
}
