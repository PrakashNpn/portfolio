"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is within (or near) the viewport.
 * Used to mount/unmount heavy WebGL canvases so off-screen 3D
 * scenes don't consume GPU/CPU — a key performance safeguard.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { rootMargin: "200px" },
  once = false
) {
  const ref = useRef<T | null>(null);
  // Must start `false` on both server and client — a lazy initializer keyed
  // on `typeof IntersectionObserver` would differ between the Node.js SSR
  // pass (no such global) and the browser, causing a hydration mismatch.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return { ref, inView };
}
