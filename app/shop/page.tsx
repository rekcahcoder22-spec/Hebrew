import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopPageClient } from "@/components/shop/ShopPageClient";
import { LanguageText } from "@/components/i18n/LanguageText";

export const metadata: Metadata = {
  title: "Cửa hàng — Shop streetwear & local brand HEBREW",
  description:
    "Mua áo thun, hoodie và streetwear limited drop HEBREW — local brand Việt Nam, chất liệu bền, form dáng rõ ràng. Xem toàn bộ sản phẩm đang mở bán.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "HEBREW Shop | Streetwear Vietnam",
    description:
      "Shop online: tees, hoodies & limited drops — handcrafted Vietnamese streetwear.",
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
