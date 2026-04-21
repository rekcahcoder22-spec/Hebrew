import type { Metadata } from "next";
import {
  ListItem,
  Paragraph,
  PolicyLayout,
  PolicyTable,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";

export const metadata: Metadata = {
  title: "Adjustment Fee List — HEBREW",
  description: "Product alteration and adjustment service fees at HEBREW.",
};

export default function AdjustmentFeesPage() {
  return (
    <PolicyLayout
      title="ADJUSTMENT FEES"
      subtitle="PRODUCT ALTERATION SERVICES"
    >
      <SectionHeading>1. OUR ALTERATION SERVICE</SectionHeading>
      <Paragraph>
        HEBREW offers alteration services to ensure every piece fits you
        perfectly. Fees vary by type of alteration.
      </Paragraph>

      <SectionHeading>2. FEE SCHEDULE</SectionHeading>
      <PolicyTable
        headers={["SERVICE", "PRICE", "TURNAROUND"]}
        rows={[
          ["Hem pants (shorten/lengthen)", "30,000 ₫", "1–2 days"],
          ["Take in/let out waist", "50,000 ₫", "2–3 days"],
          ["Shorten/lengthen sleeves", "40,000 ₫", "2–3 days"],
          ["Take in/let out body", "60,000 ₫", "3–5 days"],
          ["Replace zipper", "40,000 ₫", "1–2 days"],
          ["Replace buttons / patch small holes", "20,000 ₫", "1 day"],
          ["Custom alterations", "Contact us", "Contact us"],
        ]}
      />

      <SectionHeading>3. IMPORTANT NOTES</SectionHeading>
      <ListItem>Alteration fees do not include shipping costs</ListItem>
      <ListItem>Not available for heavily worn items</ListItem>
      <ListItem>Results depend on fabric type and condition</ListItem>
      <ListItem>Contact us first for consultation</ListItem>

      <SectionHeading>4. DROP-OFF LOCATIONS</SectionHeading>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="border border-hb-border bg-hb-gray p-6">
          <h3 className="font-display text-2xl text-hb-white">DA NANG STORE</h3>
          <p className="mt-3 font-body text-xs leading-[2.2] text-hb-white/50">
            [Specific address], 89/59 Le Van Huu, Da Nang
            <br />
            Mon–Sun: 9:00 AM – 9:00 PM
            <br />
            Tel: 032.668.9947
          </p>
        </div>
        <div className="border border-hb-border bg-hb-gray p-6">
          <h3 className="font-display text-2xl text-hb-white">HA TINH STORE</h3>
          <p className="mt-3 font-body text-xs leading-[2.2] text-hb-white/50">
            [Specific address], Thi Tran Nghen, Can Loc, Ha Tinh
            <br />
            Mon–Sun: 9:00 AM – 9:00 PM
            <br />
            Tel: 0842.419.738
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
}
