import type { Metadata } from "next";
import {
  HighlightBox,
  ListItem,
  PolicyLayout,
  PolicyTable,
  SectionHeading,
  StepItem,
} from "@/components/layouts/PolicyLayout";

export const metadata: Metadata = {
  title: "Return Policy — HEBREW",
  description: "7-day return and exchange policy for HEBREW Store.",
};

export default function ReturnPolicyPage() {
  return (
    <PolicyLayout title="RETURN POLICY" subtitle="7-DAY RETURNS">
      <SectionHeading>1. RETURN WINDOW</SectionHeading>
      <HighlightBox>
        &quot;HEBREW accepts returns within 7 days of delivery. We want you to
        be completely satisfied with every piece.&quot;
      </HighlightBox>

      <SectionHeading>2. ELIGIBLE ITEMS</SectionHeading>
      <ListItem>Original HEBREW tags and labels still attached</ListItem>
      <ListItem>Unworn, unwashed, not ironed</ListItem>
      <ListItem>All accessories included (if any)</ListItem>
      <ListItem>Proof of purchase or order confirmation available</ListItem>
      <ListItem>Within 7 days of receiving the item</ListItem>

      <SectionHeading>3. ACCEPTED REASONS FOR RETURN</SectionHeading>
      <ListItem>Received wrong item (wrong style, size, or color)</ListItem>
      <ListItem>Manufacturing defect</ListItem>
      <ListItem>Item does not match website description</ListItem>
      <ListItem>
        Not accepted: Change of mind, wrong size ordered (Please refer to the
        size guide before ordering)
      </ListItem>

      <SectionHeading>4. RETURN PROCESS</SectionHeading>
      <StepItem number="01">
        Contact HEBREW via email or Zalo within 7 days
      </StepItem>
      <StepItem number="02">
        Provide photos of the item and reason for return
      </StepItem>
      <StepItem number="03">Receive return address from HEBREW</StepItem>
      <StepItem number="04">Ship item back (keep tracking number)</StepItem>
      <StepItem number="05">
        HEBREW inspects and processes within 3–5 business days
      </StepItem>

      <SectionHeading>5. RESOLUTION OPTIONS</SectionHeading>
      <PolicyTable
        headers={["CASE", "RESOLUTION", "TIMEFRAME"]}
        rows={[
          ["Exchange size/color", "New item shipped", "5–7 days"],
          ["Defective item", "New item or refund", "3–5 days"],
          ["Refund", "Bank transfer", "5–10 days"],
        ]}
      />

      <SectionHeading>6. SHIPPING COSTS</SectionHeading>
      <ListItem>
        HEBREW&apos;s fault: HEBREW covers 100% of shipping both ways
      </ListItem>
      <ListItem>
        Size/color exchange: Customer covers return shipping, HEBREW covers
        re-delivery
      </ListItem>
    </PolicyLayout>
  );
}
