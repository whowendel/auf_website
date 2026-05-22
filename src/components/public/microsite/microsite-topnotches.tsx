import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

export function MicrositeTopnotches({ college }: { college: College }) {
  if (!college.topnotches?.length) return null;

  return (
    <SectionShell
      id="topnotches"
      eyebrow="Hall of fame"
      title="Our Topnotchers"
      description="Graduates whose achievements in licensure exams, competitions, and certifications bring honor to the College."
      brandColor={college.brandColor}
      tone="white"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {college.topnotches.map((t) => (
          <article
            key={t.id}
            className="relative overflow-hidden rounded-2xl p-6 md:p-7"
            style={{ background: college.brandColor }}
          >
            {/* Decorative gold glow */}
            <div
              aria-hidden
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-3xl"
              style={{ background: college.accentColor }}
            />

            {/* Decorative trophy ornament (CSS shape) */}
            <span
              aria-hidden
              className="absolute -bottom-2 -right-2 select-none font-display text-7xl font-bold leading-none opacity-10"
              style={{ color: college.accentColor }}
            >
              ★
            </span>

            <div className="relative">
              <span
                className="mb-3 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{
                  borderColor: `${college.accentColor}50`,
                  color: college.accentColor,
                }}
              >
                {t.year}
              </span>

              <p
                className="font-display text-xl font-semibold leading-tight"
                style={{ color: college.accentColor }}
              >
                {t.rank}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">
                {t.exam}
              </p>

              <div className="mt-4 border-t border-white/15 pt-4">
                <p className="font-display text-base font-semibold text-white">{t.name}</p>
                {t.program && (
                  <p className="mt-0.5 text-xs text-white/55">{t.program}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
