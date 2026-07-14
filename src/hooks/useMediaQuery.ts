"use client";

import { useEffect, useState } from "react";

/** Subscribes to a CSS media query, SSR-safe (returns `false` on the server). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on small screens (phones) — used to swap 3D for static fallbacks. */
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");

/** Respects the OS "reduce motion" accessibility setting. */
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
