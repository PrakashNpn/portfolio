# Thi Han — Portfolio

A performance-focused rebuild of my space-themed 3D portfolio, using
**Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + react-three-fiber**.

It keeps the original 3D centerpiece (the floating desktop PC) but replaces
everything else that used to be its own WebGL scene — the star field, the
per-tech-skill "balls," the rotating Earth — with lighter, cheaper effects
(a 2D canvas neural-mesh background, plain skill badges, a direct-contact
panel). There's also a Claude-powered "Ask my AI" assistant grounded in the
site's own content, answering visitor questions about my work.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## ✏️ Editing your content

**Everything you'll want to change lives in one file:** [`src/content/site.ts`](src/content/site.ts).

It holds your profile, social links, hero words, skill groups, experience,
projects, and the "How I build with AI" content — all typed.

- **Images** live in [`public/`](public/) (`company/`, `services/`, `profile/`,
  `icons/`). Reference them by path, e.g. `/company/mmRoute.png`.
- **Resume**: replace [`public/resume.pdf`](public/resume.pdf) with your latest CV.
- **Colors / theme**: the dark-space palette is defined as tokens in
  [`src/app/globals.css`](src/app/globals.css) (`--color-primary`, etc.).

## 📬 Contact form (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com/) (client-side, no server).
Copy `.env.local.example` → `.env.local` and fill in:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

Without keys the form still renders and shows a friendly "not configured" message.

## 🤖 "Ask my AI" assistant (Claude)

A floating chat widget answers visitor questions about my work, grounded
only in `src/content/site.ts` (it's instructed not to invent facts). Get a
key at [console.anthropic.com](https://console.anthropic.com/) and add it
to `.env.local`:

```
ANTHROPIC_API_KEY=...
```

Server-side only (no `NEXT_PUBLIC_` prefix — never sent to the browser). Uses
`claude-haiku-4-5` with a soft per-IP rate limit. Without a key the widget
shows a friendly "not switched on yet" message instead of erroring.

## ⚡ Performance architecture

The old site created **~16 separate WebGL contexts** (a full-screen star field,
the hero PC, **one canvas per tech skill**, and the Earth globe ×2) that all
rendered continuously — which is what made it hang in production. This
rebuild fixes that:

| Fix | Where |
| --- | --- |
| Down to **one** live WebGL context, total (verified) | `components/canvas/ComputersScene.tsx` |
| Background "starfield" is a plain 2D `<canvas>`, not WebGL | `canvas/NeuralNetwork.tsx` |
| Skills are static badges, not one 3D ball each | `sections/Tech.tsx` |
| Canvas mounts only when on-screen (IntersectionObserver), stays mounted after first view so scrolling back doesn't re-trigger a load | `hooks/useInView.ts` + `canvas/Lazy3D.tsx` |
| 3D code-split (`next/dynamic`, `ssr:false`) — three.js off the server bundle | `canvas/index.tsx` |
| Static fallback on `prefers-reduced-motion` | `Lazy3D` |
| Error boundary → static fallback instead of a crash | `canvas/CanvasBoundary.tsx` |
| Meshopt-compressed PC model | `public/models/desktop_pc/model.glb` |
| Background texture re-compressed: **0.58 MB → 0.22 MB** webp | `public/background.webp` |

### Re-compressing 3D models

Models are meshopt-compressed `.glb` (decoded by drei's bundled `MeshoptDecoder`,
no external CDN). To re-optimize a new model:

```bash
npx @gltf-transform/cli optimize input.gltf public/models/foo/model.glb \
  --compress meshopt --texture-compress webp --texture-size 1024
```

## Project structure

```
src/
├── app/
│   ├── api/chat/route.ts   streaming endpoint for the AI assistant (Anthropic SDK)
│   └── layout.tsx, page.tsx, globals.css
├── content/site.ts         SINGLE source of truth for all copy/data
├── components/
│   ├── sections/   Hero, About, Experience, Tech, AiWorkflow, Works, Contact
│   ├── canvas/     ComputersScene (the one WebGL canvas) + NeuralNetwork (2D
│   │               background) + Lazy3D gate / CanvasBoundary
│   └── ui/         Navbar, Footer, AiAssistant, ResumeModal, CtaButton,
│                   DecodeText, Typewriter, SectionWrapper
├── hooks/          useInView, useMediaQuery (useIsMobile / prefers-reduced-motion)
├── lib/            assistant.ts (AI system prompt), motion.ts, styles.ts
└── types/          content.ts
```

## Deploy

Deploy to [Vercel](https://vercel.com): push to GitHub, import the repo, add
the `NEXT_PUBLIC_EMAILJS_*` and `ANTHROPIC_API_KEY` env vars in the project's
Settings → Environment Variables (`.env.local` never leaves your machine),
and set `SITE_URL` in [`src/app/layout.tsx`](src/app/layout.tsx) to your
domain (for OG/canonical tags).
