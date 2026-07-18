import Image from "next/image";
import Link from "next/link";
import type { College } from "@/data/colleges";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { CollegesDropdown } from "./colleges-dropdown";
import { shiftColor } from "@/lib/color";
import { ChevronLeft } from "lucide-react";

/**
 * In-page anchor links shown in the sticky-style tab strip below the hero.
 * Each entry is only rendered when the matching section actually has data for
 * this college — so navigation never points to an empty anchor.
 */
function getNavItems(college: College) {
  const items: { label: string; href: string }[] = [
    { label: "About", href: "#identity" },
  ];
  if (college.coreValues?.items.length) items.push({ label: "Core Values", href: "#core-values" });
  if (college.learningOutcomes?.items.length) items.push({ label: "Learning Outcomes", href: "#learning-outcomes" });
  if (college.programs.length > 0) items.push({ label: "Programs", href: "#programs" });
  if (college.curriculum?.levels.length) items.push({ label: "Curriculum", href: "#curriculum" });
  if (college.admissions?.groups.length) items.push({ label: "Admissions", href: "#admissions" });
  if (college.studentOrganizations?.length) items.push({ label: "Organizations", href: "#organizations" });
  if (college.faculty && (college.faculty.leads.length || college.faculty.roster.length)) {
    items.push({ label: "Faculty", href: "#faculty" });
  }
  if (college.activities?.length) items.push({ label: "Activities", href: "#activities" });
  if (college.affiliations?.length) items.push({ label: "Affiliations", href: "#affiliations" });
  if ((college.collegeAccreditations?.length ?? 0) + (college.recognitions?.length ?? 0) > 0) {
    items.push({ label: "Accreditations", href: "#accreditations" });
  }
  if (college.facilities?.length) items.push({ label: "Facilities", href: "#facilities" });
  if (college.topnotches?.length) items.push({ label: "Topnotchers", href: "#topnotches" });
  items.push({ label: "News & Events", href: "#news" });
  items.push({ label: "Contact", href: "#contact" });
  return items;
}

export function MicrositeHeader({ college }: { college: College }) {
  const navItems = getNavItems(college);
  const gradientStart = shiftColor(college.brandColor, 0.2);
  const gradientEnd = shiftColor(college.brandColor, -0.28);
  return (
    <>
      <div
        // pt-22 (88px) clears the fixed SiteHeader (h-22). Position relative so the
        // gold accent line + animated dot bg sit behind the header content.
        className="relative overflow-hidden pt-22"
        style={{
          background: `linear-gradient(180deg, ${gradientStart} 70%, ${college.brandColor} 95%, ${gradientEnd} 100%)`,
        }}
      >
        {/* Animated dot background */}
        <DottedGlowBackground
          gap={18}
          radius={1.6}
          color="rgba(255,255,255,0.1)"
          glowColor="rgba(242,195,0,0.5)"
          opacity={0.6}
          speedMin={0.2}
          speedMax={0.7}
          speedScale={0.6}
        />

        {/* Gold top accent */}
        <div
          className="absolute left-0 top-0 h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${college.accentColor}00 0%, ${college.accentColor} 50%, ${college.accentColor}00 100%)`,
          }}
        />

        {/* AUF back link */}
        <div className="relative border-b border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 md:px-12">
            <Link
              href="/"
              className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white"
            >
              <ChevronLeft size={13} />
              Home
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/admissions/how-to-apply"
                className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-all hover:border-[var(--auf-gold)] hover:text-[var(--auf-gold)]"
              >
                Apply now
              </Link>
              <CollegesDropdown
                currentCollegeId={college.id}
                accentColor={college.accentColor}
                brandColor={college.brandColor}
              />
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-12 md:px-12 md:pb-20 md:pt-16">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">

            {/* Left — identity */}
            <div className="flex-1">
              {/* Mascot logo */}
              {college.mascotLogoWithTextUrl ? (
                <div 
                  className="relative mb-6 h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-xl border transition-colors group-hover:opacity-90"
                  style={{
                    background: college.cardColor,
                    borderColor: college.cardColor,
                  }}
                >
                  {/* Shimmer line at top of container */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 h-px w-full z-10"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${college.accentColor} 50%, transparent 100%)`,
                    }}
                  />
                  <Image
                    src={college.mascotLogoWithTextUrl}
                    alt={`${college.shortName} ${college.mascotName ?? "logo"}`}
                    fill
                    className="object-contain drop-shadow-lg p-2"
                    priority
                  />
                </div>
              ) : (
                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white/10"
                  style={{ border: `1.5px solid ${college.accentColor}30` }}
                >
                  <span className="font-display text-xl font-bold text-white">
                    {college.shortName}
                  </span>
                </div>
              )}

              <p
                className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] opacity-60"
                style={{ color: college.accentColor }}
              >
                Angeles University Foundation
              </p>
              <h1 className="font-display text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {college.name}
              </h1>
              {college.mascotName && (
                <p
                  className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] opacity-50"
                  style={{ color: college.accentColor }}
                >
                  The {college.mascotName}
                </p>
              )}
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
                {college.description}
              </p>
            </div>

            {/* Right — quick stats */}
            <div className="flex shrink-0 flex-wrap gap-3 lg:flex-col lg:items-end">
              {[
                { label: "Programs offered", value: String(college.programs.length) },
                { label: "Part of AUF since", value: "1962" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="w-40 sm:w-48 rounded-xl border bg-white/25 px-5 py-4 text-right backdrop-blur-sm transition-colors"
                  style={{ borderColor: college.accentColor }}
                >
                  <div
                    className="font-display text-2xl font-semibold md:text-3xl"
                    style={{ color: college.accentColor }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-white">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* In-page navigation — only shows anchors that exist for this college */}
      <div
          className="sticky top-22 z-10 border-t border-white/10 backdrop-blur-sm"
          style={{ background: gradientEnd }}
        >
        <div className="flex justify-center overflow-x-auto px-6 md:px-12">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 border-b-2 border-transparent px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:border-[var(--auf-gold-light)] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
