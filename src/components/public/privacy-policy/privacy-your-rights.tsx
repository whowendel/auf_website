import type { PrivacyYourRights } from "@/data/privacy-policy";

export function PrivacyYourRightsSection({ data }: { data: PrivacyYourRights }) {
  return (
    <section id="your-rights" className="scroll-mt-32 border-b border-auf-border py-14">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{data.eyebrow}</p>
        <h2 id="your-rights" className="font-display text-2xl font-light text-navy md:text-3xl">{data.title}</h2>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mb-6">
        <p>{data.intro}</p>
      </div>

      <div className="mt-6 space-y-3">
        {data.rights.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-xl border border-auf-border bg-white">
            <div className="border-b border-auf-border bg-off-white px-5 py-3">
              <p className="font-display text-sm font-semibold text-navy">{item.right}</p>
            </div>
            <p className="px-5 py-3.5 text-sm leading-relaxed text-auf-muted">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mt-6">
        <p>{data.exerciseNote}</p>
      </div>
    </section>
  );
}
