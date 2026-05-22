import type { PrivacyStudentRecords } from "@/data/privacy-policy";

export function PrivacyStudentRecordsSection({ data }: { data: PrivacyStudentRecords }) {
  return (
    <section id="student-records" className="scroll-mt-32 border-b border-auf-border py-14">
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{data.eyebrow}</p>
        <h2 id="student-records" className="font-display text-2xl font-light text-navy md:text-3xl">{data.title}</h2>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mb-6">
        <p>{data.intro}</p>
      </div>

      <h3 className="mt-6 font-display text-base font-semibold text-navy">Access to Student Records</h3>
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-auf-muted mb-6">
        {data.access.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mt-6 font-display text-base font-semibold text-navy">Retention of Academic Records</h3>
      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mt-3 mb-6">
        <p>{data.retention}</p>
      </div>

      <h3 className="mt-6 font-display text-base font-semibold text-navy">Records of Minors</h3>
      <div className="space-y-3 text-sm leading-relaxed text-auf-muted mt-3">
        <p>{data.minorsNote}</p>
      </div>
    </section>
  );
}
