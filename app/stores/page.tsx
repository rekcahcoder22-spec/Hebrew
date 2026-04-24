import type { Metadata } from "next";
import {
  Paragraph,
  PolicyLayout,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";
import { LanguageText } from "@/components/i18n/LanguageText";

export const metadata: Metadata = {
  title: "Store Locations — HEBREW",
  description: "Find HEBREW stores in Hanoi and Ho Chi Minh City.",
};

const stores = [
  {
    city: "DA NANG",
    address: "89/59 Le Van Huu, Danang",
    phone: "032.668.9947",
    email: "danang@hebrew.vn",
  },
  {
    city: "HA TINH",
    address: "Thi Tran Nghen, District Can Loc, Ha Tinh",
    phone: "0842.419.738",
    email: "hatinh@hebrew.vn",
  },
];

export default function StoresPage() {
  return (
    <PolicyLayout
      title={<LanguageText en="STORE LOCATIONS" vi="HỆ THỐNG CỬA HÀNG" />}
      subtitle={<LanguageText en="FIND US" vi="TÌM CỬA HÀNG GẦN BẠN" />}
    >
      <Paragraph>
        Visit us in person to experience HEBREW up close. Our stores are more
        than retail spaces — they are part of the movement.
      </Paragraph>

      <section className="mb-16 grid gap-4 lg:grid-cols-2">
        {stores.map((store) => (
          <article
            key={store.city}
            className="border border-hb-border bg-hb-gray p-8 transition-colors duration-300 hover:border-hb-red"
          >
            <div className="mb-1 flex items-center">
              <h2 className="font-display text-5xl tracking-wide text-hb-white">
                {store.city}
              </h2>
              <span className="ml-3 bg-hb-red px-2 py-1 font-body text-[8px] uppercase tracking-[.15em] text-white">
                OPEN
              </span>
            </div>
            <div className="my-4 h-[2px] w-12 bg-hb-red" />

            <div className="space-y-3">
              <div className="flex">
                <span className="w-28 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
                  ADDRESS
                </span>
                <span className="font-body text-xs text-hb-white/70">
                  {store.address}
                </span>
              </div>
              <div className="flex">
                <span className="w-28 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
                  HOURS
                </span>
                <span className="font-body text-xs text-hb-white/70">
                  Mon–Sun: 9:00 AM – 9:00 PM
                </span>
              </div>
              <div className="flex">
                <span className="w-28 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
                  PHONE
                </span>
                <span className="font-body text-xs text-hb-white/70">
                  {store.phone}
                </span>
              </div>
              <div className="flex">
                <span className="w-28 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
                  EMAIL
                </span>
                <span className="font-body text-xs text-hb-white/70">
                  {store.email}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex aspect-video w-full items-center justify-center border border-hb-border bg-hb-black font-body text-[9px] uppercase tracking-[.2em] text-hb-white/20 transition-colors hover:text-hb-red"
            >
              VIEW ON GOOGLE MAPS →
            </button>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <SectionHeading>EXPANDING SOON</SectionHeading>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {["DA NANG", "DA LAT", "CAN THO", "HUE"].map((city) => (
            <div
              key={city}
              className="relative border border-hb-border bg-hb-gray p-6 text-center opacity-60"
            >
              <p className="mb-2 font-display text-3xl text-hb-white/50">{city}</p>
              <span className="inline-block border border-hb-border/50 px-2 py-1 font-body text-[8px] uppercase tracking-[.15em] text-hb-white/25">
                COMING SOON
              </span>
            </div>
          ))}
        </div>
      </section>
    </PolicyLayout>
  );
}
