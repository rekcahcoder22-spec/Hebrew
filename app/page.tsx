import type { Metadata } from "next";
import { AdoreHomePage } from "@/components/home/AdoreHomePage";

/** Trang chủ: title/description rõ DNA HEBREW — OG/Twitter merge với layout. */
export const metadata: Metadata = {
  title: "HEBREW | Streetwear Việt Nam — Shop Local Brand & Limited Drop",
  description:
    "HEBREW — không phải để giấu cảm xúc. Là để mặc chúng ra ngoài. Limited drop. 270GSM. Vietnam.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HEBREW | Streetwear Vietnam | Local Brand",
    description:
      "HEBREW — không phải để giấu cảm xúc. Là để mặc chúng ra ngoài. Limited drop. 270GSM. Vietnam.",
    url: "/",
    type: "website",
  },
};

export default function Page() {
  return <AdoreHomePage />;
}
