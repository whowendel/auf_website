import type { College } from "@/data/colleges";
import { SectionShell } from "./section-shell";

/**
 * Renders both college-level accreditations AND awards/recognitions in
 * a single combined section, since they tell the same "we're recognized" story.
 * Each block is independently conditional.
 */
export function MicrositeAccreditations({ college }: { college: College }) {
  const accs = college.collegeAccreditations ?? [];
  const recs = college.recognitions ?? [];

  if (accs.length === 0 && recs.length === 0 && !college.licensurePerformance) return null;

  return (
    <SectionShell
      id="accreditations"
      eyebrow="Credentials"
      title={
        <>
          Accreditations &amp;{" "}
          Recognition
        </>
      }
      description="National and international bodies that have recognized the College for its commitment to academic quality and excellence."
      brandColor={college.brandColor}
      tone="white"
    >
      {/* Accreditations */}
      {accs.length > 0 && (
        <div className="mb-12">
          <p
            className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: `${college.brandColor}80` }}
          >
            Programs & institutional accreditations
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accs.map((a) => (
              <div
                key={a.id}
                className="flex flex-col rounded-2xl border bg-white p-5"
                style={{ borderColor: `${college.brandColor}20` }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{
                      background: `${college.brandColor}10`,
                      color: college.brandColor,
                    }}
                  >
                    {a.body}
                  </span>
                  {a.year && (
                    <span className="text-[10px] font-semibold text-[var(--auf-muted)]">
                      {a.year}
                    </span>
                  )}
                </div>
                {a.program && (
                  <p className="text-sm font-semibold text-[var(--auf-navy)]">{a.program}</p>
                )}
                {a.level && (
                  <p
                    className="mt-0.5 font-display text-base font-semibold"
                    style={{ color: college.brandColor }}
                  >
                    {a.level}
                  </p>
                )}
                {a.description && (
                  <p className="mt-3 text-xs leading-relaxed text-[var(--auf-muted)]">
                    {a.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recognitions */}
      {recs.length > 0 && (
        <div>
          <p
            className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: `${college.brandColor}80` }}
          >
            Awards & recognition
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {recs.map((r) => (
              <div
                key={r.id}
                className="relative overflow-hidden rounded-2xl p-6"
                style={{ background: college.brandColor }}
              >
                {/* Gold corner */}
                <div
                  aria-hidden
                  className="absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-40 blur-2xl"
                  style={{ background: college.accentColor }}
                />
                <div className="relative">
                  {r.year && (
                    <span
                      className="mb-3 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{
                        borderColor: `${college.accentColor}50`,
                        color: college.accentColor,
                      }}
                    >
                      {r.year}
                    </span>
                  )}
                  <h3 className="font-display text-base font-semibold leading-snug text-white">
                    {r.title}
                  </h3>
                  {r.by && (
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                      Awarded by {r.by}
                    </p>
                  )}
                  {r.description && (
                    <p className="mt-3 text-xs leading-relaxed text-white/65">{r.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Licensure Performance Records */}
      {college.licensurePerformance && (
        <div className="mt-16 border-t border-[var(--auf-border)] pt-12">
          <p
            className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: `${college.brandColor}80` }}
          >
            Licensure Performance Records
          </p>
          <h3 className="font-display text-2xl font-light text-[var(--auf-navy)] md:text-3xl mb-6">
            {college.licensurePerformance.exam} Historical Performance
          </h3>
          <div className="overflow-x-auto rounded-2xl border bg-white" style={{ borderColor: `${college.brandColor}20` }}>
            <table className="w-full border-collapse text-left text-sm text-[var(--auf-text)]">
              <thead>
                <tr className="border-b bg-neutral-50" style={{ borderColor: `${college.brandColor}15` }}>
                  <th className="px-6 py-4 font-semibold text-[var(--auf-navy)]">Period</th>
                  <th className="px-6 py-4 font-semibold text-[var(--auf-navy)]">First Timers</th>
                  <th className="px-6 py-4 font-semibold text-[var(--auf-navy)]">Repeaters</th>
                  <th className="px-6 py-4 font-semibold text-[var(--auf-navy)]">Overall Passing Rate</th>
                  <th className="px-6 py-4 font-semibold text-[var(--auf-navy)]">National Average</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: `${college.brandColor}15` }}>
                {college.licensurePerformance.records.map((rec, i) => (
                  <tr key={i} className="hover:bg-neutral-50/50">
                    <td className="px-6 py-4 font-semibold text-[var(--auf-navy)]">{rec.period}</td>
                    <td className="px-6 py-4">{rec.firstTimers}</td>
                    <td className="px-6 py-4">{rec.repeaters}</td>
                    <td className="px-6 py-4 font-medium" style={{ color: college.brandColor }}>{rec.overall}</td>
                    <td className="px-6 py-4 text-[var(--auf-muted)]">{rec.nationalAverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
