import type { ResearchMetrics } from "@/data/research";

const STATUS_COLORS: Record<string, string> = {
  "ON-GOING": "bg-gold/15 text-[var(--auf-gold)]",
  "COMPLETED": "bg-navy/8 text-navy",
};

export function ResearchMetrics({ metrics }: { metrics: ResearchMetrics }) {
  const { facultyPublications, funding, rankings } = metrics;

  return (
    <section id="metrics-impact" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {metrics.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{metrics.title}</h2>
      {metrics.description && (
        <p className="mb-10 text-sm leading-relaxed text-auf-muted">{metrics.description}</p>
      )}

      {/* A — Rankings & Recognition */}
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">A</span>
          <h3 className="font-display text-lg font-semibold text-navy">Rankings & Recognition</h3>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-auf-border bg-off-white p-4 md:p-5">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-navy">
              Publications and University Rankings
            </p>
            <p className="text-sm leading-relaxed text-auf-muted">{rankings.theQs}</p>
          </div>
          <div className="rounded-xl border border-auf-border bg-off-white p-4 md:p-5">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-navy">
              University Rankings for Innovation (WURI)
            </p>
            <p className="text-sm leading-relaxed text-auf-muted">{rankings.wuri}</p>
          </div>
        </div>
      </div>

      {/* B — Faculty Publications by College */}
      <div className="mb-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">B</span>
          <h3 className="font-display text-lg font-semibold text-navy">Faculty Publications by College</h3>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-auf-muted">{facultyPublications.title}</p>
        <div className="overflow-x-auto rounded-xl border border-auf-border">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-navy text-white">
                {facultyPublications.columns.map((col) => (
                  <th key={col} className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {facultyPublications.rows.map((row) => (
                <tr key={row.college} className="border-t border-auf-border odd:bg-off-white">
                  <td className="px-4 py-2.5 font-semibold text-navy">{row.college}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.totalFaculty}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.scopus}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.wos}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.scopusOrWos}</td>
                  <td className="px-4 py-2.5 text-auf-muted">{row.proportion}</td>
                </tr>
              ))}
              <tr className="border-t border-auf-border bg-navy/8 font-bold text-navy">
                <td className="px-4 py-3" colSpan={4}>{facultyPublications.totalLabel}</td>
                <td className="px-4 py-3">{facultyPublications.totalCount}</td>
                <td className="px-4 py-3">{facultyPublications.totalProportion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* C — Funding Secured */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">C</span>
          <h3 className="font-display text-lg font-semibold text-navy">Internal and External Funding Secured</h3>
        </div>

        <p className="mb-3 text-sm font-semibold text-navy">{funding.internal.title}</p>
        <div className="mb-8 space-y-3">
          {funding.internal.rows.map((row, i) => (
            <div key={i} className="rounded-xl border border-auf-border bg-off-white p-4 md:p-5">
              <p className="font-display text-sm font-semibold leading-snug text-navy">{row.title}</p>
              <p className="mt-1 text-xs text-auf-muted">{row.leader}</p>
              <p className="mt-0.5 text-[11px] italic text-auf-muted/70">{row.unit}</p>
            </div>
          ))}
        </div>

        <p className="mb-3 text-sm font-semibold text-navy">{funding.external.title}</p>
        <div className="space-y-3">
          {funding.external.rows.map((row) => (
            <div key={row.id} className="rounded-xl border border-auf-border bg-white p-4 md:p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${STATUS_COLORS[row.status] ?? "bg-navy/8 text-navy"}`}>
                  {row.status}
                </span>
                <span className="text-[10px] font-semibold text-auf-muted">{row.source}</span>
              </div>
              <p className="font-display text-sm font-semibold leading-snug text-navy">{row.title}</p>
              <p className="mt-1 text-xs text-auf-muted">{row.leader}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-auf-muted/80">
                <span>Approved: {row.approvalDate}</span>
                <span>Duration: {row.duration}</span>
                <span className="font-semibold text-navy">{row.amount}</span>
              </div>
              <p className="mt-2 text-[11px] italic text-auf-muted/70">{row.remark}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
