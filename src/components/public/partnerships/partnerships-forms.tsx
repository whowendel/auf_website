import type { PartnershipsForms } from "@/data/partnerships";
import { DownloadableFormList } from "@/components/public/page-layout/downloadable-form-list";

export function PartnershipsForms({ forms }: { forms: PartnershipsForms }) {
  return (
    <section id="forms" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {forms.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{forms.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{forms.description}</p>

      <DownloadableFormList forms={forms.downloadableForms} accentColor="var(--auf-navy)" />

      <p className="mt-6 rounded-xl border border-auf-border bg-off-white px-5 py-3.5 text-xs leading-relaxed text-auf-muted">
        <span className="font-semibold text-navy">Submission: </span>{forms.submissionNote}
      </p>
    </section>
  );
}
