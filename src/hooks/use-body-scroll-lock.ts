"use client";

import { useEffect } from "react";

/**
 * Locks `document.body` scroll when `locked` is true.
 * Restores the original overflow on unmount.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}
