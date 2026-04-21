import type { Metadata } from "next";
import { PolicyLayout } from "@/components/layouts/PolicyLayout";
import { CareersClient } from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers — HEBREW",
  description:
    "Join the HEBREW team. We are looking for bold, creative individuals.",
};

export default function CareersPage() {
  return (
    <PolicyLayout title="CAREERS" subtitle="JOIN THE MOVEMENT">
      <CareersClient />
    </PolicyLayout>
  );
}
