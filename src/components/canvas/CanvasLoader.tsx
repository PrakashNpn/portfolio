"use client";

import { Html, useProgress } from "@react-three/drei";

/** Spinner + percentage shown inside a Canvas while 3D assets load. */
export default function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="canvas-loader" />
      <p
        style={{
          fontSize: 14,
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(0)}%
      </p>
    </Html>
  );
}
