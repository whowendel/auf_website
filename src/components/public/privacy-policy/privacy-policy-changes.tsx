import type { PrivacyPolicyChanges } from "@/data/privacy-policy";

export function PrivacyPolicyChangesSection({ data }: { data: PrivacyPolicyChanges }) {
  return (
    <section id="policy-changes" className="scroll-mt-32 border-b border-auf-border py-14">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{data.eyebrow}</p>
        <h2 id="policy-changes" className="font-display text-2xl font-light text-navy md:text-3xl">{data.title}</h2>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mb-6">
        <p>{data.intro}</p>
      </div>

      <div className="mt-4">
        <ol className="space-y-2 text-sm leading-relaxed text-auf-muted">
          {data.communicationMethods.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy/8 text-[10px] font-bold text-navy">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mt-5">
        <p>{data.continuedUse}</p>
        <p>{data.archivedVersions}</p>
      </div>
    </section>
  );
}
