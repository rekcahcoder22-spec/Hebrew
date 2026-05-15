import type { Metadata } from "next";
import { AdoreHomePage } from "@/components/home/AdoreHomePage";

/** Trang chủ: title/description rõ intent (local brand, shop, địa điểm) — hỗ trợ Google chọn sitelinks theo thuật toán. */
export const metadata: Metadata = {
  title: "HEBREW | Streetwear Việt Nam — Shop Local Brand & Limited Drop",
  description:
    "HEBREW là local brand streetwear Việt Nam: áo thun, hoodie, limited drop, chất lượng handmade. Mua online; cửa hàng Đà Nẵng & Hà Tĩnh. Khám phá shop, lookbook và câu chuyện thương hiệu.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HEBREW | Streetwear Vietnam | Local Brand",
    description:
      "Limited drops, handcrafted streetwear. Vietnamese label — shop online & stores.",
    url: "/",
    type: "website",
  },
};

export default function Page() {
  return <AdoreHomePage />;
}
