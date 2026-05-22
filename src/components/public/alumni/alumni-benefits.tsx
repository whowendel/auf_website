import {
  BookOpen,
  Briefcase,
  Users,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import type { AlumniBenefits } from "@/data/alumni";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Briefcase,
  Users,
  GraduationCap,
};

export function AlumniBenefits({ benefits }: { benefits: AlumniBenefits }) {
  return (
    <section id="alumni-benefits" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {benefits.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{benefits.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{benefits.description}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        {benefits.categories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] ?? BookOpen;
          const isGold = cat.color === "gold";
          return (
            <div
              key={cat.id}
              className="overflow-hidden rounded-2xl border border-auf-border bg-white"
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ backgroundColor: isGold ? "var(--auf-gold)" : "var(--auf-navy)" }}
              >
                <Icon className="h-4 w-4 shrink-0 text-white" strokeWidth={1.75} />
                <h3 className="font-display text-sm font-semibold text-white">{cat.title}</h3>
              </div>

              {/* Items */}
              <ul className="space-y-2.5 px-5 py-4">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-auf-muted">
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: isGold ? "var(--auf-gold)" : "var(--auf-navy)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
