import type { Metadata } from "next";
import { AdoreCollectionPage } from "@/components/adore/AdoreCollectionPage";

export const metadata: Metadata = {
  title: "ADORE — Collection | HEBREW",
  description: "ADORE collection detail — Chapter 01 of The Broken.",
};

export default function AdorePage() {
  return <AdoreCollectionPage />;
}
