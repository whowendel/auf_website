"use client";

import { useState, useEffect } from "react";

/**
 * Tracks which section ID is currently in the viewport using IntersectionObserver.
 * Uses a negative top margin so the section is considered "active" slightly before
 * it reaches the top — useful for sidebar navigation.
 *
 * @param ids      Ordered list of section element IDs to observe.
 * @param topOffset Pixels from the top where the intersection fires (default 160).
 */
export function useActiveSection(ids: string[], topOffset = 160): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const rootMargin = `-${topOffset}px 0px -40% 0px`;

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids.join(","), topOffset]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
