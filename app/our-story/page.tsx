import type { Metadata } from "next";
import {
  Paragraph,
  PolicyLayout,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";

export const metadata: Metadata = {
  title: "Our Story — HEBREW",
  description:
    "The story behind HEBREW — a Vietnamese streetwear brand born in 2024.",
};

export default function OurStoryPage() {
  return (
    <PolicyLayout title="OUR STORY" subtitle="THE STORY OF HEBREW">
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 px-6">
        <section className="relative mb-20 aspect-[21/9] w-full overflow-hidden bg-hb-gray">
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(45deg,#111 0,#111 1px,#1a1a1a 0,#1a1a1a 50%)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[20vw] text-hb-white/[0.03]">
            HEBREW
          </div>
          <p className="absolute bottom-6 left-8 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
            2024 — DA NANG, VIETNAM
          </p>
          <p className="absolute bottom-6 right-8 font-body text-[9px] uppercase tracking-[.2em] text-hb-red/60">
            DROP 001 — THE COVENANT
          </p>
        </section>

        <section className="mb-20">
          <h2 className="mx-auto max-w-3xl text-center font-display text-[clamp(28px,5vw,56px)] leading-tight tracking-wide text-hb-white">
            NOT FASHION.
            <br />
            THIS IS THE SCRIPTURE OF THE STREETS.
          </h2>
        </section>

        <section className="mb-20 grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading>THE BEGINNING</SectionHeading>
            <Paragraph>
              HEBREW was born in a Hanoi alleyway in 2024, when a group of young
              creatives believed that Vietnamese streetwear could carry its own
              voice to the world. The name HEBREW — inspired by ancient script
              — symbolizes the power of language, of stories carved into stone.
            </Paragraph>
            <Paragraph>
              We are not a fashion brand. We are a movement. Every drop is a
              chapter in an unfinished book about Vietnamese street culture —
              raw, honest, and unapologetically local.
            </Paragraph>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-hb-gray">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 16px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-display text-[8vw] text-hb-white/5">
              HB
            </div>
          </div>
        </section>

        <section className="mb-20 grid items-center gap-16 lg:grid-cols-2">
          <div className="relative order-2 aspect-[3/4] overflow-hidden bg-hb-gray lg:order-1">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 14px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-display text-[8vw] text-hb-white/5">
              HB
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading>THE PHILOSOPHY</SectionHeading>
            <Paragraph>
              Each HEBREW drop is meticulously crafted — from fabric selection to
              the last stitch. We do not follow trends. We set them. Every piece
              is manufactured by hand in Vietnam, quality-controlled at every
              stage.
            </Paragraph>
            <Paragraph>
              Our aesthetic is raw and sacred. We draw from ancient symbols,
              military heritage, and the energy of urban Vietnam to create
              clothing that means something — clothing that tells a story.
            </Paragraph>
          </div>
        </section>

        <section className="mb-20 border-b border-t border-hb-border bg-hb-gray px-8 py-20 text-center">
          <h3 className="mb-6 font-display text-[clamp(32px,6vw,64px)] leading-tight text-hb-white">
            MADE IN VIETNAM.
            <br />
            WORN BY THE WORLD.
          </h3>
          <p className="mx-auto max-w-2xl font-body text-sm leading-[2.2] tracking-wide text-hb-white/60">
            HEBREW believes Vietnam has the talent and creativity to produce
            pieces that stand alongside the world&apos;s top streetwear brands.
            We are proof of that.
          </p>
        </section>

        <section className="mb-20 grid grid-cols-3 gap-px border border-hb-border bg-hb-border">
          {[
            { value: "2024", label: "FOUNDED" },
            { value: "001", label: "FIRST DROP" },
            { value: "VN", label: "MADE IN VIETNAM" },
          ].map((item) => (
            <div key={item.label} className="bg-hb-gray p-10 text-center">
              <span className="block font-display text-6xl text-hb-red">
                {item.value}
              </span>
              <span className="mt-2 block font-body text-[9px] uppercase tracking-[.2em] text-hb-white/40">
                {item.label}
              </span>
            </div>
          ))}
        </section>

        <p className="mt-8 text-center font-body text-[9px] uppercase tracking-[.3em] text-hb-white/30">
          EVERY STITCH TELLS A STORY.
        </p>
      </div>
    </PolicyLayout>
  );
}
