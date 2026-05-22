import Image from "next/image";
import type { AlumniNotable } from "@/data/alumni";

const FIELD_COLORS: Record<string, string> = {
  "Medicine & Public Health":     "bg-navy/8 text-navy",
  "Engineering & Technology":     "bg-gold/10 text-[#8a6800]",
  "Law & Government":             "bg-navy/8 text-navy",
  "Business & Entrepreneurship":  "bg-gold/10 text-[#8a6800]",
  "Education & Research":         "bg-navy/8 text-navy",
  "Arts, Culture & Media":        "bg-gold/10 text-[#8a6800]",
};

export function AlumniNotable({ notable }: { notable: AlumniNotable }) {
  return (
    <section id="distinguished-alumni" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {notable.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{notable.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{notable.description}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notable.alumni.map((person) => (
          <div
            key={person.id}
            className="flex flex-col rounded-2xl border border-auf-border bg-white p-5"
          >
            {/* Avatar + name row */}
            <div className="mb-4 flex items-center gap-3.5">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-navy">
                {person.photoUrl ? (
                  <Image
                    src={person.photoUrl}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-sm font-bold text-gold">
                    {person.name === "TBA" ? "?" : person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-navy">{person.name}</p>
                <p className="text-[11px] text-auf-muted">{person.college} · {person.batch}</p>
              </div>
            </div>

            {/* Field badge */}
            <span
              className={`mb-3 self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${FIELD_COLORS[person.field] ?? "bg-off-white text-navy/60"}`}
            >
              {person.field}
            </span>

            {/* Achievement */}
            <p className="mt-auto text-xs leading-relaxed text-auf-muted">{person.achievement}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-auf-border bg-off-white px-5 py-4 text-xs leading-relaxed text-auf-muted">
        <p className="font-semibold text-navy">{notable.nominationNote}</p>
        <p className="mt-0.5">{notable.nominationContactNote}</p>
      </div>
    </section>
  );
}
