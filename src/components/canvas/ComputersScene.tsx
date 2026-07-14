"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import CanvasLoader from "./CanvasLoader";

const MODEL_URL = "/models/desktop_pc/model.glb";

function Computers({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF(MODEL_URL);

  return (
    <group>
      <hemisphereLight intensity={2.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
      />
      <pointLight intensity={1} />
      <primitive
        object={scene}
        // Non-uniform on desktop: narrower width (Z) than height (Y) so the
        // default sits clear of the text. Uniform on mobile.
        scale={
          isMobile ? 0.52 : ([0.7, 0.7, 0.58] as [number, number, number])
        }
        position={isMobile ? [0, -2, -1.5] : [0, -2.6, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

/**
 * Hero desktop-PC model. Renders on-demand (`frameloop="demand"`): one render
 * after load, plus renders while the user drags to orbit or scrolls to zoom —
 * no continuous render loop. Lights are fixed in world space, so the lit side
 * of the PC shifts naturally as you rotate the camera around it.
 */
export default function ComputersScene() {
  // Match the Hero container's own `lg` breakpoint (see Hero.tsx), not the
  // generic 767px "is this a phone" check — the container is still in its
  // mobile bottom-band shape all the way up to 1024px, so the model's
  // scale/position must switch at the same point or it renders mis-scaled
  // for the whole tablet range.
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          makeDefault
          enableZoom
          enablePan={false}
          // Zoom range around the best-fit default (~20.8): zoom in a little
          // (→ 18, capped so it can't grow into the layout) and out more
          // (→ 36) so it can shrink noticeably smaller.
          minDistance={18}
          maxDistance={36}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
          target={[0, -1.2, 0]}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
