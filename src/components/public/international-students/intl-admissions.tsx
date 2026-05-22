import type { IntlAdmissions } from "@/data/international-students";

const LEVEL_COLORS = ["bg-navy", "bg-gold", "bg-navy/70"];

export function IntlAdmissions({ admissions }: { admissions: IntlAdmissions }) {
  return (
    <section id="admission-requirements" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {admissions.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{admissions.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{admissions.description}</p>

      <div className="space-y-4">
        {admissions.levels.map((level, index) => (
          <details
            key={level.id}
            className="group overflow-hidden rounded-2xl border border-auf-border bg-white"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 hover:bg-off-white">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${LEVEL_COLORS[index] ?? "bg-navy"}`}
              >
                {index + 1}
              </span>
              <h3 className="flex-1 font-display text-sm font-semibold text-navy md:text-base">
                {level.level}
              </h3>
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-navy/30 transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="border-t border-auf-border px-5 py-5">
              <p className="mb-4 text-sm leading-relaxed text-auf-muted">{level.description}</p>
              <ul className="space-y-2">
                {level.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-navy/8 text-[9px] font-bold text-navy">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-auf-muted">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>

      <p className="mt-8 rounded-xl border border-red-100 bg-red-50/50 px-5 py-3.5 text-xs leading-relaxed text-red-700/80">
        <span className="font-semibold">Important: </span>{admissions.note}
      </p>
    </section>
  );
}
