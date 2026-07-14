@AGENTS.md

# Portfolio project notes

3D portfolio: **Next.js 16 (App Router) + TS + Tailwind v4 + react-three-fiber**.
A performance-focused rebuild of the old Vite site `PrakashNpn/personal_portfolio`.

## Where things are
- **All site copy/data:** `src/content/site.ts` (single source of truth, typed via `src/types/content.ts`). Edit this, not the components.
- **Sections:** `src/components/sections/*` — Hero, About, Experience (custom timeline), Tech, Works, Contact.
- **3D:** `src/components/canvas/*Scene.tsx` are the raw `<Canvas>` scenes; `canvas/index.tsx` wraps each in `next/dynamic({ssr:false})` + the `Lazy3D` gate.
- **Theme tokens:** `src/app/globals.css` (`--color-primary #050816`, etc.).

## Performance rules (do not regress)
- **Never add a new `<Canvas>` per item.** Tech balls all share ONE canvas (`BallsScene`). Keep concurrent WebGL contexts ≤ ~2.
- All 3D must go through `Lazy3D` (in-view mount/unmount) + `next/dynamic ssr:false`.
- Models are **meshopt** `.glb` under `public/models/*/model.glb` (decoded by drei's bundled decoder). Re-compress with `npx @gltf-transform/cli optimize ... --compress meshopt --texture-compress webp`.
- SVGs via `next/image` require `dangerouslyAllowSVG` (already set in `next.config.ts`).

## Verify
`npm run build` must pass. For visual/perf checks, drive with headless Chrome +
`--enable-unsafe-swiftshader --use-angle=swiftshader-webgl` (software WebGL renders
geometry but not always Decals — that's a headless-only limitation).
