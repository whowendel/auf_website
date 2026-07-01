import type { PartnershipsGuidelines } from "@/data/partnerships";

export function PartnershipsGuidelines({ guidelines }: { guidelines: PartnershipsGuidelines }) {
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
                  <p className="text-xs leading-relaxed text-auf-muted whitespace-pre-line">
                    {step.details}
                  </p>
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
            <div className="px-4 py-3 space-y-2">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-navy/40">Office</p>
                <p className="text-xs font-semibold text-navy">{step.office}</p>
                <p className="text-[11px] text-auf-muted">{step.personInCharge}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-navy/40">Details</p>
                <p className="text-xs leading-relaxed text-auf-muted whitespace-pre-line">{step.details}</p>
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
