import { ShieldAlert } from "lucide-react";
import type { IntlVisa } from "@/data/international-students";

export function IntlVisa({ visa }: { visa: IntlVisa }) {
  return (
    <section id="visa-immigration" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {visa.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{visa.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{visa.description}</p>

      {/* Timeline steps */}
      <div className="relative mb-10">
        {/* Vertical connector */}
        <div className="absolute left-[19px] top-6 bottom-6 w-px bg-auf-border" aria-hidden />

        <ol className="space-y-6">
          {visa.steps.map((step) => (
            <li key={step.id} className="relative flex items-start gap-5">
              {/* Step number */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-white font-display text-sm font-bold text-navy">
                {step.step}
              </div>

              {/* Content */}
              <div className="flex-1 rounded-xl border border-auf-border bg-white px-5 py-4">
                <h3 className="mb-1 font-display text-sm font-semibold text-navy">{step.title}</h3>
                <p className="text-xs leading-relaxed text-auf-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Important notes */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
        <div className="mb-3 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600" strokeWidth={2} />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
            Important Reminders
          </p>
        </div>
        <ul className="space-y-2">
          {visa.importantNotes.map((note, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-amber-800/80">
              <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {note}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-xs text-auf-muted/70">
        {visa.contactNote}
      </p>
    </section>
  );
}
