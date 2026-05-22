import type { CareersContact } from "@/data/careers";

export function CareersContact({ contact }: { contact: CareersContact }) {
  return (
    <section id="contact-cdc" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {contact.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{contact.title}</h2>
      <p className="mb-8 text-sm leading-relaxed text-auf-muted">{contact.description}</p>

      {/* Office contact strip */}
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-navy">
        <div className="auf-diamond-pattern absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Office",   value: contact.office.name,    href: null },
            { label: "Location", value: contact.office.building, href: null },
            { label: "Email",    value: contact.office.email,   href: `mailto:${contact.office.email}` },
            { label: "Phone",    value: contact.office.phone,   href: null },
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* For students */}
        <div className="overflow-hidden rounded-2xl border border-auf-border bg-white">
          <div className="border-b border-auf-border bg-navy/4 px-5 py-3.5">
            <h3 className="font-display text-sm font-semibold text-navy">{contact.forStudents.title}</h3>
          </div>
          <ol className="space-y-3 px-5 py-5">
            {contact.forStudents.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-sm leading-relaxed text-auf-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* For employers */}
        <div className="overflow-hidden rounded-2xl border border-auf-border bg-white">
          <div className="border-b border-auf-border bg-navy/4 px-5 py-3.5">
            <h3 className="font-display text-sm font-semibold text-navy">{contact.forEmployers.title}</h3>
          </div>
          <ol className="space-y-3 px-5 py-5">
            {contact.forEmployers.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-sm leading-relaxed text-auf-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-auf-muted">
        Office hours: <span className="font-semibold text-navy">{contact.office.hours}</span>
      </p>
    </section>
  );
}
