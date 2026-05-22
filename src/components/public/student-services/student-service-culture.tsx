import type { CultureOffice, PerformingArtsGroup, ServiceGroup } from "@/data/student-services";
import { OfficeHeader } from "./_office-header";

function ArtsGroupCard({
  arts,
  brandColor,
  accentColor,
  index,
}: {
  arts: PerformingArtsGroup;
  brandColor: string;
  accentColor: string;
  index: number;
}) {
  const hasMedia = !!(arts.photoUrl || arts.gifUrl);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-auf-border bg-white">
      {/* Media area (photo → gif on hover) */}
      {hasMedia && (
        <div className="relative aspect-4/3 w-full overflow-hidden bg-off-white">
          {arts.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={arts.photoUrl} alt={arts.name} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
          )}
          {arts.gifUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={arts.gifUrl} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none" style={{ background: `linear-gradient(to top, ${brandColor}cc 0%, transparent 100%)` }} />
          <div className="absolute bottom-3 left-4 right-4">
            <h4 className="font-display text-sm font-semibold leading-snug text-white drop-shadow">{arts.name}</h4>
          </div>
          {arts.gifUrl && (
            <div
              className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: accentColor, color: brandColor }}
            >
              Live
            </div>
          )}
        </div>
      )}

      {/* Card body */}
      <div className="relative flex flex-1 flex-col p-5">
        <div className="absolute left-0 top-0 h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${brandColor} 0%, ${accentColor} 100%)` }} />

        {!hasMedia && (
          <>
            <span aria-hidden className="pointer-events-none absolute -right-2 bottom-0 select-none font-display text-6xl font-bold leading-none opacity-[0.04]" style={{ color: brandColor }}>
              {arts.name.split(" ").at(-1)![0]}
            </span>
            <h4 className="mb-3 font-display text-sm font-semibold text-navy md:text-base">{arts.name}</h4>
          </>
        )}

        <span className="mb-3 self-start rounded-full px-2 py-0.5 text-[9px] font-bold tabular-nums uppercase tracking-[0.14em]" style={{ background: `${brandColor}10`, color: brandColor }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {arts.description && (
          <p className="flex-1 text-xs leading-relaxed text-auf-muted">{arts.description}</p>
        )}
      </div>
    </div>
  );
}

export function CultureSection({
  office,
  group,
  isFirst,
}: {
  office: CultureOffice;
  group: ServiceGroup;
  isFirst: boolean;
}) {
  return (
    <section
      id={office.id}
      className={`scroll-mt-32 pb-14 ${isFirst ? "pt-2" : "border-t border-auf-border pt-14"}`}
    >
      <OfficeHeader office={office} group={group} />

      {/* Intro paragraphs */}
      <div className="mb-10 space-y-3">
        {office.intro.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-auf-muted md:text-base">{p}</p>
        ))}
      </div>

      {/* Performing arts group cards */}
      <div className="mb-10">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: group.brandColor }}>
          Performing Arts Groups
        </p>
        {office.performingArtsGroups.some((g) => g.gifUrl) && (
          <p className="mb-5 -mt-3 text-[11px] italic text-auf-muted">Hover over a card to see the group in action.</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {office.performingArtsGroups.map((arts, i) => (
            <ArtsGroupCard key={arts.id} arts={arts} brandColor={group.brandColor} accentColor={group.accentColor} index={i} />
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
