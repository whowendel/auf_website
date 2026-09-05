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

      {/* Varsity divisions */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {office.varsityDivisions.map((division) => (
          <div key={division.id} className="rounded-2xl border border-auf-border bg-off-white p-5 md:p-6">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.brandColor }}>
              {division.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {division.sports.map((sport, i) => (
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
        ))}
      </div>

      {/* Programs (intramural / extramural) */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {office.programs.map((program) => (
          <div key={program.id} className="rounded-2xl border border-auf-border bg-off-white p-5 md:p-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
              {program.label}
            </p>
            <ul className="space-y-1.5 text-sm leading-relaxed text-auf-muted">
              {program.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Athletic scholarship */}
      <div className="mb-10 rounded-2xl border border-auf-border bg-off-white p-5 md:p-6">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
          Athletic Scholarships
        </p>
        <p className="mb-3 text-sm leading-relaxed text-auf-muted">{office.scholarship.intro}</p>
        <ul className="mb-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-auf-muted">
          {office.scholarship.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-auf-muted">{office.scholarship.location}</p>
        <p className="mt-2 text-sm italic leading-relaxed text-auf-muted">{office.scholarship.tryoutNote}</p>
      </div>

      {/* Facilities grid */}
      <div className="mb-10">
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

      {/* Staff & coaching directory */}
      <div className="mb-10">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.brandColor }}>
          Athletics Office Staff
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {office.staffGroups.map((staffGroup) => (
            <div key={staffGroup.id} className="rounded-2xl border border-auf-border bg-off-white p-5">
              <p className="mb-3 text-xs font-semibold text-navy">{staffGroup.label}</p>
              <ul className="space-y-3">
                {staffGroup.members.map((member) => (
                  <li key={member.id} className="text-sm">
                    <p className="font-semibold text-navy">{member.name}</p>
                    <p className="text-auf-muted">{member.role}</p>
                    {member.credentials?.map((c, i) => (
                      <p key={i} className="text-xs text-auf-muted">{c}</p>
                    ))}
                    {member.email && <p className="text-xs text-auf-muted">{member.email}</p>}
                    {member.phone && <p className="text-xs text-auf-muted">{member.phone}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {office.achievements.length > 0 && (
        <div className="mb-10">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.brandColor }}>
            Recent Achievements
          </p>
          <div className="space-y-5">
            {office.achievements.map((achievement) => (
              <div key={achievement.id} className="rounded-2xl border border-auf-border bg-off-white p-5 md:p-6">
                <p className="font-display text-base font-semibold text-navy">{achievement.title}</p>
                {(achievement.dates || achievement.venue) && (
                  <p className="mb-3 text-xs text-auf-muted">
                    {[achievement.dates, achievement.venue].filter(Boolean).join(" · ")}
                  </p>
                )}
                {achievement.summary && (
                  <p className="text-sm leading-relaxed text-auf-muted">{achievement.summary}</p>
                )}
                {achievement.events?.map((event, i) => (
                  <div key={i} className={i > 0 ? "mt-4 border-t border-auf-border pt-4" : "mt-3"}>
                    <p className="text-sm font-semibold text-navy">
                      {event.event} — {event.division}
                      {event.result ? ` · ${event.result}` : ""}
                    </p>
                    {(event.coach || event.assistantCoach) && (
                      <p className="mt-1 text-xs text-auf-muted">
                        {[event.coach && `Coach: ${event.coach}`, event.assistantCoach && `Asst. Coach: ${event.assistantCoach}`]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    <ul className="mt-2 space-y-1 text-sm text-auf-muted">
                      {event.athletes.map((athlete, j) => (
                        <li key={j}>
                          {athlete.name} ({athlete.course}, Yr {athlete.year})
                          {athlete.medals && athlete.medals.length > 0 && (
                            <span className="block pl-4 text-xs italic">{athlete.medals.join(" · ")}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div className="rounded-xl p-4" style={{ background: `${group.brandColor}08`, border: `1px solid ${group.brandColor}25` }}>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>Contact</p>
        <ul className="space-y-1 text-sm text-auf-muted">
          <li>📧 {office.contact.emails.join(", ")}</li>
          <li>🕐 {office.contact.hours}</li>
          <li>📍 {office.contact.location}</li>
        </ul>
      </div>
    </section>
  );
}
