import type { Metadata } from "next";
import { PolicyLayout } from "@/components/layouts/PolicyLayout";
import { LanguageText } from "@/components/i18n/LanguageText";
import { CooperateClient } from "./CooperateClient";

export const metadata: Metadata = {
  title: "Cooperate — HEBREW",
  description:
    "Partner with HEBREW. Collabs, resellers, photographers, and more.",
};

export default function CooperatePage() {
  return (
    <PolicyLayout
      title={<LanguageText en="COOPERATE" vi="HỢP TÁC" />}
      subtitle={<LanguageText en="BUILD SOMETHING TOGETHER" vi="CÙNG NHAU TẠO GIÁ TRỊ" />}
    >
      <CooperateClient />
    </PolicyLayout>
  );
}
