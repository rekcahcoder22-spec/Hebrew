import { Suspense } from "react";
import { ShopPageClient } from "@/components/shop/ShopPageClient";
import { LanguageText } from "@/components/i18n/LanguageText";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] border-b border-hb-border bg-hb-black px-4 py-24 text-center font-body text-sm text-hb-white/50">
          <LanguageText en="Loading shop…" vi="Đang tải cửa hàng…" />
        </div>
      }
    >
      <ShopPageClient />
    </Suspense>
  );
}
