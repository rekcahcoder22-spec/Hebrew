import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopPageClient } from "@/components/shop/ShopPageClient";
import { LanguageText } from "@/components/i18n/LanguageText";

export const metadata: Metadata = {
  title: "Cua Hang",
  description:
    "Kham pha toan bo san pham HEBREW: streetwear limited drop, chat lieu ben, form dang toi gian.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "HEBREW Shop",
    description:
      "Kham pha toan bo san pham HEBREW voi drop gioi han va chat lieu duoc chon loc.",
    url: "/shop",
    type: "website",
  },
};

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
