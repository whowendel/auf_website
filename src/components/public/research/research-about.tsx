import type { ResearchAbout } from "@/data/research";

export function ResearchAbout({ about }: { about: ResearchAbout }) {
  return (
    <section id="about-ovpri" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {about.eyebrow}
      </p>
      <div className="mb-8 flex items-baseline gap-3">
        <h2 className="font-display text-2xl font-light text-navy md:text-3xl">{about.title}</h2>
        <span className="shrink-0 rounded-full bg-navy/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-navy">
          {about.acronym}
        </span>
      </div>

      <p className="mb-8 text-sm leading-relaxed text-auf-muted md:text-base">{about.description}</p>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Roles */}
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/50">
            Key Responsibilities
          </p>
          <ul className="space-y-2">
            {about.roles.map((role, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-auf-muted">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-navy/40" />
                <span className="leading-relaxed">{role}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/50">
            Contact OVPRI
          </p>
          <div className="rounded-xl border border-auf-border bg-off-white p-5 space-y-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50 w-16 shrink-0">Email</span>
              <a href={`mailto:${about.contact.email}`} className="text-sm text-navy hover:text-gold transition-colors">
                {about.contact.email}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50 w-16 shrink-0">Location</span>
              <span className="text-sm text-auf-muted">{about.contact.location}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50 w-16 shrink-0">Hours</span>
              <span className="text-sm text-auf-muted">{about.contact.hours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
