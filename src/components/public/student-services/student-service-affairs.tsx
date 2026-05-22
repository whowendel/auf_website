"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StudentAffairsOffice, OfficeItem, ServiceGroup } from "@/data/student-services";
import { OfficeHeader } from "./_office-header";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AccordionItem({
  item,
  brandColor,
  isOpen,
  onToggle,
  index,
}: {
  item: OfficeItem;
  brandColor: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl border transition-all"
      style={{
        borderColor: isOpen ? brandColor : "var(--auf-border)",
        background: isOpen ? `${brandColor}05` : "white",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start gap-4 px-5 py-4 text-left"
      >
        <span
          className="shrink-0 font-display text-2xl font-bold tabular-nums leading-none"
          style={{ color: isOpen ? brandColor : `${brandColor}35` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-1 items-center justify-between gap-4">
          <span className="text-sm font-semibold text-navy md:text-base">{item.heading}</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="shrink-0 text-xl leading-none"
            style={{ color: brandColor }}
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="border-t px-5 pb-5 pt-4 pl-15" style={{ borderColor: `${brandColor}20` }}>
              {item.body && (
                <p className="mb-3 text-sm leading-relaxed text-auf-muted">{item.body}</p>
              )}
              {item.bullets.length > 0 && (
                <ul className="space-y-2">
                  {item.bullets.map((bullet: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-auf-muted">
                      <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: brandColor }} />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function StudentAffairsSection({
  office,
  group,
  isFirst,
}: {
  office: StudentAffairsOffice;
  group: ServiceGroup;
  isFirst: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id={office.id}
      className={`scroll-mt-32 pb-14 ${isFirst ? "pt-2" : "border-t border-auf-border pt-14"}`}
    >
      <OfficeHeader office={office} group={group} />
      <div className="space-y-3">
        {office.items.map((item: OfficeItem, i: number) => (
          <AccordionItem
            key={item.id}
            item={item}
            brandColor={group.brandColor}
            index={i}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
          />
        ))}
      </div>
    </section>
  );
}
