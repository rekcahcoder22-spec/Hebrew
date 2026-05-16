"use client";

import {
  Paragraph,
  PolicyLayout,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";
import { B } from "@/components/i18n/B";
import { LanguageText } from "@/components/i18n/LanguageText";
import { useLanguage } from "@/components/providers/LanguageProvider";

const stores = [
  {
    city: { en: "DA NANG", vi: "ĐÀ NẴNG" },
    address: { en: "89 Le Van Huu, Da Nang", vi: "89 Lê Văn Hưu, Đà Nẵng" },
    phone: "032.668.9947",
    email: "danang@hebrew.vn",
  },
  {
    city: { en: "HA TINH", vi: "HÀ TĨNH" },
    address: {
      en: "Thi Tran Nghen, District Can Loc, Ha Tinh",
      vi: "Thị trấn Nghen, huyện Can Lộc, Hà Tĩnh",
    },
    phone: "0842.419.738",
    email: "hatinh@hebrew.vn",
  },
];

export function StoresPageBody() {
  const { language } = useLanguage();
  const pick = <T,>(pair: { en: T; vi: T }): T =>
    language === "vi" ? pair.vi : pair.en;

  return (
    <PolicyLayout
      title={<LanguageText en="STORE LOCATIONS" vi="HỆ THỐNG CỬA HÀNG" />}
      subtitle={<LanguageText en="FIND US" vi="TÌM CỬA HÀNG GẦN BẠN" />}
    >
      <Paragraph>
        <B
          en="Visit us in person to experience HEBREW up close. Our stores are more than retail spaces; they are part of the movement."
          vi="Ghé trực tiếp để cảm nhận HEBREW. Cửa hàng không chỉ là nơi bán — mà là một phần của phong trào."
        />
      </Paragraph>

      <section className="mb-16 grid gap-4 lg:grid-cols-2">
        {stores.map((store) => (
          <article
            key={pick(store.city)}
            className="border border-hb-border bg-hb-gray p-8 transition-colors duration-300 hover:border-hb-red"
          >
            <div className="mb-1 flex items-center">
              <h2 className="font-display text-5xl tracking-wide text-hb-white">
                {pick(store.city)}
              </h2>
              <span className="ml-3 bg-hb-red px-2 py-1 font-body text-[8px] uppercase tracking-[.15em] text-white">
                <B en="OPEN" vi="MỞ CỬA" />
              </span>
            </div>
            <div className="my-4 h-[2px] w-12 bg-hb-red" />

            <div className="space-y-3">
              <div className="flex">
                <span className="w-28 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
                  <B en="ADDRESS" vi="ĐỊA CHỈ" />
                </span>
                <span className="font-body text-xs text-hb-white/70">
                  {pick(store.address)}
                </span>
              </div>
              <div className="flex">
                <span className="w-28 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
                  <B en="HOURS" vi="GIỜ MỞ" />
                </span>
                <span className="font-body text-xs text-hb-white/70">
                  <B
                    en="Mon to Sun: 9:00 AM to 9:00 PM"
                    vi="T2–CN: 9:00 – 21:00"
                  />
                </span>
              </div>
              <div className="flex">
                <span className="w-28 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
                  <B en="PHONE" vi="ĐIỆN THOẠI" />
                </span>
                <span className="font-body text-xs text-hb-white/70">
                  {store.phone}
                </span>
              </div>
              <div className="flex">
                <span className="w-28 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/30">
                  <B en="EMAIL" vi="EMAIL" />
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
              <B en="VIEW ON GOOGLE MAPS →" vi="XEM TRÊN GOOGLE MAPS →" />
            </button>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <SectionHeading>
          <B en="EXPANDING SOON" vi="SẮP MỞ RỘNG" />
        </SectionHeading>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {["DA LAT", "CAN THO", "HUE", "NHA TRANG"].map((city) => (
            <div
              key={city}
              className="relative border border-hb-border bg-hb-gray p-6 text-center opacity-60"
            >
              <p className="mb-2 font-display text-3xl text-hb-white/50">{city}</p>
              <span className="inline-block border border-hb-border/50 px-2 py-1 font-body text-[8px] uppercase tracking-[.15em] text-hb-white/25">
                <B en="COMING SOON" vi="SẮP KHAI TRƯƠNG" />
              </span>
            </div>
          ))}
        </div>
      </section>
    </PolicyLayout>
  );
}
