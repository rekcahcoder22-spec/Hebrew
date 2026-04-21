import type { Metadata } from "next";
import { PolicyLayout } from "@/components/layouts/PolicyLayout";
import { CooperateClient } from "./CooperateClient";

export const metadata: Metadata = {
  title: "Cooperate — HEBREW",
  description:
    "Partner with HEBREW. Collabs, resellers, photographers, and more.",
};

export default function CooperatePage() {
  return (
    <PolicyLayout title="COOPERATE" subtitle="BUILD SOMETHING TOGETHER">
      <CooperateClient />
    </PolicyLayout>
  );
}
