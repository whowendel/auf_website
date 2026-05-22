import {
  Award, Languages, Stethoscope, Globe, MapPin, DollarSign,
  type LucideIcon,
} from "lucide-react";
import type { IntlOverview } from "@/data/international-students";

const ICON_MAP: Record<string, LucideIcon> = {
  Award, Languages, Stethoscope, Globe, MapPin, DollarSign,
};

export function IntlOverview({ overview }: { overview: IntlOverview }) {
  return (
    <section id="why-auf" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {overview.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{overview.title}</h2>
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-auf-muted">{overview.description}</p>

      {/* Stats */}
      <div className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-auf-border bg-auf-border sm:grid-cols-4">
        {overview.stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center bg-white px-4 py-6 text-center">
            <span className="font-display text-2xl font-light text-navy md:text-3xl">{stat.value}</span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-auf-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Reasons grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overview.reasons.map((reason) => {
          const Icon = ICON_MAP[reason.icon] ?? Globe;
          return (
            <div
              key={reason.id}
              className="group relative overflow-hidden rounded-2xl border border-auf-border bg-white p-5 transition-shadow hover:shadow-sm"
            >
              {/* Gold accent line on hover */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gold opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy/6">
                <Icon className="h-4.5 w-4.5 text-navy" strokeWidth={1.75} />
              </div>
              <h3 className="mb-1.5 font-display text-sm font-semibold text-navy">{reason.title}</h3>
              <p className="text-xs leading-relaxed text-auf-muted">{reason.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
