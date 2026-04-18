"use client";

import { useEffect, useState } from "react";

/** True only after mount so first client paint matches SSR (avoids persist hydration mismatches). */
export function useClientMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
