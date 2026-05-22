import {
  UserCog,
  MapPin,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Handshake } from "lucide-react";
import type { AlumniConnect } from "@/data/alumni";

const ICON_MAP: Record<string, LucideIcon> = {
  UserCog,
  MapPin,
  Handshake,
  Heart,
};

export function AlumniConnect({ connect }: { connect: AlumniConnect }) {
  return (
    <section id="stay-connected" className="scroll-mt-32 py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {connect.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{connect.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{connect.description}</p>

      {/* Channel cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {connect.channels.map((ch) => {
          const Icon = ICON_MAP[ch.icon] ?? Heart;
          return (
            <div
              key={ch.id}
              className="group flex flex-col rounded-2xl border border-auf-border bg-white p-5 transition-shadow hover:shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy/6">
                <Icon className="h-4.5 w-4.5 text-navy" strokeWidth={1.75} />
              </div>
              <h3 className="mb-1.5 font-display text-sm font-semibold text-navy">{ch.title}</h3>
              <p className="mb-4 flex-1 text-xs leading-relaxed text-auf-muted">{ch.description}</p>
              <a
                href={ch.href}
                className="self-start rounded-full border border-navy px-4 py-1.5 text-[11px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                {ch.action} →
              </a>
            </div>
          );
        })}
      </div>

      {/* Contact strip */}
      <div className="relative overflow-hidden rounded-2xl bg-navy">
        <div className="auf-diamond-pattern absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Office",   value: connect.contact.label,    href: null },
            { label: "Location", value: connect.contact.building + ", " + connect.contact.campus.split(",")[0], href: null },
            { label: "Email",    value: connect.contact.email,    href: `mailto:${connect.contact.email}` },
            { label: "Hours",    value: connect.contact.hours,    href: null },
          ].map((item) => (
            <div key={item.label} className="bg-navy/80 px-5 py-4 backdrop-blur-sm">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gold/70">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-sm text-white transition-colors hover:text-gold">
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-white/80">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
