import type { Metadata } from "next";
import { PolicyLayout } from "@/components/layouts/PolicyLayout";
import { FeedbackClient } from "./FeedbackClient";

export const metadata: Metadata = {
  title: "Feedback — HEBREW",
  description: "Share your experience with HEBREW. We listen to improve.",
};

export default function FeedbackPage() {
  return (
    <PolicyLayout title="FEEDBACK" subtitle="WE'RE LISTENING">
      <FeedbackClient />
    </PolicyLayout>
  );
}
