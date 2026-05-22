import type { OfficeBase, ServiceGroup } from "@/data/student-services";

/** Common section header used at the top of every office section. */
export function OfficeHeader({
  office,
  group,
}: {
  office: Pick<OfficeBase, "label" | "tagline">;
  group: Pick<ServiceGroup, "groupLabel" | "brandColor">;
}) {
  return (
    <div className="mb-8">
      <p
        className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: group.brandColor }}
      >
        {group.groupLabel}
      </p>
      <h3 className="font-display text-xl font-semibold text-[var(--auf-navy)] md:text-2xl">
        {office.label}
      </h3>
      {office.tagline && (
        <p className="mt-2 text-sm italic leading-relaxed text-[var(--auf-muted)]">
          {office.tagline}
        </p>
      )}
    </div>
  );
}
