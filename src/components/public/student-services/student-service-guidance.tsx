import type { GccStaffMember, GuidanceOffice, ServiceGroup } from "@/data/student-services";
import { OfficeHeader } from "./_office-header";

function staffByRole(staff: GccStaffMember[]): [string, GccStaffMember[]][] {
  const groups: [string, GccStaffMember[]][] = [];
  for (const member of staff) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup[0] === member.role) {
      lastGroup[1].push(member);
    } else {
      groups.push([member.role, [member]]);
    }
  }
  return groups;
}

export function GuidanceSection({
  office,
  group,
  isFirst,
}: {
  office: GuidanceOffice;
  group: ServiceGroup;
  isFirst: boolean;
}) {
  return (
    <section
      id={office.id}
      className={`scroll-mt-32 pb-14 ${isFirst ? "pt-2" : "border-t border-auf-border pt-14"}`}
    >
      <OfficeHeader office={office} group={group} />

      {/* Intro */}
      <p className="mb-8 text-sm leading-relaxed text-auf-muted md:text-base">{office.intro}</p>

      {/* Main office + satellite offices */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div
          className="rounded-xl p-4"
          style={{ background: `${group.brandColor}08`, border: `1px solid ${group.brandColor}25` }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
            {office.mainOffice.label}
          </p>
          <p className="mt-1 text-sm text-auf-muted">{office.mainOffice.room}, {office.mainOffice.building}</p>
          <p className="mt-1 text-sm text-auf-muted">{office.mainOffice.hours}</p>
        </div>
        {office.satelliteOffices.map((loc) => (
          <div key={loc.id} className="rounded-xl border border-auf-border bg-off-white p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
              {loc.label}
            </p>
            <p className="mt-1 text-sm text-auf-muted">{loc.room}, {loc.building}</p>
            <p className="mt-1 text-sm text-auf-muted">{loc.hours}</p>
          </div>
        ))}
      </div>

      {/* Philosophy */}
      <blockquote
        className="mb-8 rounded-2xl border-l-4 p-6"
        style={{ borderColor: group.brandColor, background: `${group.brandColor}06` }}
      >
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
          Philosophy
        </p>
        <p className="mt-1.5 text-sm italic leading-relaxed text-navy">{office.philosophy}</p>
      </blockquote>

      {/* Objectives */}
      <div className="mb-8">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
          Objectives
        </p>
        <ul className="space-y-2">
          {office.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-display text-sm font-bold tabular-nums" style={{ color: `${group.brandColor}60` }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-auf-muted">{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Core services grid */}
      <div className="mb-8">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
          Core Services
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {office.coreServices.map((svc) => (
            <div key={svc.id} className="rounded-xl border border-auf-border bg-off-white p-4">
              <p className="mb-1.5 text-xs font-bold" style={{ color: group.brandColor }}>{svc.title}</p>
              <p className="text-xs leading-relaxed text-auf-muted">{svc.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment steps */}
      <div className="mb-8">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
          How to Make an Appointment
        </p>
        <div className="flex flex-col gap-0">
          {office.appointmentSteps.map((step, i, arr) => (
            <div key={i} className="flex items-stretch gap-4">
              <div className="relative flex flex-col items-center">
                <span
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: group.brandColor }}
                >
                  {step.number}
                </span>
                {i < arr.length - 1 && (
                  <span className="my-1 block w-px flex-1" style={{ background: `${group.brandColor}30` }} />
                )}
              </div>
              <div className="pb-6">
                <p className="text-sm font-semibold text-navy">{step.heading}</p>
                <p className="mt-1 text-sm leading-relaxed text-auf-muted">{step.body}</p>
                {step.qrCodeUrl && (
                  <img
                    src={step.qrCodeUrl}
                    alt={`${step.heading} QR code`}
                    className="mt-3 h-32 w-32 rounded-lg border border-auf-border bg-white p-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidentiality */}
      <p className="mb-8 text-sm leading-relaxed text-auf-muted">
        <span className="font-semibold text-navy">Confidentiality: </span>
        {office.confidentiality}
      </p>

      {/* GCC Staff */}
      <div className="mb-8">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>
          GCC Staff
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {staffByRole(office.staff).map(([role, members]) => (
            <div key={role} className="rounded-xl border border-auf-border bg-off-white p-4">
              <p className="mb-1.5 text-xs font-bold" style={{ color: group.brandColor }}>{role}</p>
              <ul className="space-y-0.5">
                {members.map((member) => (
                  <li key={member.id} className="text-xs font-semibold leading-relaxed text-auf-muted">{member.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl p-4" style={{ background: `${group.brandColor}08`, border: `1px solid ${group.brandColor}25` }}>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: group.brandColor }}>Contact</p>
        <ul className="space-y-1.5 text-sm text-auf-muted">
          {office.contact.emails.map((email) => (
            <li key={email}>
              📧 <a href={`mailto:${email}`} className="hover:underline">{email}</a>
            </li>
          ))}
          <li>
            ☎️ {office.contact.phone.base}
            {office.contact.phone.extensions.map((ext, i) => (
              <span key={ext.label}>
                {i === 0 ? " " : "; "}local {ext.local} ({ext.label})
              </span>
            ))}
          </li>
        </ul>
      </div>
    </section>
  );
}
