import type { AdmissionsRegistrar } from "@/data/admissions";
import { DownloadableFormList } from "@/components/public/page-layout/downloadable-form-list";

export function AdmissionsRegistrar({ registrar }: { registrar: AdmissionsRegistrar }) {
  return (
    <section id="university-registrar" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {registrar.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{registrar.title}</h2>
      <p className="mb-8 text-sm leading-relaxed text-auf-muted">{registrar.description}</p>

      {/* Contact card */}
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-navy">
        <div className="auf-diamond-pattern absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Email", value: registrar.contact.email, href: `mailto:${registrar.contact.email}` },
            { label: "Location", value: registrar.contact.location, href: null },
            { label: "Phone", value: registrar.contact.phone, href: null },
            { label: "Hours", value: registrar.contact.hours, href: null },
          ].map((item) => (
            <div key={item.label} className="bg-navy/80 px-5 py-4 backdrop-blur-sm">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gold/70">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-sm text-white hover:text-gold transition-colors">{item.value}</a>
              ) : (
                <p className="text-sm text-white/80">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Services */}
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">Registrar Services</p>
          <div className="space-y-3">
            {registrar.services.map((svc) => (
              <div key={svc.id} className="rounded-xl border border-auf-border bg-white p-4 md:p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-display text-sm font-semibold text-navy">{svc.name}</h3>
                  {svc.processingTime && (
                    <span className="shrink-0 rounded-full bg-navy/8 px-2 py-0.5 text-[9px] font-medium text-navy/60">
                      {svc.processingTime}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-auf-muted">{svc.description}</p>
                {svc.requirements && svc.requirements.length > 0 && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.14em] text-navy/50 hover:text-navy transition-colors">
                      Requirements ↓
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {svc.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-auf-muted">
                          <span aria-hidden className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-navy/25" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Downloadable forms */}
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">Downloadable Forms</p>
          <DownloadableFormList forms={registrar.downloadableForms} accentColor="var(--auf-navy)" />
        </div>
      </div>
    </section>
  );
}
