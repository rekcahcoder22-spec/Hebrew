import type { Metadata } from "next";
import {
  ListItem,
  Paragraph,
  PolicyLayout,
  PolicyTable,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";

export const metadata: Metadata = {
  title: "Delivery Policy — HEBREW",
  description: "Shipping methods, timeframes and fees for HEBREW Store.",
};

export default function DeliveryPolicyPage() {
  return (
    <PolicyLayout title="DELIVERY POLICY" subtitle="SHIPPING INFORMATION">
      <SectionHeading>1. COVERAGE</SectionHeading>
      <ListItem>Nationwide delivery to all 63 provinces</ListItem>
      <ListItem>International shipping available (contact for quote)</ListItem>

      <SectionHeading>2. DELIVERY TIMEFRAMES</SectionHeading>
      <PolicyTable
        headers={["REGION", "STANDARD", "EXPRESS"]}
        rows={[
          ["Hanoi, Ho Chi Minh City", "1–2 days", "Same day (inner city)"],
          ["Other provinces", "3–5 days", "2–3 days"],
          ["Remote areas", "5–7 days", "3–5 days"],
        ]}
      />
      <Paragraph>
        Note: Times are calculated from order confirmation, excluding weekends
        and public holidays.
      </Paragraph>

      <SectionHeading>3. SHIPPING FEES</SectionHeading>
      <PolicyTable
        headers={["METHOD", "PRICE", "FREE SHIPPING FROM"]}
        rows={[
          ["Standard", "30,000 ₫", "Orders over 1,000,000 ₫"],
          ["Express", "50,000 ₫", "Orders over 2,000,000 ₫"],
          ["Store Pickup", "Free", "Hanoi & Ho Chi Minh City"],
        ]}
      />

      <SectionHeading>4. DELIVERY PARTNERS</SectionHeading>
      <ListItem>GHN (Giao Hàng Nhanh)</ListItem>
      <ListItem>GHTK (Giaohangtietkiem)</ListItem>
      <ListItem>Viettel Post</ListItem>
      <ListItem>J&amp;T Express</ListItem>

      <SectionHeading>5. ORDER TRACKING</SectionHeading>
      <Paragraph>
        After your order is picked up, you will receive a tracking link via SMS
        and email. Track your order on the carrier&apos;s website using your
        tracking number.
      </Paragraph>

      <SectionHeading>6. LOST OR DAMAGED PACKAGES</SectionHeading>
      <ListItem>100% refund if package is lost due to carrier error</ListItem>
      <ListItem>Processing time: 3–7 business days</ListItem>
      <ListItem>Contact us within 24 hours if you notice any issue</ListItem>
    </PolicyLayout>
  );
}
