import { activeColleges, university } from "@/data/colleges";

const STATS = [
  { value: String(university.founded), label: "Year Founded" },
  { value: university.accreditation,   label: "Accreditation" },
  { value: String(activeColleges.length), label: "Colleges & Schools" },
  { value: "30+",                       label: "Degree Programs" },
] as const;

export function StatsBar() {
  return (
    <div className="bg-[var(--auf-navy)]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-7 text-center">
              <div className="font-display text-2xl font-semibold text-[var(--auf-gold-light)] md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
