import type { Metadata } from "next";
import Image from "next/image";
import {
  Paragraph,
  PolicyLayout,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";

export const metadata: Metadata = {
  title: "Our Story — HEBREW",
  description:
    "The story behind HEBREW — a Vietnamese streetwear brand born in 2026.",
};

export default function OurStoryPage() {
  const storyFrames = [
    { src: "/images/our-story/nham-mat.png", alt: "Abstract portrait in deep shadow" },
    { src: "/images/our-story/thanh-pho.png", alt: "Night alley with old architecture" },
    { src: "/images/our-story/gat-tan.png", alt: "Discarded cigarette scene in monochrome" },
    { src: "/images/our-story/mat-ho.png", alt: "Ripples over face silhouette" },
    { src: "/images/our-story/kinh-vo.png", alt: "Shattered glass close-up" },
    { src: "/images/our-story/ban-tay.png", alt: "Hand silhouette on wet window" },
  ] as const;

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
            2026 — DA NANG, VIETNAM
          </p>
          <p className="absolute bottom-6 right-8 font-body text-[9px] uppercase tracking-[.2em] text-hb-red/60">
            DROP 001 - THE ADORE COLLECTION
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
              HEBREW was born in a Hanoi alleyway in 2026, when a group of young
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
            <Image
              src={storyFrames[0].src}
              alt={storyFrames[0].alt}
              fill
              className="object-cover grayscale contrast-125 brightness-90"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />
          </div>
        </section>

        <section className="mb-20 grid items-center gap-16 lg:grid-cols-2">
          <div className="relative order-2 aspect-[3/4] overflow-hidden bg-hb-gray lg:order-1">
            <Image
              src={storyFrames[1].src}
              alt={storyFrames[1].alt}
              fill
              className="object-cover grayscale contrast-125 brightness-90"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />
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

        <section className="mb-20">
          <SectionHeading>VISUAL MEMORY</SectionHeading>
          <p className="mb-6 max-w-3xl font-body text-xs uppercase tracking-[0.22em] text-hb-white/35">
            fragments of silence, damage, and shadow
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {storyFrames.map((frame, idx) => (
              <div
                key={frame.src}
                className={`group relative overflow-hidden bg-hb-black ${
                  idx === 1 ? "md:row-span-2 md:aspect-[3/6]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  className="object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, 33vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-50"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
                    backgroundSize: "3px 3px",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hb-black/65 via-transparent to-transparent" />
              </div>
            ))}
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
            { value: "2026", label: "FOUNDED" },
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
