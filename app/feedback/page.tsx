import type { Metadata } from "next";
import { PolicyLayout } from "@/components/layouts/PolicyLayout";
import { LanguageText } from "@/components/i18n/LanguageText";
import { FeedbackClient } from "./FeedbackClient";

export const metadata: Metadata = {
  title: "Feedback — HEBREW",
  description: "Share your experience with HEBREW. We listen to improve.",
};

export default function FeedbackPage() {
  return (
    <PolicyLayout
      title={<LanguageText en="FEEDBACK" vi="GÓP Ý" />}
      subtitle={<LanguageText en="WE'RE LISTENING" vi="CHÚNG TÔI LUÔN LẮNG NGHE" />}
    >
      <FeedbackClient />
    </PolicyLayout>
  );
}
