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
          {item.sections.map((section) => (
            <div key={section.heading} className="rounded-xl border border-auf-border bg-off-white p-4">
              <p className="mb-1.5 text-sm font-bold" style={{ color }}>{section.heading}</p>
              {section.body && <p className="text-sm leading-relaxed text-auf-muted">{section.body}</p>}
              {section.bullets && <BulletList bullets={section.bullets} color={color} />}
            </div>
          ))}
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
