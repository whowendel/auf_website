import type { PrivacyContactDPO } from "@/data/privacy-policy";

export function PrivacyContactDPOSection({ data }: { data: PrivacyContactDPO }) {
  return (
    <section id="contact-dpo" className="scroll-mt-32 py-14">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{data.eyebrow}</p>
        <h2 id="contact-dpo" className="font-display text-2xl font-light text-navy md:text-3xl">{data.title}</h2>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mb-8">
        <p>{data.intro}</p>
      </div>

      {/* Contact strip */}
      <div className="relative overflow-hidden rounded-2xl bg-navy mb-6">
        <div className="auf-diamond-pattern absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Office", value: data.contact.office, href: null },
            { label: "Location", value: data.contact.location, href: null },
            { label: "Email", value: data.contact.email, href: `mailto:${data.contact.email}` },
            { label: "Phone", value: data.contact.phone, href: null },
          ].map((item) => (
            <div key={item.label} className="bg-navy/80 px-5 py-4 backdrop-blur-sm">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gold/70">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-sm text-white transition-colors hover:text-gold">
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-white/80">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-auf-border bg-off-white px-5 py-4 text-xs leading-relaxed text-auf-muted">
          <span className="font-semibold text-navy">Response Time: </span>
          {data.responseTime}
        </div>
        <div className="rounded-xl border border-auf-border bg-off-white px-5 py-4 text-xs leading-relaxed text-auf-muted">
          <span className="font-semibold text-navy">National Privacy Commission: </span>
          If you are not satisfied with AUF&apos;s response to your privacy concern, you may escalate your complaint to the National Privacy Commission at{" "}
          <a
            href="https://www.privacy.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-navy underline underline-offset-2 hover:text-gold"
          >
            www.privacy.gov.ph
          </a>.
        </div>
      </div>
    </section>
  );
}
