import type { Metadata } from "next";
import {
  HighlightBox,
  Paragraph,
  PolicyLayout,
  PolicyTable,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";
import { LanguageText } from "@/components/i18n/LanguageText";

export const metadata: Metadata = {
  title: "Size Guide — HEBREW",
  description: "Size measurement guide for HEBREW tops and bottoms.",
};

export default function SizeGuidePage() {
  return (
    <PolicyLayout
      title={<LanguageText en="SIZE GUIDE" vi="HƯỚNG DẪN CHỌN SIZE" />}
      subtitle={<LanguageText en="FIND YOUR FIT" vi="TÌM SIZE PHÙ HỢP" />}
    >
      <Paragraph>
        All measurements are in centimetres (cm). Measure your body without
        thick clothing for best accuracy. We recommend adding 1–2cm for
        comfort.
      </Paragraph>

      <section className="my-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          ["01", "CHEST", "Measure around the fullest part of your chest"],
          ["02", "WAIST", "Measure around the narrowest part of your waist"],
          ["03", "HEIGHT", "Stand straight, measure from head to heel"],
        ].map(([num, title, desc]) => (
          <div
            key={title}
            className="flex flex-col items-center border border-hb-border bg-hb-gray p-6 text-center"
          >
            <p className="mb-3 font-display text-6xl text-hb-red">{num}</p>
            <p className="mb-2 font-display text-xl text-hb-white">{title}</p>
            <p className="font-body text-xs leading-[2] text-hb-white/40">{desc}</p>
          </div>
        ))}
      </section>

      <SectionHeading>TOPS</SectionHeading>
      <p className="mb-4 font-body text-[9px] text-hb-white/30">
        Measurements in cm. HEBREW fits oversized — size up if between sizes.
      </p>
      <PolicyTable
        headers={["MEASUREMENT", "XS", "S", "M", "L", "XL", "XXL"]}
        rows={[
          ["Body Length (cm)", "64", "66", "68", "70", "72", "74"],
          ["Shoulder Width (cm)", "40", "42", "44", "46", "48", "50"],
          ["Chest Width (cm)", "46", "48", "50", "52", "54", "56"],
          ["Sleeve Length (cm)", "57", "58", "59", "60", "61", "62"],
        ]}
      />

      <SectionHeading>BOTTOMS</SectionHeading>
      <PolicyTable
        headers={["MEASUREMENT", "28", "29", "30", "31", "32", "33", "34"]}
        rows={[
          ["Waist (cm)", "71", "74", "76", "79", "81", "84", "86"],
          ["Hip (cm)", "90", "93", "96", "99", "102", "105", "108"],
          ["Inseam (cm)", "98", "99", "100", "101", "102", "103", "104"],
        ]}
      />

      <HighlightBox accent="gold">
        &quot;SIZE TIP: If your measurements fall between two sizes, HEBREW
        recommends sizing up for a comfortable, true-to-brand oversized
        fit.&quot;
      </HighlightBox>

      <section className="mt-8 text-center">
        <p className="font-body text-[10px] tracking-[.2em] text-hb-white/40">
          NOT SURE ABOUT YOUR SIZE? GET FREE ADVICE:
        </p>
        <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
          {[
            { label: "ZALO / HOTLINE", value: "039.327.8668" },
            { label: "EMAIL", value: "support@hebrew.vn" },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-hb-border px-4 py-3 text-center transition-colors hover:border-hb-red"
            >
              <p className="font-body text-[8px] uppercase tracking-wider text-hb-white/30">
                {item.label}
              </p>
              <p className="mt-1 font-body text-sm text-hb-white/70">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </PolicyLayout>
  );
}
