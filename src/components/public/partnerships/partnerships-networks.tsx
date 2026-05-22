import { ExternalLink } from "lucide-react";
import type { PartnershipsNetworks } from "@/data/partnerships";

const REGION_STYLES: Record<string, string> = {
  "Southeast Asia": "bg-navy/8 text-navy",
  "Asia-Pacific":   "bg-gold/10 text-[#8a6800]",
  "Philippines":    "bg-off-white text-navy/60",
};

export function PartnershipsNetworks({ networks }: { networks: PartnershipsNetworks }) {
  return (
    <section id="networks" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {networks.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{networks.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{networks.description}</p>

      <div className="space-y-5">
        {networks.memberships.map((membership) => (
          <div
            key={membership.id}
            className="overflow-hidden rounded-2xl border border-auf-border bg-white"
          >
            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-auf-border bg-off-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {/* Acronym badge */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy">
                  <span className="font-display text-[11px] font-bold leading-tight text-gold text-center px-1">
                    {membership.acronym}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-base font-semibold text-navy">{membership.acronym}</h3>
                  <p className="max-w-md text-xs leading-snug text-auf-muted">{membership.name}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${REGION_STYLES[membership.region] ?? "bg-off-white text-navy/60"}`}
                    >
                      {membership.region}
                    </span>
                    {membership.since && membership.since !== "TBA" && (
                      <span className="text-[10px] text-auf-muted">Member since {membership.since}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Website link */}
              <a
                href={membership.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1.5 self-start rounded-full border border-auf-border bg-white px-3 py-1.5 text-[11px] font-semibold text-navy transition-colors hover:border-navy/30 hover:text-navy sm:self-center"
              >
                Visit Website
                <ExternalLink className="h-3 w-3" strokeWidth={2} />
              </a>
            </div>

            {/* Body */}
            <div className="grid gap-6 px-6 py-5 md:grid-cols-2">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/40">About</p>
                <p className="text-sm leading-relaxed text-auf-muted">{membership.description}</p>
              </div>

              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/40">
                  What This Means for AUF
                </p>
                <p className="mb-4 text-sm leading-relaxed text-auf-muted">{membership.whatItMeans}</p>

                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/40">
                  Areas of Focus
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {membership.focus.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-auf-border bg-off-white px-2.5 py-0.5 text-[10px] font-medium text-navy/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
