"use client";

import { useEffect, useRef } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Node = { x: number; y: number; vx: number; vy: number };
type Pulse = { a: number; b: number; t: number; speed: number };

/**
 * Full-page "neural network" backdrop: drifting nodes wired to their nearest
 * neighbours, with the occasional signal pulse travelling an edge and a soft
 * halo that follows the cursor. It reads as machine intelligence rather than a
 * star field, while staying cheap: a single 2D canvas (no WebGL context),
 * DPR pinned to 1, and a ~30fps cap. Reduced-motion users get one static frame.
 */
export default function NeuralNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const MAX_DIST = isMobile ? 150 : 200; // connection reach
    const MAX_PULSES = isMobile ? 3 : 8;
    const dpr = 1; // faint background — DPR 1 is imperceptible and much cheaper

    let w = 0;
    let h = 0;
    const nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      // A calm field of drifting dots (no always-on web), scaled to the
      // viewport so it isn't too sparse on large / HiDPI screens.
      const nodeCount = Math.max(
        30,
        Math.min(isMobile ? 55 : 120, Math.round((w * h) / 15000))
      );
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
        });
      }
    };

    const nearestNeighbour = (i: number) => {
      let best = -1;
      let bestD = MAX_DIST;
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      }
      return best;
    };

    const spawnPulse = () => {
      const a = (Math.random() * nodes.length) | 0;
      const b = nearestNeighbour(a);
      if (b === -1) return;
      pulses.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.01 });
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);

      // No always-on node-to-node web: the nodes just drift as dots, and
      // connections form only around the cursor as it moves (below).

      // Cursor halo: wire nearby nodes to the pointer. Kept soft — a low floor
      // lets each line fade seamlessly to nothing at the edge of range instead
      // of snapping in, so the connections feel gentle rather than harsh.
      if (!isMobile && mouse.x > -9998) {
        const R = 190;
        ctx.shadowColor = "rgba(70,240,205,0.5)";
        ctx.shadowBlur = 2; // faint glow only
        for (let i = 0; i < nodes.length; i++) {
          const d = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
          if (d < R) {
            ctx.strokeStyle = `rgba(80,240,205,${0.08 + (1 - d / R) * 0.34})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        // Small soft glow at the cursor itself to anchor the connections.
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 6);
        cg.addColorStop(0, "rgba(80,240,205,0.55)");
        cg.addColorStop(1, "rgba(80,240,205,0)");
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fill();
        // Reset shadow so it doesn't bleed onto the nodes / pulses drawn next.
        ctx.shadowBlur = 0;
      }

      // Nodes.
      for (const n of nodes) {
        ctx.fillStyle = "rgba(196,181,255,0.95)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      // Signal pulses travelling along an edge.
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) {
          p.t = 1;
          continue;
        }
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 6);
        g.addColorStop(0, "rgba(196,181,255,0.9)");
        g.addColorStop(1, "rgba(0,206,168,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    init();

    // Reduced motion: render a single static frame, no loop.
    if (reduced) {
      drawFrame();
      const onResizeStatic = () => {
        resize();
        init();
        drawFrame();
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    let raf = 0;
    let last = 0;
    let sinceSpawn = 0;
    const FPS = 30;

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 1000 / FPS) return;
      const dt = t - last;
      last = t;

      // Drift nodes, bounce off edges.
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Advance / retire pulses; spawn new ones on a cadence.
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed;
        if (pulses[i].t >= 1) pulses.splice(i, 1);
      }
      sinceSpawn += dt;
      if (sinceSpawn > 650 && pulses.length < MAX_PULSES) {
        sinceSpawn = 0;
        spawnPulse();
      }

      drawFrame();
    };

    const onResize = () => {
      resize();
      init();
    };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", onMouseLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
    };
  }, [reduced, isMobile]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
