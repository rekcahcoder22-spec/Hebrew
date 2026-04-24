import type { Metadata } from "next";
import { PolicyLayout } from "@/components/layouts/PolicyLayout";
import { LanguageText } from "@/components/i18n/LanguageText";
import { CareersClient } from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers — HEBREW",
  description:
    "Join the HEBREW team. We are looking for bold, creative individuals.",
};

export default function CareersPage() {
  return (
    <PolicyLayout
      title={<LanguageText en="CAREERS" vi="TUYỂN DỤNG" />}
      subtitle={<LanguageText en="JOIN THE MOVEMENT" vi="THAM GIA CÙNG CHÚNG TÔI" />}
    >
      <CareersClient />
    </PolicyLayout>
  );
}
