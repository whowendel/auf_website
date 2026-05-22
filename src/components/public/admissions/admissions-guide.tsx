import type { AdmissionsGuide } from "@/data/admissions";

export function AdmissionsGuide({ guide }: { guide: AdmissionsGuide }) {
  return (
    <section id="application-guide" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {guide.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{guide.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{guide.intro}</p>

      <ol className="space-y-0">
        {guide.steps.map((step, i) => {
          const isLast = i === guide.steps.length - 1;
          return (
            <li key={step.id} className="relative grid grid-cols-[4rem_1fr] gap-4">
              {/* Left: number + vertical line */}
              <div className="flex flex-col items-center">
                <div
                  className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-base font-semibold text-white"
                  style={{ background: "var(--auf-navy)" }}
                >
                  {step.number}
                </div>
                {!isLast && (
                  <div className="mt-1 flex-1 w-px bg-auf-border" aria-hidden />
                )}
              </div>

              {/* Right: content */}
              <div className={`pb-8 ${isLast ? "" : ""}`}>
                <h3 className="mt-1 font-display text-base font-semibold text-navy md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-auf-muted">{step.description}</p>

                {/* Requirements (step 3) */}
                {"requirements" in step && Array.isArray(step.requirements) && (
                  <ul className="mt-3 space-y-1.5">
                    {step.requirements.map((req, ri) => (
                      <li key={ri} className="flex items-start gap-2.5 text-sm text-auf-muted">
                        <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-navy/30" />
                        {req}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tips */}
                {"tips" in step && Array.isArray(step.tips) && step.tips.length > 0 && (
                  <div className="mt-3 rounded-lg border border-auf-border bg-off-white px-4 py-3">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Tips</p>
                    <ul className="space-y-1">
                      {step.tips.map((tip, ti) => (
                        <li key={ti} className="flex items-start gap-2 text-xs text-auf-muted">
                          <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
