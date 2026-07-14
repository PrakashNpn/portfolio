"use client";

import dynamic from "next/dynamic";
import { Lazy3D } from "./Lazy3D";

/** Small inline spinner shown while a 3D chunk downloads. */
function ChunkSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="canvas-loader" />
    </div>
  );
}

/* Each scene is code-split (ssr:false keeps three.js out of the server bundle)
   and only mounts when the Lazy3D gate says it's eligible. */

const ComputersScene = dynamic(() => import("./ComputersScene"), {
  ssr: false,
  loading: ChunkSpinner,
});

export function ComputersCanvas({ className }: { className?: string }) {
  // Kept on mobile too (model is Draco-compressed) — it's the signature visual.
  // `once`: this is the only WebGL canvas on the site and visitors scroll back
  // to Hero often, so keep it mounted after first load instead of tearing
  // down and re-creating the context (and re-showing the loader) every time
  // it scrolls out of view.
  return (
    <Lazy3D className={className} disableOnMobile={false} rootMargin="300px" once>
      <ComputersScene />
    </Lazy3D>
  );
}
