import {
  UserCheck,
  FileText,
  MessageSquare,
  Briefcase,
  Building2,
  Award,
  type LucideIcon,
} from "lucide-react";
import type { CareersServices } from "@/data/careers";

const ICON_MAP: Record<string, LucideIcon> = {
  UserCheck,
  FileText,
  MessageSquare,
  Briefcase,
  Building2,
  Award,
};

export function CareersServices({ services }: { services: CareersServices }) {
  return (
    <section id="career-services" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {services.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{services.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{services.description}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.servicesList.map((svc) => {
          const Icon = ICON_MAP[svc.icon] ?? Briefcase;
          return (
            <div
              key={svc.id}
              className="flex flex-col rounded-2xl border border-auf-border bg-white p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy/6">
                <Icon className="h-4.5 w-4.5 text-navy" strokeWidth={1.75} />
              </div>
              <h3 className="mb-1.5 font-display text-sm font-semibold text-navy">{svc.title}</h3>
              <p className="mb-4 flex-1 text-xs leading-relaxed text-auf-muted">{svc.description}</p>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-[11px] font-medium text-auf-muted">{svc.availability}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
