"use client";

import { usePathname } from "next/navigation";
import { useScrolled } from "./use-scrolled";

export type HeaderTheme = {
  /** Current page is a college microsite (/c/*) */
  isMicrosite: boolean;
  /** Header should render as transparent (no background) */
  isTransparent: boolean;
  /** Text / icon color tokens for the header bar */
  textClass: string;
  menuLabelClass: string;
  barClass: string;
  dividerStyle: React.CSSProperties;
};

/**
 * Derives all header visual-state from the current pathname and scroll
 * position. Centralises the `transparent` / `isMicrosite` logic so the
 * component itself is purely presentational.
 *
 * @param transparent  Whether the header was mounted with the transparent prop.
 * @param menuOpen     Whether the overlay menu is open (keeps header solid).
 */
export function useHeaderTheme(
  transparent: boolean,
  menuOpen: boolean,
): HeaderTheme {
  const pathname = usePathname() ?? "";
  const isMicrosite = pathname.startsWith("/c/");

  // Transparency only applies on non-microsite pages (hero pages).
  const effectiveTransparent = transparent && !isMicrosite;
  const scrolled = useScrolled(60, effectiveTransparent);
  const isTransparent = effectiveTransparent && !scrolled && !menuOpen;

  const textClass = isMicrosite
    ? "text-[var(--auf-navy)] opacity-80 hover:opacity-100"
    : "text-white/80 hover:text-white";

  const menuLabelClass = isMicrosite
    ? "text-[var(--auf-navy)] opacity-80 group-hover:opacity-100"
    : "text-white/80 group-hover:text-white";

  const barClass = isMicrosite ? "bg-[var(--auf-navy)]" : "bg-white";

  const dividerStyle: React.CSSProperties = {
    background: isMicrosite
      ? "rgba(14, 34, 71, 0.2)"
      : "rgba(255, 255, 255, 0.2)",
  };

  return {
    isMicrosite,
    isTransparent,
    textClass,
    menuLabelClass,
    barClass,
    dividerStyle,
  };
}
