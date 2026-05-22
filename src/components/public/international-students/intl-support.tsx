import {
  Building2, Users, Home, HeartPulse, BookOpen, Globe,
  type LucideIcon,
} from "lucide-react";
import type { IntlSupport } from "@/data/international-students";

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, Users, Home, HeartPulse, BookOpen, Globe,
};

export function IntlSupport({ support }: { support: IntlSupport }) {
  return (
    <section id="student-support" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {support.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{support.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{support.description}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {support.services.map((svc, index) => {
          const Icon = ICON_MAP[svc.icon] ?? Globe;
          const isPrimary = index === 0;
          return (
            <div
              key={svc.id}
              className={`flex flex-col overflow-hidden rounded-2xl border ${isPrimary ? "border-navy/20 bg-navy text-white sm:col-span-2 lg:col-span-1" : "border-auf-border bg-white"}`}
            >
              <div className="flex-1 p-5">
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${isPrimary ? "bg-white/15" : "bg-navy/6"}`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 ${isPrimary ? "text-gold" : "text-navy"}`}
                    strokeWidth={1.75}
                  />
                </div>
                <h3
                  className={`mb-1.5 font-display text-sm font-semibold ${isPrimary ? "text-white" : "text-navy"}`}
                >
                  {svc.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isPrimary ? "text-white/70" : "text-auf-muted"}`}>
                  {svc.body}
                </p>
              </div>
              {svc.contact && (
                <div
                  className={`border-t px-5 py-3 ${isPrimary ? "border-white/10" : "border-auf-border bg-off-white"}`}
                >
                  <a
                    href={`mailto:${svc.contact}`}
                    className={`text-[11px] font-medium transition-colors ${isPrimary ? "text-gold hover:text-gold/80" : "text-navy hover:text-gold"}`}
                  >
                    {svc.contact}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
