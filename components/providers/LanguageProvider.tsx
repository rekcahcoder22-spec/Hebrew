"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "vi" | "en";

type Dictionary = Record<string, string>;

const translations: Record<Language, Dictionary> = {
  en: {
    "nav.shop": "SHOP",
    "nav.drops": "DROPS",
    "nav.lookbook": "LOOKBOOK",
    "nav.about": "ABOUT",
    "nav.admin": "ADMIN",
    "nav.menu": "MENU",
    "nav.close": "Close",
    "nav.openCart": "Open cart",
    "nav.openMenu": "Open menu",
    "footer.tagline": "Sacred streetwear. Limited runs. No noise.",
    "drop.liveNow": "LIVE NOW",
    "drop.shopNow": "SHOP THE DROP",
    "home.loading": "Loading...",
    "home.signals": "SIGNALS",
    "concept.kicker": "HEBREW — CONCEPT",
    "concept.cta": "OUR STORY →",
    "concept.shop": "VIEW COLLECTION →",
    "hero.tagline": "ROOTED IN THE STREETS. WRITTEN IN STONE.",
    "hero.newDrop": "NEW DROP",
    "lookbook.label": "Lookbook",
    "lookbook.title": "STREET LITURGY",
    "lookbook.desc":
      "Volume 06 - shot on location in Seoul. Oversized silhouettes, low light, high contrast.",
    "lookbook.enter": "Enter lookbook",
    "manifesto.label": "Manifesto",
    "manifesto.quote":
      "WE DO NOT CHASE TRENDS. WE BUILD GARMENTS THAT OUTLAST THE NOISE.",
    "manifesto.desc":
      "Hebrew is a study in contrast: reverence and rebellion, discipline and disorder. Each piece is numbered, finite, and intentional.",
    "newsletter.label": "Newsletter",
    "newsletter.title": "FIRST TO KNOW",
    "newsletter.join": "Join",
    "newsletter.placeholder": "you@domain.com",
    "newsletter.success": "You are on the list. Watch your inbox.",
    "newsletter.invalidEmail": "Invalid email",
    "countdown.days": "DAYS",
    "countdown.hours": "HOURS",
    "countdown.minutes": "MINS",
    "countdown.seconds": "SECS",
  },
  vi: {
    "nav.shop": "CỬA HÀNG",
    "nav.drops": "ĐỢT MỚI",
    "nav.lookbook": "LOOKBOOK",
    "nav.about": "GIỚI THIỆU",
    "nav.admin": "QUẢN TRỊ",
    "nav.menu": "MENU",
    "nav.close": "Đóng",
    "nav.openCart": "Mở giỏ hàng",
    "nav.openMenu": "Mở menu",
    "footer.tagline": "Thời trang đường phố. Số lượng giới hạn. Không ồn ào.",
    "drop.liveNow": "ĐANG MỞ BÁN",
    "drop.shopNow": "MUA NGAY",
    "home.loading": "Đang tải...",
    "home.signals": "SẢN PHẨM NỔI BẬT",
    "concept.kicker": "HEBREW — CONCEPT",
    "concept.cta": "CÂU CHUYỆN →",
    "concept.shop": "XEM BỘ SƯU TẬP →",
    "hero.tagline": "BẮT RỄ TỪ ĐƯỜNG PHỐ. KHẮC LÊN ĐÁ.",
    "hero.newDrop": "ĐỢT MỚI",
    "lookbook.label": "Lookbook",
    "lookbook.title": "TUYÊN NGÔN ĐƯỜNG PHỐ",
    "lookbook.desc":
      "Tập 06 - chụp tại Seoul. Form rộng, ánh sáng thấp, tương phản mạnh.",
    "lookbook.enter": "Xem lookbook",
    "manifesto.label": "TUYÊN NGÔN",
    "manifesto.quote":
      "KHÔNG CHẠY THEO XU HƯỚNG. CHÚNG TÔI TẠO RA TRANG PHỤC BỀN VỮNG VỚI THỜI GIAN.",
    "manifesto.desc":
      "Hebrew là sự đối lập: tôn nghiêm và nổi loạn, kỷ luật và hỗn mang. Mỗi thiết kế đều hữu hạn và có chủ đích.",
    "newsletter.label": "BẢN TIN",
    "newsletter.title": "NHẬN TIN SỚM NHẤT",
    "newsletter.join": "Đăng ký",
    "newsletter.placeholder": "bạn@tênmiền.com",
    "newsletter.success": "Bạn đã vào danh sách. Hãy kiểm tra hộp thư.",
    "newsletter.invalidEmail": "Email không hợp lệ",
    "countdown.days": "NGÀY",
    "countdown.hours": "GIỜ",
    "countdown.minutes": "PHÚT",
    "countdown.seconds": "GIÂY",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "hebrew-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "vi" || stored === "en") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
    window.localStorage.setItem(STORAGE_KEY, value);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language][key] ?? translations.en[key] ?? key,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
