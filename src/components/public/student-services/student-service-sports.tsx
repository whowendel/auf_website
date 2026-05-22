import type { SportsOffice, ServiceGroup } from "@/data/student-services";
import { OfficeHeader } from "./_office-header";

export function SportsSection({
  office,
  group,
  isFirst,
}: {
  office: SportsOffice;
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

      {/* Varsity sports chips */}
      <div className="mb-10">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.brandColor }}>
          Varsity Sports
        </p>
        <div className="flex flex-wrap gap-2">
          {office.varsitySports.map((sport, i) => (
            <span
              key={i}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-white"
              style={{ background: group.brandColor }}
            >
              {sport}
            </span>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-auf-border bg-off-white p-5 md:p-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
            Intramural Programs
          </p>
          <p className="text-sm leading-relaxed text-auf-muted">{office.intramural}</p>
        </div>
        <div className="rounded-2xl border border-auf-border bg-off-white p-5 md:p-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
            Athletic Scholarships
          </p>
          <p className="text-sm leading-relaxed text-auf-muted">{office.scholarships}</p>
        </div>
      </div>

      {/* Facilities grid */}
      <div className="mb-8">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.brandColor }}>
          Facilities
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {office.facilities.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-auf-border bg-white px-4 py-3">
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ background: group.brandColor }} />
              <span className="text-sm text-navy">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl p-4" style={{ background: `${group.brandColor}08`, border: `1px solid ${group.brandColor}25` }}>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>Contact</p>
        <ul className="space-y-1 text-sm text-auf-muted">
          <li>📧 {office.contact.email}</li>
          <li>🕐 {office.contact.hours}</li>
          <li>📍 {office.contact.location}</li>
        </ul>
      </div>
    </section>
  );
}
