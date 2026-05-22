"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Transition } from "framer-motion";

type Slide = {
  src: string;
  alt: string;
  eyebrow?: string;
  headline: string;
  sub?: string;
  cta?: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    src: "/slider/11.jpg",
    alt: "AUF Campus",
    eyebrow: "Angeles University Foundation",
    headline: "Forming Truly Excellent Professionals",
    sub: "Imbued with a Catholic identity — shaping leaders for the nation since 1962.",
    cta: { label: "Explore AUF", href: "/about#history" },
  },
  {
    src: "/slider/12.jpg",
    alt: "AUF Students",
    eyebrow: "Admissions Open",
    headline: "Begin Your Journey Here",
    sub: "Join a community committed to excellence, integrity, and service.",
    cta: { label: "How to Apply", href: "#" },
  },
  {
    src: "/slider/2.jpg",
    alt: "AUF Academics",
    eyebrow: "8 Colleges · 30+ Programs",
    headline: "Find Your Academic Path",
    sub: "From computing and engineering to health sciences and law.",
    cta: { label: "Browse Programs", href: "#colleges" },
  },
  {
    src: "/slider/7.jpg",
    alt: "AUF Campus Life",
    eyebrow: "Campus Life",
    headline: "A Community That Grows Together",
    sub: "Student organizations, athletics, and a vibrant campus life await.",
    cta: { label: "Student Life", href: "/student-services#student-affairs" },
  },
  {
    src: "/slider/9.jpg",
    alt: "AUF Research",
    eyebrow: "Research & Innovation",
    headline: "Knowledge for the Nation",
    sub: "Advancing health, technology, and society through rigorous academic research.",
    cta: { label: "Our Research", href: "/research" },
  },
];

const INTERVAL = 6000;

// Typed cubic-bezier tuple for Framer Motion 12
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, paused]);

  const slide = SLIDES[index];

  const imgTransition: Transition = {
    opacity: { duration: 1.1, ease: "easeInOut" },
    scale:   { duration: 7,   ease: "linear" },
  };

  const textTransition: Transition = { duration: 0.7, ease: EASE_OUT };
  const staggerTransition: Transition = { staggerChildren: 0.12, delayChildren: 0.4 };

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-[var(--auf-navy)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero image slider"
    >
      {/* ── Background images (crossfade) ────────────────────────────── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1, transition: imgTransition }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            quality={90}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlays ─────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(14,34,71,0.65) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "55%",
          background:
            "linear-gradient(to top, rgba(14,34,71,1) 0%, rgba(14,34,71,0.9) 35%, rgba(14,34,71,0.55) 65%, transparent 100%)",
        }}
      />

      {/* ── Slide text ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-end pb-20 md:pb-24 lg:pb-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${index}`}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              variants={{ hidden: {}, visible: { transition: staggerTransition } }}
              className="max-w-3xl"
            >
              {slide.eyebrow && (
                <motion.p
                  variants={{
                    hidden:  { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: textTransition },
                  }}
                  className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--auf-gold-light)]"
                >
                  {slide.eyebrow}
                </motion.p>
              )}

              <motion.h1
                variants={{
                  hidden:  { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: textTransition },
                }}
                className="font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl lg:text-[5rem]"
              >
                {slide.headline}
              </motion.h1>

              {slide.sub && (
                <motion.p
                  variants={{
                    hidden:  { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: textTransition },
                  }}
                  className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 md:text-base"
                >
                  {slide.sub}
                </motion.p>
              )}

              {slide.cta && (
                <motion.div
                  variants={{
                    hidden:  { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: textTransition },
                  }}
                  className="mt-7"
                >
                  <Link
                    href={slide.cta.href}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-[var(--auf-gold)] hover:bg-[var(--auf-gold)] hover:text-[var(--auf-navy)]"
                  >
                    {slide.cta.label}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Dot indicators ────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group flex h-5 w-5 items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === index
                  ? "h-2 w-6 bg-[var(--auf-gold-light)]"
                  : "h-1.5 w-1.5 bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      {/* ── Slide counter ─────────────────────────────────────────────── */}
      <div className="absolute bottom-7 right-6 md:right-12 hidden sm:flex items-center gap-2 text-[11px] font-medium text-white/40">
        <span className="text-white/80">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-6 bg-white/30" />
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* ── Progress bar ──────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bar-${index}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: INTERVAL / 1000, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[var(--auf-gold)]"
        />
      </AnimatePresence>
    </section>
  );
}
