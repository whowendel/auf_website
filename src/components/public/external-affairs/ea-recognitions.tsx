import type { ExternalAffairsRecognitions } from "@/data/external-affairs";

export function EaRecognitions({ recognitions }: { recognitions: ExternalAffairsRecognitions }) {
  return (
    <section id="recognitions" className="scroll-mt-32 pb-14 pt-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {recognitions.eyebrow}
      </p>
      <h2 className="mb-6 font-display text-2xl font-light text-navy md:text-3xl">
        {recognitions.title}
      </h2>

      <p className="mb-8 text-sm leading-relaxed text-auf-muted md:text-base">
        {recognitions.intro}
      </p>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-auf-border bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-auf-border bg-navy/5 text-xs font-bold uppercase tracking-wider text-navy">
              <th className="px-6 py-4 w-12 text-center">No.</th>
              <th className="px-6 py-4 w-52">Initiative</th>
              <th className="px-6 py-4 min-w-[200px]">Description</th>
              <th className="px-6 py-4 w-28 text-center">Year</th>
              <th className="px-6 py-4 w-60">Awarding Body / Details</th>
              <th className="px-6 py-4 w-40 text-center">Logo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-auf-border text-auf-muted">
            {recognitions.items.map((item) => (
              <tr key={item.no} className="hover:bg-navy/5 transition-colors">
                <td className="px-6 py-4 font-bold text-navy text-center">{item.no}</td>
                <td className="px-6 py-4 font-display font-bold text-navy text-xs leading-snug">
                  {item.initiative}
                </td>
                <td className="px-6 py-4 text-xs leading-relaxed">
                  {item.description}
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-center text-gold">
                  {item.year}
                </td>
                <td className="px-6 py-4 text-xs whitespace-pre-line leading-normal">
                  {item.awardingBody}
                  {item.band && (
                    <span className="block mt-1 text-[10px] font-bold text-navy/70">
                      · {item.band}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-block rounded-md border border-dashed border-gold/40 bg-gold/5 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-gold-dark select-none">
                    {item.logo}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
