"use client";

import { useCallback, useEffect, useState } from "react";
import { IntroScreen } from "@/components/IntroScreen";
import { HomePage } from "@/components/home/HomePage";

export function HomePageRoot() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("hb-intro-seen");
      if (seen === "true") {
        setShowIntro(false);
      }
    } catch {
      /* sessionStorage unavailable */
    }
  }, []);

  const handleEnter = useCallback(() => {
    try {
      sessionStorage.setItem("hb-intro-seen", "true");
    } catch {
      /* ignore */
    }
    setShowIntro(false);
  }, []);

  return (
    <>
      {showIntro && <IntroScreen onEnter={handleEnter} />}
      <HomePage />
    </>
  );
}
