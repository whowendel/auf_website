/**
 * Reusable downloadable-forms list.
 *
 * Used by: Research > Services & Support, Research > Grants,
 *          Research > Faculty Directory, and any future page with form downloads.
 *
 * When `fileUrl` is null the item renders in a "coming soon" disabled state.
 */

export type DownloadableForm = {
  id: string;
  name: string;
  description?: string;
  fileUrl: string | null;
  /** Shown as a badge, e.g. "PDF", "DOCX". Defaults to "PDF". */
  fileType?: string;
};

type Props = {
  forms: DownloadableForm[];
  accentColor?: string;
};

export function DownloadableFormList({
  forms,
  accentColor = "var(--auf-navy)",
}: Props) {
  return (
    <ul className="space-y-2">
      {forms.map((form) => {
        const available = !!form.fileUrl;
        const content = (
          <div className="flex items-start gap-3">
            {/* File icon / type badge */}
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold uppercase tracking-wide"
              style={{
                background: available ? `${accentColor}12` : "var(--auf-border)",
                color: available ? accentColor : "var(--auf-muted)",
              }}
            >
              {form.fileType ?? "PDF"}
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p
                className="text-sm font-semibold leading-snug"
                style={{ color: available ? "var(--auf-navy)" : "var(--auf-muted)" }}
              >
                {form.name}
              </p>
              {form.description && (
                <p className="mt-0.5 text-xs leading-relaxed text-auf-muted">
                  {form.description}
                </p>
              )}
              {!available && (
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-auf-muted/60">
                  Coming soon
                </p>
              )}
            </div>

            {/* Download arrow */}
            {available && (
              <span
                className="mt-0.5 shrink-0 text-sm font-bold transition-transform group-hover:translate-y-0.5"
                style={{ color: accentColor }}
              >
                ↓
              </span>
            )}
          </div>
        );

        return (
          <li key={form.id}>
            {available ? (
              <a
                href={form.fileUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center rounded-xl border border-auf-border bg-white p-4 transition-all hover:border-current hover:shadow-sm"
                style={{ ["--hover-color" as string]: accentColor } as React.CSSProperties}
              >
                {content}
              </a>
            ) : (
              <div className="flex items-center rounded-xl border border-dashed border-auf-border bg-off-white p-4 opacity-60 cursor-not-allowed">
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
