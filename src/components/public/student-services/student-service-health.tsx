import type { HealthOffice, ServiceGroup } from "@/data/student-services";
import { OfficeHeader } from "./_office-header";

export function HealthSection({
  office,
  group,
  isFirst,
}: {
  office: HealthOffice;
  group: ServiceGroup;
  isFirst: boolean;
}) {
  return (
    <section
      id={office.id}
      className={`scroll-mt-32 pb-14 ${isFirst ? "pt-2" : "border-t border-auf-border pt-14"}`}
    >
      <OfficeHeader office={office} group={group} />

      <p className="mb-8 text-sm leading-relaxed text-auf-muted md:text-base">{office.intro}</p>

      <div className="rounded-2xl border border-auf-border bg-off-white p-6 md:p-8">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.brandColor }}>
          Functions
        </p>
        <ul className="space-y-4">
          {office.aims.map((aim, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: group.brandColor }}
              >
                {String.fromCharCode(97 + i)}
              </span>
              <span className="text-sm leading-relaxed text-auf-muted">{aim}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
