import type { CareersOpenings } from "@/data/careers";

const TYPE_STYLES: Record<string, string> = {
  "Full-time": "bg-navy/8 text-navy",
  "OJT":       "bg-gold/10 text-[#8a6800]",
  "Part-time": "bg-off-white text-navy/60",
};

export function CareersOpenings({ openings }: { openings: CareersOpenings }) {
  return (
    <section id="job-openings" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {openings.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{openings.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{openings.description}</p>

      <div className="space-y-3">
        {openings.listings.map((job) => (
          <div
            key={job.id}
            className="overflow-hidden rounded-xl border border-auf-border bg-white"
          >
            <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-sm font-semibold text-navy">{job.title}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${TYPE_STYLES[job.type] ?? "bg-off-white text-navy/60"}`}
                  >
                    {job.type}
                  </span>
                </div>
                <p className="text-[12px] font-medium text-auf-muted">{job.company}</p>
                <p className="text-[11px] text-auf-muted/70">{job.location}</p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {/* College tags */}
                {job.colleges.map((col) => (
                  <span
                    key={col}
                    className="rounded border border-auf-border bg-off-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-navy/50"
                  >
                    {col}
                  </span>
                ))}
                {/* CTA */}
                {job.href ? (
                  <a
                    href={job.href}
                    className="rounded-full bg-navy px-4 py-1.5 text-[11px] font-semibold text-white transition-opacity hover:opacity-80"
                  >
                    Apply
                  </a>
                ) : (
                  <span className="rounded-full border border-auf-border px-4 py-1.5 text-[11px] font-semibold text-navy/40 cursor-not-allowed">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-auf-border bg-off-white px-5 py-4 text-xs leading-relaxed text-auf-muted">
        <p className="font-semibold text-navy">{openings.submissionNote}</p>
        <p className="mt-0.5">{openings.submissionContactNote}</p>
      </div>
    </section>
  );
}
