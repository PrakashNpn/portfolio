"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { CanvasBoundary } from "./CanvasBoundary";

type Lazy3DProps = {
  /** The (typically dynamically-imported) 3D canvas to mount when eligible. */
  children: ReactNode;
  className?: string;
  /** Rendered on phones / reduced-motion instead of the 3D scene. */
  staticFallback?: ReactNode;
  /** Swap 3D for `staticFallback` on small screens. Default: true. */
  disableOnMobile?: boolean;
  /** Extra margin around the viewport before mounting. */
  rootMargin?: string;
  /** Once mounted, never unmount again on scroll-away. Use for a canvas the
   *  visitor is likely to scroll back to often (e.g. the Hero PC) so
   *  re-entering the viewport doesn't re-trigger a visible load/pop-in. */
  once?: boolean;
};

/**
 * Gates an expensive WebGL scene so it only mounts when:
 *   1. the container is on (or near) screen — via IntersectionObserver, and
 *   2. the visitor hasn't requested reduced motion, and
 *   3. (optionally) we're not on a small/mobile screen.
 *
 * This is the primary defense against the original site's slowdown: canvases
 * never render while off-screen, and low-power contexts get a static fallback.
 */
export function Lazy3D({
  children,
  className,
  staticFallback = null,
  disableOnMobile = true,
  rootMargin = "150px",
  once = false,
}: Lazy3DProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin }, once);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const useStatic = reduced || (disableOnMobile && isMobile);

  return (
    <div ref={ref} className={className}>
      {useStatic ? (
        staticFallback
      ) : inView ? (
        <CanvasBoundary fallback={staticFallback}>{children}</CanvasBoundary>
      ) : null}
    </div>
  );
}
