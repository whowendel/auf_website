"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SESSION_KEY = "auf_splashed";

export function SplashScreen() {
  // Three states: "showing" | "exiting" | "done"
  const [phase, setPhase] = useState<"showing" | "exiting" | "done">("done");

  useEffect(() => {
    // Only show once per browser session
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("showing");

    // Begin exit after 2.2s
    const exitTimer = setTimeout(() => setPhase("exiting"), 2200);
    // Remove from DOM after exit animation completes (~0.7s)
    const doneTimer = setTimeout(() => setPhase("done"), 2950);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {(phase === "showing" || phase === "exiting") && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={
            phase === "exiting"
              ? { duration: 0.65, ease: "easeInOut" }
              : { duration: 0 }
          }
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--auf-navy)" }}
        >
          {/* ── Logo ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 12 }}
            animate={{
              opacity: phase === "exiting" ? 0 : 1,
              scale: phase === "exiting" ? 0.96 : 1,
              y: phase === "exiting" ? -6 : 0,
            }}
            transition={{ duration: 0.75, ease: EASE_OUT }}
            className="relative h-20 w-20 md:h-24 md:w-24"
          >
            <Image
              src="/assets/auf-logo-only.png"
              alt="AUF"
              fill
              priority
              className="object-contain"
              sizes="96px"
            />
          </motion.div>

          {/* ── Gold rule ─────────────────────────────────────────────── */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase === "exiting" ? 0 : 1,
              opacity: phase === "exiting" ? 0 : 1,
            }}
            transition={{ duration: 0.45, delay: 0.55, ease: EASE_OUT }}
            className="mt-7 block h-px w-12 origin-left"
            style={{ background: "var(--auf-gold)" }}
          />

          {/* ── Text ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: phase === "exiting" ? 0 : 1,
              y: phase === "exiting" ? -4 : 0,
            }}
            transition={{ duration: 0.45, delay: 0.72, ease: EASE_OUT }}
            className="mt-5 text-center"
          >
            <p className="font-display text-base font-light tracking-[0.06em] text-white md:text-lg">
              Angeles University Foundation
            </p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
              Est. 1962 · Angeles City, Philippines
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
