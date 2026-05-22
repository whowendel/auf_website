import type { ResearchServices } from "@/data/research";
import { DownloadableFormList } from "@/components/public/page-layout/downloadable-form-list";

export function ResearchServices({ services }: { services: ResearchServices }) {
  return (
    <section id="services-support" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {services.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{services.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{services.description}</p>

      <div className="grid gap-8 lg:grid-cols-2">
        {services.categories.map((cat) => (
          <div key={cat.id}>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="h-0.5 w-5 bg-navy/30" aria-hidden />
              <h3 className="font-display text-base font-semibold text-navy">{cat.title}</h3>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-auf-muted">{cat.description}</p>
            <DownloadableFormList forms={cat.forms} accentColor="var(--auf-navy)" />
          </div>
        ))}
      </div>
    </section>
  );
}
