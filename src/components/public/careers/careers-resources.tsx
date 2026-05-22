import type { CareersResources } from "@/data/careers";
import { DownloadableFormList } from "@/components/public/page-layout/downloadable-form-list";

export function CareersResources({ resources }: { resources: CareersResources }) {
  return (
    <section id="career-resources" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {resources.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{resources.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{resources.description}</p>

      <DownloadableFormList forms={resources.downloadableForms} accentColor="var(--auf-navy)" />
    </section>
  );
}
