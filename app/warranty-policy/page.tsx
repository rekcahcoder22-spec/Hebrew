import type { Metadata } from "next";
import {
  HighlightBox,
  ListItem,
  PolicyLayout,
  SectionHeading,
  StepItem,
} from "@/components/layouts/PolicyLayout";
import { LanguageText } from "@/components/i18n/LanguageText";

export const metadata: Metadata = {
  title: "Warranty Policy — HEBREW",
  description: "Quality guarantee and warranty terms for HEBREW products.",
};

export default function WarrantyPolicyPage() {
  return (
    <PolicyLayout
      title={<LanguageText en="WARRANTY POLICY" vi="CHÍNH SÁCH BẢO HÀNH" />}
      subtitle={<LanguageText en="QUALITY GUARANTEE" vi="CAM KẾT CHẤT LƯỢNG" />}
    >
      <SectionHeading>1. OUR COMMITMENT</SectionHeading>
      <HighlightBox>
        &quot;HEBREW guarantees 100% of products pass strict quality control
        before reaching your hands. Every piece is handcrafted in
        Vietnam.&quot;
      </HighlightBox>

      <SectionHeading>2. WARRANTY COVERAGE</SectionHeading>
      <ListItem>Stitching defects within 30 days of receipt</ListItem>
      <ListItem>
        Print/embroidery fading inconsistent with description within 30 days
      </ListItem>
      <ListItem>Wrong item/size delivered vs. order</ListItem>
      <ListItem>
        Manufacturing defects (tears or holes due to fabric quality)
      </ListItem>

      <SectionHeading>3. NOT COVERED</SectionHeading>
      <ListItem>
        Damage from improper use (wrong wash temperature, bleaching)
      </ListItem>
      <ListItem>Natural color fading after extended use</ListItem>
      <ListItem>Damage from accidents, misuse, or force majeure</ListItem>
      <ListItem>Items repaired by third parties</ListItem>
      <ListItem>Items missing original HEBREW tags/labels</ListItem>

      <SectionHeading>4. WARRANTY PROCESS</SectionHeading>
      <StepItem number="01">Take clear photos of the defect</StepItem>
      <StepItem number="02">
        Send to warranty@hebrew.vn with your order number
      </StepItem>
      <StepItem number="03">HEBREW reviews and responds within 24 hours</StepItem>
      <StepItem number="04">
        Ship item back (HEBREW covers one-way shipping)
      </StepItem>
      <StepItem number="05">
        Receive replacement or refund within 5–7 business days
      </StepItem>
    </PolicyLayout>
  );
}
