import type { ResearchVisionMission } from "@/data/research";

export function ResearchVisionMission({ vm }: { vm: ResearchVisionMission }) {
  return (
    <section id="vision-mission" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {vm.eyebrow}
      </p>
      <h2 className="mb-10 font-display text-2xl font-light text-navy md:text-3xl">{vm.title}</h2>

      {/* Dark cards matching External Affairs pattern */}
      <div className="grid gap-6 lg:grid-cols-2">
        {[
          { label: "Vision", text: vm.vision, italic: true },
          { label: "Mission", text: vm.mission, italic: false },
        ].map(({ label, text, italic }) => (
          <div key={label} className="overflow-hidden rounded-2xl bg-navy p-7 md:p-8">
            <div className="mb-4 h-0.5 w-8 bg-gold" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{label}</p>
            <p className={`leading-relaxed text-white/80 md:text-base ${italic ? "font-display text-base font-light italic" : "text-sm"}`}>
              {italic ? `"${text}"` : text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
