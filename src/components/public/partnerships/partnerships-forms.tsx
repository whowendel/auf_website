import type { PartnershipsForms } from "@/data/partnerships";

export function PartnershipsForms({ forms }: { forms: PartnershipsForms }) {
  return (
    <section id="forms" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {forms.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">
        {forms.title}
      </h2>
      <p className="mb-10 text-sm leading-relaxed text-auf-muted">
        {forms.description}
      </p>

      {/* Desktop Table Layout */}
      <div className="hidden overflow-hidden rounded-2xl border border-auf-border bg-white shadow-sm md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-auf-border bg-navy/5 text-xs font-bold uppercase tracking-wider text-navy">
              <th className="px-6 py-4 w-64">Form</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 w-48">Link</th>
              <th className="px-6 py-4 w-36 text-center">QR Code</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-auf-border text-auf-muted">
            {forms.downloadableForms.map((form) => {
              const hasUrl = !!form.fileUrl;
              return (
                <tr key={form.id} className="hover:bg-navy/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-navy text-xs leading-snug">
                    {form.name}
                  </td>
                  <td className="px-6 py-4 text-xs leading-relaxed">
                    {form.description}
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-gold">
                    {hasUrl ? (
                      <a
                        href={form.fileUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-navy font-bold"
                      >
                        {form.fileUrl!.replace("https://", "")}
                      </a>
                    ) : (
                      <span className="text-auf-muted/50 italic">TBA</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {hasUrl ? (
                      <div className="inline-block border border-auf-border p-1 bg-white rounded shadow-sm">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(form.fileUrl!)}`}
                          alt={`${form.name} QR Code`}
                          width={64}
                          height={64}
                          className="block mx-auto"
                        />
                      </div>
                    ) : (
                      <span className="text-auf-muted/50 text-[10px] font-semibold uppercase">TBA</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {forms.downloadableForms.map((form) => {
          const hasUrl = !!form.fileUrl;
          return (
            <div key={form.id} className="rounded-xl border border-auf-border bg-white p-4 shadow-sm space-y-3">
              <div>
                <h4 className="font-display text-sm font-bold text-navy">{form.name}</h4>
                <p className="mt-1 text-xs text-auf-muted leading-relaxed">{form.description}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-auf-border">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-navy/40">Link</p>
                  {hasUrl ? (
                    <a
                      href={form.fileUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-navy hover:underline"
                    >
                      Open Form
                    </a>
                  ) : (
                    <span className="text-xs text-auf-muted/50 italic">TBA</span>
                  )}
                </div>
                {hasUrl && (
                  <div className="border border-auf-border p-0.5 bg-white rounded">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(form.fileUrl!)}`}
                      alt="QR Code"
                      width={48}
                      height={48}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 rounded-xl border border-auf-border bg-off-white px-5 py-3.5 text-xs leading-relaxed text-auf-muted">
        <span className="font-semibold text-navy">Submission: </span>{forms.submissionNote}
      </p>
    </section>
  );
}
