"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Maximize2, X, Volume2, VolumeX, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navSections, quickLinks } from "./nav-data";
import type { NavSection } from "./nav-types";
import { Input } from "@/components/ui/primitives";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Theme tokens ─────────────────────────────────────────────────────
type MenuTheme = {
  bg: string;
  overlay: string;               // CSS background value for the root div
  border: string;
  navText: string;
  navHover: string;
  activeText: string;
  activeLine: string;
  groupLabel: string;
  subText: string;
  subHover: string;
  subMuted: string;
  quickLinkText: string;
  quickLinkHover: string;
  searchBg: string;
  searchBorder: string;
  searchText: string;
  searchPlaceholder: string;
  eyebrow: string;
  footerText: string;
  footerHover: string;
  divider: string;
};

const DARK_THEME: MenuTheme = {
  bg: "var(--auf-navy)",
  overlay: "var(--auf-navy)",
  border: "border-white/10",
  navText: "text-white",
  navHover: "group-hover:text-gold-light",
  activeText: "text-gold-light",
  activeLine: "bg-gold",
  groupLabel: "text-gold",
  subText: "text-white/85",
  subHover: "group-hover:text-gold-light",
  subMuted: "text-white/40",
  quickLinkText: "text-white/80",
  quickLinkHover: "hover:text-gold-light",
  searchBg: "bg-white/5",
  searchBorder: "border-white/15",
  searchText: "text-white/80",
  searchPlaceholder: "placeholder:text-white/35",
  eyebrow: "text-gold",
  footerText: "text-white/80",
  footerHover: "hover:text-white/60",
  divider: "bg-white/55",
};

const LIGHT_THEME: MenuTheme = {
  bg: "#FFFFFF",
  overlay: "#FFFFFF",
  border: "border-navy/10",
  navText: "text-navy",
  navHover: "group-hover:text-navy-deep",
  activeText: "text-navy-deep",
  activeLine: "bg-navy",
  groupLabel: "text-gold",
  subText: "text-navy/80",
  subHover: "group-hover:text-navy",
  subMuted: "text-navy/40",
  quickLinkText: "text-navy/50",
  quickLinkHover: "hover:text-navy",
  searchBg: "bg-navy/5",
  searchBorder: "border-navy/15",
  searchText: "text-navy/80",
  searchPlaceholder: "placeholder:text-navy/35",
  eyebrow: "text-gold",
  footerText: "text-navy/30",
  footerHover: "hover:text-navy/60",
  divider: "bg-navy/15",
};

// ─── Animation variants ────────────────────────────────────────────────
const overlayVariants = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const colVariants = {
  hidden:  { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: EASE_OUT },
  }),
};

const itemVariants = {
  hidden:  { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.12 + i * 0.035, duration: 0.28, ease: "easeOut" as const },
  }),
};

const panelVariants = {
  hidden:  { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.3, ease: EASE_OUT } },
  exit:    { opacity: 0, x: 16, transition: { duration: 0.18 } },
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: EASE_OUT } },
  exit:    { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" as const } },
};

// ─── Video expand modal ────────────────────────────────────────────────
function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 md:p-12"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src="/assets/AUFCourse.mp4"
          controls
          autoPlay
          playsInline
          className="w-full aspect-video"
          aria-label="AUF campus video"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm hover:bg-black hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Right column video panel ──────────────────────────────────────────
