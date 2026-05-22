import type { AlumniAssociation } from "@/data/alumni";

export function AlumniAssociation({ association }: { association: AlumniAssociation }) {
  return (
    <section id="alumni-association" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {association.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{association.title}</h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">{association.description}</p>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Objectives */}
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">Objectives</p>
          <ol className="space-y-3">
            {association.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-sm leading-relaxed text-auf-muted">{obj}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Board of Directors */}
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40">
            {association.board.title}
          </p>
          <div className="space-y-2">
            {association.board.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-xl border border-auf-border bg-white px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-navy">{member.name}</p>
                  <p className="text-[11px] text-auf-muted">{member.college} · Batch {member.batch}</p>
                </div>
                <span className="rounded-full bg-navy/8 px-3 py-1 text-[10px] font-semibold text-navy">
                  {member.position}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-5 rounded-xl border border-auf-border bg-off-white px-4 py-3.5 text-xs leading-relaxed text-auf-muted">
            <span className="font-semibold text-navy">Membership: </span>
            {association.membershipNote}
          </p>
        </div>
      </div>
    </section>
  );
}
