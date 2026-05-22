import type { PrivacyDataSecurity } from "@/data/privacy-policy";

export function PrivacyDataSecuritySection({ data }: { data: PrivacyDataSecurity }) {
  return (
    <section id="data-security" className="scroll-mt-32 border-b border-auf-border py-14">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{data.eyebrow}</p>
        <h2 id="data-security" className="font-display text-2xl font-light text-navy md:text-3xl">{data.title}</h2>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mb-6">
        <p>{data.intro}</p>
      </div>

      <ul className="mt-5 space-y-1.5 text-sm leading-relaxed text-auf-muted mb-6">
        {data.measures.map((measure, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            {measure}
          </li>
        ))}
      </ul>

      <div className="rounded-xl border border-auf-border bg-off-white px-5 py-4 text-xs leading-relaxed text-auf-muted">
        <span className="font-semibold text-navy">Data Breach Notification: </span>
        {data.breachNotification}
      </div>
    </section>
  );
}
