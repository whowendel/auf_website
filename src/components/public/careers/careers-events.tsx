import type { CareersEvents } from "@/data/careers";

const TYPE_STYLES: Record<string, string> = {
  "Job Fair":     "bg-navy text-white",
  "Workshop":     "bg-gold/10 text-[#8a6800]",
  "Industry Talk":"bg-navy/8 text-navy",
  "Forum":        "bg-off-white text-navy/60",
};

export function CareersEvents({ events }: { events: CareersEvents }) {
  return (
    <section id="career-events" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {events.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{events.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{events.description}</p>

      <div className="space-y-4">
        {events.upcomingEvents.map((ev) => (
          <div
            key={ev.id}
            className="overflow-hidden rounded-2xl border border-auf-border bg-white"
          >
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-start sm:gap-6">
              {/* Date block */}
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-navy text-white">
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.1em] text-gold">
                  {ev.date === "TBA" ? "Date" : ev.date.split(" ")[0]}
                </span>
                <span className="font-display text-lg font-light">
                  {ev.date === "TBA" ? "TBA" : ev.date.split(" ")[1] ?? "—"}
                </span>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-semibold text-navy">{ev.title}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${TYPE_STYLES[ev.type] ?? "bg-off-white text-navy/60"}`}
                  >
                    {ev.type}
                  </span>
                  {ev.registrationRequired && (
                    <span className="rounded-full border border-gold/40 bg-gold/6 px-2.5 py-0.5 text-[10px] font-medium text-[#8a6800]">
                      Registration Required
                    </span>
                  )}
                </div>
                <p className="mb-1 text-[11px] font-medium text-auf-muted">
                  <span className="text-navy/40">Venue: </span>{ev.venue}
                </p>
                <p className="text-sm leading-relaxed text-auf-muted">{ev.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
