import type { Metadata } from "next";
import {
  HighlightBox,
  ListItem,
  PolicyLayout,
  PolicyTable,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";

export const metadata: Metadata = {
  title: "Care Instructions — HEBREW",
  description: "How to wash, dry, and store your HEBREW products.",
};

export default function CareInstructionsPage() {
  return (
    <PolicyLayout title="CARE INSTRUCTIONS" subtitle="PRODUCT CARE GUIDE">
      <HighlightBox accent="gold">
        &quot;HEBREW products are crafted from premium fabrics. Proper care
        preserves the color, print, and fit for years to come.&quot;
      </HighlightBox>

      <section className="my-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          ["≤30°", "COLD WASH", "Wash at 30°C or below"],
          ["✕", "NO BLEACH", "Never use bleach or whiteners"],
          ["✕", "NO TUMBLE DRY", "Avoid machine drying at high heat"],
          ["⊙", "TURN INSIDE", "Reverse garment before washing"],
          ["✕", "DO NOT WRING", "Gently squeeze, never twist"],
          ["✓", "AIR DRY", "Dry in shade, avoid direct sunlight"],
        ].map(([symbol, title, desc]) => (
          <div
            key={title}
            className="border border-hb-border bg-hb-gray p-6 text-center"
          >
            <p className="mb-3 font-display text-4xl text-hb-red">{symbol}</p>
            <p className="mb-1 font-display text-lg text-hb-white">{title}</p>
            <p className="font-body text-xs leading-[2] text-hb-white/40">{desc}</p>
          </div>
        ))}
      </section>

      <SectionHeading>STORAGE TIPS</SectionHeading>
      <ListItem>Store in a cool, dry, and well-ventilated area</ListItem>
      <ListItem>Keep away from direct sunlight to prevent fading</ListItem>
      <ListItem>Use wide-shoulder hangers to avoid shoulder distortion</ListItem>
      <ListItem>Fold pants along original crease or hang</ListItem>
      <ListItem>
        Store in a fabric bag when not worn for extended periods
      </ListItem>
      <ListItem>Keep away from moisture to prevent mildew</ListItem>

      <SectionHeading>FABRIC TYPES &amp; CARE</SectionHeading>
      <PolicyTable
        headers={["FABRIC", "CHARACTERISTICS", "CARE METHOD"]}
        rows={[
          ["100% Cotton", "Breathable, durable", "Machine wash gentle ≤30°C"],
          ["Cotton Fleece", "Thick, warm", "Hand wash or machine gentle"],
          ["Twill / Canvas", "Structured, tough", "Hand wash, turn inside out"],
          ["Mesh / Net", "Lightweight, airy", "Hand wash carefully"],
        ]}
      />
    </PolicyLayout>
  );
}
