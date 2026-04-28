import type { Metadata } from "next";
import { AdoreOurStoryPage } from "@/components/our-story/AdoreOurStoryPage";

export const metadata: Metadata = {
  title: "Our Story — ADORE | HEBREW",
  description: "The Broken universe and origin story of HEBREW.",
};

export default function OurStoryPage() {
  return <AdoreOurStoryPage />;
}