function VideoPanel({
  onClose,
  t,
}: {
  onClose: () => void;
  t: MenuTheme;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => { /* autoplay may be blocked */ });
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {expanded && <VideoModal onClose={() => setExpanded(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.25, duration: 0.38, ease: EASE_OUT } }}
        className="flex h-full flex-col gap-4"
      >
        <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${t.eyebrow}`}>
          Featured
        </p>

        <div className={`group relative overflow-hidden rounded-xl border bg-black/40 ${t.border}`}>
          <video
            ref={videoRef}
            src="/assets/AUFCourse.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="w-full aspect-video object-cover"
            aria-label="AUF campus video"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute inset-0 flex items-end justify-between p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm hover:text-white transition-colors"
            >
              {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="Watch full video"
              className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-semibold text-white/80 backdrop-blur-sm hover:text-white transition-colors"
            >
              <Maximize2 size={11} />
              Watch
            </button>
          </div>

          <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/90 drop-shadow">
              AUF — A Look Inside
            </p>
            <p className="mt-0.5 text-[11px] text-white/65 drop-shadow">
              Experience life at AUF.{" "}
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="pointer-events-auto underline decoration-white/40 hover:text-white transition-colors"
              >
                Watch now
              </button>
            </p>
          </div>
        </div>

        <div className={`border-t pt-4 ${t.border}`}>
          <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] ${t.eyebrow} opacity-60`}>
            Quick links
          </p>
          <ul className="space-y-1.5">
            {quickLinks.slice(0, 5).map((l, i) => (
              <motion.li key={l.href} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                <Link
                  href={l.href}
                  onClick={onClose}
                  className={`group flex items-center gap-2 text-[12px] transition-colors ${t.quickLinkText} ${t.quickLinkHover}`}
                >
                  <span className={`h-px w-3 transition-all group-hover:w-5 ${t.activeLine} opacity-30 group-hover:opacity-100`} />
                  {l.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
}

// ─── Centre panel: sub-items for the active nav section ───────────────
function SubPanel({
  section,
  onClose,
  t,
}: {
  section: NavSection;
  onClose: () => void;
  t: MenuTheme;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section.id}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="h-full"
      >
        {section.groups && section.groups.length > 0 && (
          <div className="flex gap-10 lg:gap-14">
            {section.groups.map((group, gi) => (
              <div key={gi}>
                {group.heading && (
                  <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] ${t.groupLabel}`}>
                    {group.heading}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {group.items.map((item, ii) => (
                    <li key={ii}>
                      <Link href={item.href} onClick={onClose} className="group block py-1.5">
                        <span className={`block text-sm font-medium transition-colors ${t.subText} ${t.subHover}`}>
                          {item.label}
                        </span>
                        {item.description && (
                          <span className={`mt-0.5 block text-xs transition-colors ${t.subMuted} group-hover:opacity-80`}>
                            {item.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {section.featured && (
          <div className={section.groups?.length ? `mt-8 border-t pt-6 ${t.border}` : ""}>
            <Link
              href={section.featured.href}
              onClick={onClose}
              className={`group block rounded-lg border p-5 transition-colors ${t.border} hover:bg-navy/5`}
            >
              <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${t.eyebrow}`}>
                {section.featured.eyebrow}
              </p>
              <p className={`mt-1.5 text-sm font-semibold leading-snug transition-colors ${t.subText} ${t.subHover}`}>
                {section.featured.title}
              </p>
              <p className={`mt-1.5 text-xs leading-relaxed ${t.subMuted}`}>
                {section.featured.description}
              </p>
              <span className={`mt-3 inline-block text-xs font-medium transition-transform group-hover:translate-x-1 ${t.eyebrow}`}>
                Learn more →
              </span>
            </Link>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main overlay menu ────────────────────────────────────────────────
export function OverlayMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const pathname = usePathname() ?? "";
  const isMicrosite = pathname.startsWith("/c/");
  const t = isMicrosite ? LIGHT_THEME : DARK_THEME;

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return navSections;
    const matches = (v?: string) => (v ? v.toLowerCase().includes(normalized) : false);
    return navSections
      .map((section) => {
        const sectionMatch = matches(section.label);
        const groups = section.groups?.map((group) => {
          const headingMatch = matches(group.heading);
          const items = headingMatch
            ? group.items
            : group.items.filter((i) => matches(i.label) || matches(i.description));
          return items.length > 0 ? { ...group, items } : null;
        });
        const filteredGroups = groups?.filter((g): g is NonNullable<typeof g> => Boolean(g));
        if (sectionMatch) return section;
        if (filteredGroups?.length) return { ...section, groups: filteredGroups };
        return null;
      })
      .filter((s): s is NonNullable<typeof s> => Boolean(s));
  }, [query]);

  useEffect(() => { setActive(null); }, [query]);

  const activeSection = filteredSections.find((s) => s.id === active) ?? null;
  const hasSub = !!(activeSection?.groups?.length || activeSection?.featured);

  const handleNavClick = useCallback(
    (id: string, hasChildren: boolean, href?: string) => {
      if (!hasChildren && href) { onClose(); return; }
      setActive((prev) => (prev === id ? null : id));
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed inset-0 z-40 flex flex-col ${!isMicrosite ? "auf-diamond-pattern" : ""}`}
          style={{ background: t.overlay }}
        >
          {/* Header spacer (matches fixed header height) */}
          <div className="h-22 shrink-0" />

          {/* Three-column body */}
          <div className="flex flex-1 overflow-hidden">
            <div className="flex h-full w-full gap-0 px-6 md:px-12 py-8 flex-col md:flex-row">

              {/* ── Col 1: Nav labels ─────────────────────────────── */}
              <div className={`max-h-6/12 lg:max-h-none shrink-0 md:w-80 lg:w-lg md:border-r md:pr-10 lg:pr-12 overflow-y-auto ${t.border}`}>
                {/* Search */}
                <div className="mb-5">
                  <div className="relative">
                    <Search className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-40 ${isMicrosite ? "text-navy" : "text-white"}`} />
                    <Input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      aria-label="Search navigation"
                      className={`w-full rounded-sm pl-9 py-2.5 text-xs uppercase tracking-[0.18em] focus:ring-0 ${t.searchBg} ${t.searchBorder} ${t.searchText} ${t.searchPlaceholder}`}
                    />
                  </div>
                </div>

                <p className={`mb-4 text-[10px] font-bold uppercase tracking-[0.22em] ${t.eyebrow}`}>
                  Navigate
                </p>

                <nav>
                  {filteredSections.map((section, i) => {
                    const hasChildren = !!(section.groups?.length || section.featured);
                    const isActive = active === section.id;
                    return (
                      <motion.div key={section.id} custom={i} variants={colVariants} initial="hidden" animate="visible">
                        {section.href && !hasChildren ? (
                          <Link
                            href={section.href}
                            onClick={onClose}
                            className="group relative flex items-center justify-between py-1.5 md:py-1"
                          >
                            <span className={`font-display text-xl font-light leading-tight transition-colors md:text-2xl lg:text-3xl ${t.navText} ${t.navHover}`}>
                              {section.label}
                            </span>
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleNavClick(section.id, hasChildren, section.href)}
                            className="group relative flex w-full items-center justify-between py-1.5 md:py-1 text-left"
                          >
                            <motion.span
                              animate={{ x: isActive ? 30 : 0 }}
                              transition={{ duration: 0.25, ease: EASE_OUT }}
                              className={`font-display text-xl font-light leading-tight transition-colors md:text-2xl lg:text-3xl ${
                                isActive ? t.activeText : `${t.navText} ${t.navHover}`
                              }`}
                            >
                              {section.label}
                            </motion.span>
                            {isActive && (
                              <motion.span
                                layoutId="nav-active-line"
                                className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 ${t.activeLine}`}
                              />
                            )}
                            <span className={`text-[11px] transition-all opacity-30 group-hover:opacity-60 ${isActive ? `opacity-100 ${t.activeText} rotate-90` : t.navText}`}>
                              <ChevronRight size={14} />
                            </span>
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* ── Col 2: Sub-items ──────────────────────────────── */}
              <div className={`flex-1 border-t pt-6 md:border-t-0 md:pt-0 md:px-10 lg:px-12 flex items-start overflow-y-auto ${t.border}`}>
                {hasSub && activeSection ? (
                  <SubPanel section={activeSection} onClose={onClose} t={t} />
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hidden text-sm md:block pt-1 opacity-20 ${t.navText+'/50'}`}
                  >
                    Select a section to explore
                  </motion.p>
                )}
              </div>

              {/* ── Col 3: Video panel (lg+ only) ─────────────────── */}
              <div className={`hidden lg:flex lg:w-80 xl:w-96 shrink-0 border-l pl-10 xl:pl-12 items-start overflow-y-auto ${t.border}`}>
                <div className="w-full">
                  <VideoPanel onClose={onClose} t={t} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className={`shrink-0 border-t ${t.border}`}>
            <div className="flex items-center justify-between gap-4 px-6 py-3.5 md:px-12">
              <p className={`hidden text-xs sm:block opacity-30 ${t.navText}`}>
                © {new Date().getFullYear()} Angeles University Foundation
              </p>
              <div className="ml-auto flex items-center gap-5">
                {quickLinks.slice(0, 3).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={onClose}
                    className={`hidden text-xs transition-colors md:block ${t.footerText} ${t.footerHover}`}
                  >
                    {l.label}
                  </Link>
                ))}
                <span className={`hidden h-3 w-px md:block ${t.divider}`} />
                <Link
                  href="/admin/dashboard"
                  onClick={onClose}
                  className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${t.border} ${t.footerText} hover:border-gold/50 hover:text-gold`}
                >
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <rect x="1" y="7" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
