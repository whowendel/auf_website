import type { PrivacyCookies } from "@/data/privacy-policy";

export function PrivacyCookiesSection({ data }: { data: PrivacyCookies }) {
  return (
    <section id="cookies" className="scroll-mt-32 border-b border-auf-border py-14">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{data.eyebrow}</p>
        <h2 id="cookies" className="font-display text-2xl font-light text-navy md:text-3xl">{data.title}</h2>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mb-6">
        <p>{data.intro}</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-auf-border">
        <table className="w-full text-sm">
          <thead className="border-b border-auf-border bg-off-white">
            <tr>
              {["Cookie Type", "Purpose", "Retention"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.types.map((cookieType) => (
              <tr key={cookieType.id} className="border-b border-auf-border last:border-0">
                <td className="px-4 py-3 text-sm font-medium text-navy">{cookieType.type}</td>
                <td className="px-4 py-3 text-sm text-auf-muted">{cookieType.purpose}</td>
                <td className="px-4 py-3 text-sm text-auf-muted">{cookieType.retention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mt-5">
        <p>{data.disablingNote}</p>
      </div>
    </section>
  );
}
