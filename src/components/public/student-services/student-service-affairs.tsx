import type { StudentAffairsOffice, OfficeItem, ServiceGroup } from "@/data/student-services";
import { OfficeHeader } from "./_office-header";

function Label({ children, color, className = "mb-4" }: { children: string; color: string; className?: string }) {
  return (
    <p className={`${className} text-[10px] font-bold uppercase tracking-[0.2em]`} style={{ color }}>
      {children}
    </p>
  );
}

function BulletList({ bullets, color }: { bullets: string[]; color: string }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-2.5 text-sm text-auf-muted">
          <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
          <span className="leading-relaxed">{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function StaffCards({ bullets, color }: { bullets: string[]; color: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {bullets.map((entry) => {
        const [name, role] = entry.split(" — ");
        return (
          <div key={entry} className="rounded-xl border border-auf-border bg-off-white p-4">
            <p className="mb-1.5 text-sm font-bold" style={{ color }}>{role}</p>
            <p className="text-sm font-semibold leading-relaxed text-auf-muted">{name}</p>
          </div>
        );
      })}
    </div>
  );
}

function ContactBox({ item, color }: { item: OfficeItem; color: string }) {
  return (
    <div className="rounded-xl p-4" style={{ background: `${color}08`, border: `1px solid ${color}25` }}>
      <Label color={color} className="mb-3">{item.heading}</Label>
      <ul className="space-y-1.5 text-sm text-auf-muted">
        {item.bullets.map((line) => <li key={line}>{line}</li>)}
      </ul>
    </div>
  );
}

function ContentBlock({ item, color }: { item: OfficeItem; color: string }) {
  return (
    <div>
      <Label color={color}>{item.heading}</Label>
      {item.body && <p className="mb-4 text-sm leading-relaxed text-auf-muted">{item.body}</p>}
      {item.sections && (
        <div className="grid gap-3 sm:grid-cols-2">
          {item.sections.map((section) => {
            const downloads = section.downloads ?? (section.download ? [section.download] : []);
            return (
              <div
                key={section.heading}
                className="flex flex-col justify-between rounded-xl border border-auf-border bg-off-white p-4"
              >
                <div>
                  <p className="mb-1.5 text-sm font-bold" style={{ color }}>{section.heading}</p>
                  {section.body && <p className="text-sm leading-relaxed text-auf-muted">{section.body}</p>}
                  {section.bullets && section.bullets.length > 0 && <BulletList bullets={section.bullets} color={color} />}
                </div>

                {downloads.length > 0 && (
                  <div className="mt-4 border-t border-auf-border/70 pt-3 space-y-2">
                    {downloads.map((dl) => (
                      <div key={dl.url} className="space-y-1.5">
                        <a
                          href={dl.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-auf-border bg-white px-3.5 py-2 text-xs font-semibold text-navy shadow-2xs transition-colors hover:border-navy hover:bg-navy hover:text-white group"
                        >
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold"
                            style={{ background: `${color}15`, color }}
                          >
                            ↓
                          </span>
                          <span>{dl.label}</span>
                          <span className="text-[10px] font-semibold text-auf-muted group-hover:text-white/70 transition-colors">
                            ↗
                          </span>
                        </a>
                        {dl.restriction && (
                          <div className="flex items-start gap-1.5 text-[11px] leading-relaxed text-auf-muted">
                            <span className="shrink-0 text-navy/70" aria-hidden>🔒</span>
                            <span>
                              <strong className="font-semibold text-navy">Access Restriction: </strong>
                              {dl.restriction}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function StudentAffairsSection({
  office,
  group,
  isFirst,
}: {
  office: StudentAffairsOffice;
  group: ServiceGroup;
  isFirst: boolean;
}) {
  const color = group.brandColor;

  return (
    <section
      id={office.id}
      className={`scroll-mt-32 pb-14 ${isFirst ? "pt-2" : "border-t border-auf-border pt-14"}`}
    >
      <OfficeHeader office={office} group={group} />
      <div className="space-y-8">
        {office.items.map((item) => {
          if (item.id === "purpose") {
            return <p key={item.id} className="text-sm leading-relaxed text-auf-muted md:text-base">{item.body}</p>;
          }
          if (item.id === "staff") {
            return (
              <div key={item.id}>
                <Label color={color}>{item.heading}</Label>
                <StaffCards bullets={item.bullets} color={color} />
              </div>
            );
          }
          if (item.id === "contact") return <ContactBox key={item.id} item={item} color={color} />;
          return <ContentBlock key={item.id} item={item} color={color} />;
        })}
      </div>
    </section>
  );
}
