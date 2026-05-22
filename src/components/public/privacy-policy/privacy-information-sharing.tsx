import type { PrivacyInformationSharing } from "@/data/privacy-policy";

export function PrivacyInformationSharingSection({ data }: { data: PrivacyInformationSharing }) {
  return (
    <section id="information-sharing" className="scroll-mt-32 border-b border-auf-border py-14">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{data.eyebrow}</p>
        <h2 id="information-sharing" className="font-display text-2xl font-light text-navy md:text-3xl">{data.title}</h2>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mb-6">
        <p>{data.intro}</p>
      </div>

      <h3 className="mt-6 font-display text-base font-semibold text-navy">Authorized Internal Sharing</h3>
      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mt-3 mb-6">
        <p>{data.internalSharing}</p>
      </div>

      <h3 className="mt-6 font-display text-base font-semibold text-navy">Third-Party Service Providers</h3>
      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mt-3 mb-6">
        <p>{data.thirdPartyProviders}</p>
      </div>

      <h3 className="mt-6 font-display text-base font-semibold text-navy">Government Agencies and Regulatory Bodies</h3>
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-auf-muted mb-6">
        {data.governmentAgencies.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mt-6 font-display text-base font-semibold text-navy">Academic and Professional Verification</h3>
      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mt-3 mb-6">
        <p>{data.academicVerification}</p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-5 py-4 text-xs leading-relaxed text-amber-800/80">
        <span className="font-semibold">Unauthorized Disclosure: </span>
        {data.unauthorizedDisclosureWarning}
      </div>
    </section>
  );
}
