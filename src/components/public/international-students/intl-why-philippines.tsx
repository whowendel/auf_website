import {
  MessageCircle, Banknote, Sun, HeartHandshake, Plane, GraduationCap,
  type LucideIcon,
  Globe,
} from "lucide-react";
import type { IntlPhilippines } from "@/data/international-students";

const ICON_MAP: Record<string, LucideIcon> = {
  MessageCircle, Banknote, Sun, HeartHandshake, Plane, GraduationCap,
};

export function IntlWhyPhilippines({ philippines }: { philippines: IntlPhilippines }) {
  return (
    <section id="why-philippines" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {philippines.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{philippines.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{philippines.description}</p>

      {/* Highlights */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {philippines.highlights.map((h, index) => {
          const Icon = ICON_MAP[h.icon] ?? Globe;
          const isGold = index % 3 === 1;
          return (
            <div
              key={h.id}
              className={`overflow-hidden rounded-2xl border ${isGold ? "border-gold/20 bg-gold/4" : "border-auf-border bg-white"}`}
            >
              <div
                className="flex items-center gap-3 px-5 py-3.5"
                style={{ backgroundColor: isGold ? "var(--auf-gold)" : "var(--auf-navy)" }}
              >
                <Icon className="h-4 w-4 shrink-0 text-white" strokeWidth={1.75} />
                <h3 className="font-display text-sm font-semibold text-white">{h.label}</h3>
              </div>
              <p className="px-5 py-4 text-xs leading-relaxed text-auf-muted">{h.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Cost breakdown table */}
      <div>
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
          {philippines.costBreakdown.title}
        </p>
        <div className="overflow-hidden rounded-xl border border-auf-border">
          <table className="w-full text-sm">
            <thead className="border-b border-auf-border bg-off-white">
              <tr>
                {["Category", "Low Estimate", "High Estimate"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {philippines.costBreakdown.items.map((item, i) => (
                <tr key={i} className="border-b border-auf-border last:border-0 hover:bg-off-white/60">
                  <td className="px-4 py-3 text-sm font-medium text-navy">{item.category}</td>
                  <td className="px-4 py-3 text-sm text-auf-muted">
                    PHP {item.low}
                    <span className="ml-1 text-[10px] text-auf-muted/50">{item.unit}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-auf-muted">
                    PHP {item.high}
                    <span className="ml-1 text-[10px] text-auf-muted/50">{item.unit}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-auf-muted/60">{philippines.costBreakdown.note}</p>
      </div>
    </section>
  );
}
