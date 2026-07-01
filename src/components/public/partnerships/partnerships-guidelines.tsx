import type { PartnershipsGuidelines } from "@/data/partnerships";

export function PartnershipsGuidelines({ guidelines }: { guidelines: PartnershipsGuidelines }) {
  // Custom parser to format details lines and dynamically inject buttons and notice boxes
  function renderStepDetails(detailsText: string) {
    const lines = detailsText.split("\n");
    return (
      <div className="space-y-2">
        {lines.map((line, index) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          // Check if it is a link to Contact Us instruction
          if (trimmed.startsWith("*Link to CONTACT US")) {
            return (
              <div key={index} className="pt-1.5">
                <a
                  href="/external-affairs/connect"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-gold/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-dark hover:bg-gold hover:text-white transition-all shadow-sm group"
                >
                  Contact Us
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            );
          }

          // Check if it is a link to Form instruction
          if (trimmed.startsWith("*Link the Form to")) {
            return (
              <div key={index} className="pt-1.5">
                <a
                  href="#forms"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-navy/10 bg-navy/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-navy hover:bg-navy hover:text-white transition-all shadow-sm group"
                >
                  Go to Forms
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            );
          }

          // Check if it is a note/disclaimer (starts with asterisk)
          if (trimmed.startsWith("*")) {
            return (
              <div
                key={index}
                className="mt-2 rounded-lg border border-auf-border bg-off-white p-3 text-xs leading-relaxed text-auf-muted shadow-sm"
              >
                <span className="font-bold uppercase tracking-wider text-[9px] block mb-1 text-navy/70">
                  Notice / Disclaimer
                </span>
                {trimmed.substring(1).trim()}
              </div>
            );
          }

          // Regular details text
          return (
            <p key={index} className="text-xs leading-relaxed text-auf-muted">
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  }

  return (
    <section id="guidelines" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {guidelines.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">
        {guidelines.title}
      </h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">
        {guidelines.description}
      </p>

      {/* Process flow */}
      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
        Partnership Establishment Process
      </p>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-auf-border md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-auf-border bg-off-white">
            <tr>
              {["Step", "Title", "Office / Person in Charge", "Details"].map((h) => (
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
            {guidelines.flow.map((step, i) => (
              <tr
                key={step.id}
                className={`border-b border-auf-border last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-off-white/50"}`}
              >
                {/* Step number */}
                <td className="px-4 py-4 w-16">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                    {step.step}
                  </span>
                </td>

                {/* Title */}
                <td className="px-4 py-4 w-52">
                  <span className="font-display text-sm font-semibold text-navy">
                    {step.title}
                  </span>
                </td>

                {/* Office / Person in Charge */}
                <td className="px-4 py-4 w-60">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold text-navy leading-snug">
                      {step.office}
                    </p>
                    <p className="text-[11px] text-auf-muted">
                      {step.personInCharge}
                    </p>
                  </div>
                </td>

                {/* Details */}
                <td className="px-4 py-4">
                  {renderStepDetails(step.details)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {guidelines.flow.map((step) => (
          <div key={step.id} className="overflow-hidden rounded-xl border border-auf-border bg-white">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-auf-border bg-off-white px-4 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy font-display text-xs font-bold text-white">
                {step.step}
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-navy">
                  {step.title}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-4 py-3 space-y-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-navy/40">Office</p>
                <p className="text-xs font-semibold text-navy">{step.office}</p>
                <p className="text-[11px] text-auf-muted">{step.personInCharge}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-navy/40">Details</p>
                <div className="mt-1">
                  {renderStepDetails(step.details)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-6 rounded-xl border border-auf-border bg-off-white px-5 py-3.5 text-xs leading-relaxed text-auf-muted">
        <span className="font-semibold text-navy">Inquiries: </span>{guidelines.contactNote}
      </p>
    </section>
  );
}
