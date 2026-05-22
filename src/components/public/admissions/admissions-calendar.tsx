"use client";

import { useState } from "react";
import type { AdmissionsCalendar } from "@/data/admissions";

export function AdmissionsCalendar({ calendar }: { calendar: AdmissionsCalendar }) {
  const [activeSemester, setActiveSemester] = useState(calendar.semesters[0]?.id ?? "");
  const active = calendar.semesters.find((s) => s.id === activeSemester) ?? calendar.semesters[0];

  return (
    <section id="academic-calendar" className="scroll-mt-32 border-b border-auf-border py-14">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
        {calendar.eyebrow}
      </p>
      <h2 className="mb-4 font-display text-2xl font-light text-navy md:text-3xl">{calendar.title}</h2>
      <p className="mb-8 text-sm leading-relaxed text-auf-muted">{calendar.description}</p>

      {/* Semester tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {calendar.semesters.map((sem) => (
          <button
            key={sem.id}
            type="button"
            onClick={() => setActiveSemester(sem.id)}
            className="shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all"
            style={{
              background: activeSemester === sem.id ? "var(--auf-navy)" : "white",
              borderColor: activeSemester === sem.id ? "var(--auf-navy)" : "var(--auf-border)",
              color: activeSemester === sem.id ? "white" : "var(--auf-muted)",
            }}
          >
            {sem.name}
            <span className="ml-1.5 opacity-60">({sem.period})</span>
          </button>
        ))}
      </div>

      {/* Event table */}
      {active && (
        <div className="overflow-hidden rounded-xl border border-auf-border">
          <table className="w-full text-sm">
            <thead className="border-b border-auf-border bg-off-white">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50">Event</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50 w-36">Date</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50 hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {active.events.map((evt) => (
                <tr key={evt.id} className="border-b border-auf-border last:border-0">
                  <td className="px-4 py-3 font-medium text-navy">{evt.event}</td>
                  <td className="px-4 py-3 font-mono text-xs text-auf-muted">{evt.date || "TBA"}</td>
                  <td className="hidden px-4 py-3 text-xs text-auf-muted/70 sm:table-cell">{evt.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 rounded-lg border border-auf-border bg-off-white px-4 py-3 text-xs text-auf-muted">
        <span className="font-semibold text-navy">Note: </span>
        {calendar.note}
      </p>
    </section>
  );
}
