import type { CCFPOffice, ServiceGroup } from "@/data/student-services";
import { OfficeHeader } from "./_office-header";

export function CCFPSection({
  office,
  group,
  isFirst,
}: {
  office: CCFPOffice;
  group: ServiceGroup;
  isFirst: boolean;
}) {
  return (
    <section
      id={office.id}
      className={`scroll-mt-32 pb-14 ${isFirst ? "pt-2" : "border-t border-auf-border pt-14"}`}
    >
      <OfficeHeader office={office} group={group} />

      <p className="mb-10 text-sm leading-relaxed text-auf-muted md:text-base">{office.intro}</p>

      {/* Programs list on dark brand card */}
      <div className="relative mb-8 overflow-hidden rounded-2xl p-6 md:p-8" style={{ background: group.brandColor }}>
        <div className="auf-diamond-pattern absolute inset-0" />
        <div
          className="absolute left-0 top-0 h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, ${group.accentColor}00 0%, ${group.accentColor} 50%, ${group.accentColor}00 100%)` }}
        />
        <p className="relative mb-6 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.accentColor }}>
          CCFP Programs
        </p>
        <ol className="relative space-y-5">
          {office.programs.map((program, i) => (
            <li key={program.id} className="relative flex items-start gap-4">
              <span className="shrink-0 font-display text-2xl font-bold tabular-nums leading-none" style={{ color: `${group.accentColor}60` }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-white/70">{program.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <p className="text-sm leading-relaxed text-auf-muted md:text-base">{office.closing}</p>
    </section>
  );
}
