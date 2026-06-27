"use client";

import { useState, useRef, useEffect } from "react";
import { SDG_LIST } from "@/data/sdgs";
import { cn } from "@/lib/utils";

type SdgSelectProps = {
  selectedSdgs: number[];
  onChange: (sdgs: number[]) => void;
};

export function SdgSelect({ selectedSdgs, onChange }: SdgSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSdg = (num: number) => {
    if (selectedSdgs.includes(num)) {
      onChange(selectedSdgs.filter((n) => n !== num));
    } else {
      onChange([...selectedSdgs, num].sort((a, b) => a - b));
    }
  };

  const selectNone = () => {
    onChange([]);
  };

  const isNoneSelected = selectedSdgs.length === 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full min-h-[40px] items-center justify-between rounded-md border border-auf-border bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 cursor-pointer"
      >
        {isNoneSelected ? (
          <span className="text-neutral-500">N/A (Not Applicable)</span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {selectedSdgs.map((num) => {
              const sdg = SDG_LIST.find((s) => s.number === num);
              return (
                <span
                  key={num}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm"
                  style={{ backgroundColor: sdg?.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  SDG {num}
                </span>
              );
            })}
          </div>
        )}
        <span className="text-neutral-400 text-xs ml-2 select-none">▼</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 rounded-md border border-neutral-200 bg-white shadow-lg py-1 max-h-60 overflow-y-auto">
          {/* N/A Option */}
          <button
            type="button"
            onClick={() => {
              selectNone();
              setIsOpen(false);
            }}
            className={cn(
              "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 text-left cursor-pointer",
              isNoneSelected && "bg-neutral-50 font-semibold"
            )}
          >
            <input
              type="checkbox"
              checked={isNoneSelected}
              readOnly
              className="rounded text-navy focus:ring-navy pointer-events-none"
            />
            <span className="inline-block w-3 h-3 rounded-full bg-neutral-300 shrink-0" />
            <span>N/A (Not Applicable)</span>
          </button>

          {/* SDG Options */}
          {SDG_LIST.map((sdg) => {
            const isChecked = selectedSdgs.includes(sdg.number);
            return (
              <button
                key={sdg.number}
                type="button"
                onClick={() => toggleSdg(sdg.number)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 text-left cursor-pointer",
                  isChecked && "bg-neutral-50 font-semibold"
                )}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="rounded text-navy focus:ring-navy pointer-events-none shrink-0"
                />
                <span
                  className="inline-block w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: sdg.color }}
                />
                <span className="truncate">
                  SDG {sdg.number}: {sdg.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
