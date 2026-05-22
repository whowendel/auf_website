"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { OverlayMenu } from "./overlay-menu";
import { AufLogo } from "./auf-logo";
import { useHeaderTheme } from "@/hooks/use-header-theme";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

type SiteHeaderProps = {
  transparent?: boolean;
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
};

export function SiteHeader({
  transparent = false,
  menuOpen: menuOpenProp,
  onMenuOpenChange,
}: SiteHeaderProps) {
  const [menuOpenInternal, setMenuOpenInternal] = useState(false);
  const menuOpen = menuOpenProp ?? menuOpenInternal;
  const setMenuOpen = onMenuOpenChange ?? setMenuOpenInternal;

  const theme = useHeaderTheme(transparent, menuOpen);
  useBodyScrollLock(menuOpen);

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: theme.isTransparent
            ? "rgba(24, 87, 206, 0)"
            : theme.isMicrosite
              ? "rgba(255, 255, 255, 0.92)"
              : "rgba(24, 87, 206, 0.85)",
          boxShadow: theme.isTransparent
            ? "0 0 0 0 transparent"
            : theme.isMicrosite
              ? "0 1px 0 0 rgba(14, 34, 71, 0.12)"
              : "0 1px 0 0 rgba(255, 255, 255, 0.12)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 h-22"
      >
        <div className="flex h-full items-center justify-between px-6 md:px-12">

          {/* Logo */}
          <AufLogo
            href="/"
            onClick={() => setMenuOpen(false)}
            wordmarkTextClassName={
              theme.isMicrosite ? "text-[var(--auf-navy)]" : "text-white"
            }
          />

          {/* Right controls */}
          <div className="flex items-center gap-4 md:gap-6">

            {/* Quick-access links */}
            <div className="hidden md:flex items-center gap-5">
              {[
                { label: "MyAU",    href: "https://sblive.auf.edu.ph/index.jsp" },
                { label: "MyClass", href: "https://auf.instructure.com/login/canvas" },
                { label: "Gmail",   href: "https://mail.google.com/" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${theme.textClass}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden md:block h-4 w-px" style={theme.dividerStyle} />

            {/* Hamburger / Close */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex items-center gap-2.5 group"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: menuOpen ? -45 : 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-[11px] font-semibold uppercase tracking-[0.16em] hidden sm:block ${theme.menuLabelClass}`}
                >
                  {menuOpen ? "Close" : "Menu"}
                </motion.span>
              </AnimatePresence>

              {/* Animated hamburger bars */}
              <div className="flex flex-col justify-center gap-1.25 w-6 h-6">
                <motion.span
                  animate={menuOpen ? { rotate: 30, y: 6, scaleX: 0.5 } : { rotate: 0, y: 0, scaleX: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`block h-[1.5px] w-full origin-center ${theme.barClass}`}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`block h-[1.5px] w-4/5 origin-left ${theme.barClass}`}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -30, y: -7, scaleX: 0.5 } : { rotate: 0, y: 0, scaleX: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`block h-[1.5px] w-full origin-center ${theme.barClass}`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
