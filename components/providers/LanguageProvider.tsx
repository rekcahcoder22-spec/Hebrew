"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

type Language = "vi" | "en";
type Dictionary = Record<string, string>;
const translations: Record<Language, Dictionary> = { en, vi };

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "app_lang";
const LEGACY_STORAGE_KEY = "hebrew-language";

function normalizeLanguage(value: string | null): Language | null {
  if (value === "vi" || value === "en") return value;
  return null;
}

async function detectLanguageFromGeoIp(signal: AbortSignal): Promise<Language> {
  const response = await fetch("https://ipapi.co/json/", {
    cache: "no-store",
    signal,
  });
  if (!response.ok) {
    throw new Error("Geo-IP request failed");
  }
  const geoData = (await response.json()) as { country_code?: string };
  return geoData.country_code === "VN" ? "vi" : "en";
}

function detectLanguageFromBrowser(): Language {
  return navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const initializeLanguage = async () => {
      const storedLanguage =
        normalizeLanguage(window.localStorage.getItem(STORAGE_KEY)) ??
        normalizeLanguage(window.localStorage.getItem(LEGACY_STORAGE_KEY));

      if (storedLanguage) {
        if (mounted) {
          setLanguageState(storedLanguage);
          setIsInitialized(true);
        }
        window.localStorage.setItem(STORAGE_KEY, storedLanguage);
        return;
      }

      let resolvedLanguage: Language;
      try {
        resolvedLanguage = await detectLanguageFromGeoIp(controller.signal);
      } catch {
        resolvedLanguage = detectLanguageFromBrowser();
      }

      if (mounted) {
        setLanguageState(resolvedLanguage);
        setIsInitialized(true);
      }
      window.localStorage.setItem(STORAGE_KEY, resolvedLanguage);
    };

    void initializeLanguage();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
    window.localStorage.setItem(STORAGE_KEY, value);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key, params) => {
        const template = translations[language][key] ?? translations.en[key] ?? key;
        if (!params) return template;
        return Object.entries(params).reduce((result, [paramKey, paramValue]) => {
          return result.replaceAll(`{${paramKey}}`, String(paramValue));
        }, template);
      },
    }),
    [language],
  );

  if (!isInitialized) {
    return <div className="min-h-screen bg-void" aria-hidden />;
  }

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
