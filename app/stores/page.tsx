import type { Metadata } from "next";
import { StoresPageBody } from "@/components/stores/StoresPageBody";

export const metadata: Metadata = {
  title: "Cửa hàng HEBREW Đà Nẵng & Hà Tĩnh | Hệ thống store",
  description:
    "Địa chỉ showroom HEBREW: 89 Lê Văn Hưu Đà Nẵng và cửa hàng Hà Tĩnh — ghé thử streetwear local brand, hotline & giờ mở cửa.",
  alternates: {
    canonical: "/stores",
  },
  openGraph: {
    title: "HEBREW Stores | Đà Nẵng & Hà Tĩnh",
    description: "Showroom streetwear Việt Nam — Đà Nẵng và Hà Tĩnh.",
    url: "/stores",
    type: "website",
  },
};

export default function StoresPage() {
  return <StoresPageBody />;
}
