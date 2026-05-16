import type { Metadata } from "next";
import { LookbookVolume } from "@/components/lookbook/LookbookVolume";

export const metadata: Metadata = {
  title: "Lookbook VOLUME 06 | HEBREW Streetwear",
  description:
    "Lookbook HEBREW VOLUME 06: editorial darkwear, on-body fit, brutalist layout — streetwear Việt Nam, tông đêm Seoul.",
  alternates: {
    canonical: "/lookbook",
  },
  openGraph: {
    title: "HEBREW Lookbook — VOLUME 06",
    description:
      "Bộ ảnh editorial brutalist: dark industrial fashion, minimalist streetwear.",
    url: "/lookbook",
    type: "article",
  },
};

export default function LookbookPage() {
  return <LookbookVolume />;
}
