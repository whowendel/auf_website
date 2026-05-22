"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when the page has scrolled past `threshold` pixels.
 * The listener is only attached when `enabled` is true — pass false to
 * short-circuit the effect without a separate if-guard at call sites.
 */
export function useScrolled(threshold = 60, enabled = true): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setScrolled(false);
      return;
    }
    const check = () => setScrolled(window.scrollY > threshold);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [threshold, enabled]);

  return scrolled;
}
