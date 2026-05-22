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

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Vision — dark card */}
        <div
          className="relative overflow-hidden rounded-2xl p-6 lg:col-span-2 md:p-8"
          style={{ background: group.brandColor }}
        >
          <div className="auf-diamond-pattern absolute inset-0" />
          <div className="relative">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.accentColor }}>
              Our vision
            </p>
            <p className="font-display text-base font-light italic leading-relaxed text-white md:text-lg">
              &ldquo;{office.vision}&rdquo;
            </p>
          </div>
        </div>

        {/* Aims — light card */}
        <div className="rounded-2xl border border-auf-border bg-off-white p-6 lg:col-span-3 md:p-8">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.brandColor }}>
            The UHS Aims to
          </p>
          <ul className="space-y-4">
            {office.aims.map((aim, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ background: group.brandColor }}
                >
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-auf-muted">{aim}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
