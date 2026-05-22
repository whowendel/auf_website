import type { IntlApply } from "@/data/international-students";
import { DownloadableFormList } from "@/components/public/page-layout/downloadable-form-list";

export function IntlApply({ apply }: { apply: IntlApply }) {
  return (
    <section id="how-to-apply" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {apply.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{apply.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{apply.description}</p>

      <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Steps */}
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
            Application Steps
          </p>
          <ol className="space-y-4">
            {apply.steps.map((step, i) => (
              <li key={step.id} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <div className="flex-1 pt-0.5">
                  <p className="mb-0.5 text-sm font-semibold text-navy">{step.title}</p>
                  <p className="text-xs leading-relaxed text-auf-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Contact info + downloads */}
        <div className="space-y-6">
          {/* Contact strip */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
              Contact
            </p>
            <div className="relative overflow-hidden rounded-2xl bg-navy">
              <div className="auf-diamond-pattern absolute inset-0 pointer-events-none" aria-hidden />
              <div className="relative space-y-px bg-white/10">
                {[
                  { label: "Office",    value: apply.contact.label,            href: null },
                  { label: "ISO Email", value: apply.contact.email,            href: `mailto:${apply.contact.email}` },
                  { label: "Admissions",value: apply.contact.admissionsEmail,  href: `mailto:${apply.contact.admissionsEmail}` },
                  { label: "Phone",     value: apply.contact.phone,            href: null },
                  { label: "Hours",     value: apply.contact.hours,            href: null },
                ].map((item) => (
                  <div key={item.label} className="bg-navy/80 px-5 py-3 backdrop-blur-sm">
                    <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gold/70">
                      {item.label}
                    </p>
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
          </div>

          {/* Downloadable forms */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
              Application Forms
            </p>
            <DownloadableFormList forms={apply.downloadForms} accentColor="var(--auf-navy)" />
          </div>
        </div>
      </div>
    </section>
  );
}
