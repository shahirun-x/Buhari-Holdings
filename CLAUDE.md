# CLAUDE.md — Buhari Holdings site

## Project
Next.js 15 App Router portfolio for Buhari Holdings, a Chennai-based conglomerate
(founded 1989). Design inspired by tata.com but with an editorial/heritage tone.

## Stack
Next.js 15, TypeScript strict, Tailwind v4, shadcn/ui, Framer Motion, Lenis smooth
scroll, next/font (self-hosted), next/image everywhere, react-hook-form + zod.

## Design tokens (never hardcode colors/fonts anywhere else)
CSS variables in app/globals.css. Tailwind extends via config.
Colors: --ink #0E1116, --midnight #0A2540, --brass #B8894A, --ivory #F5F1E8,
        --sand #EBE3D3, --seagrass #2C5F5D.
Type:   Display = Fraunces (serif), Body = Inter (sans). Tabular numerals for stats.

## Rules
1. Server components by default. Only add "use client" when using state, refs,
   effects, or browser APIs. Motion components go in small client wrappers.
2. Mobile-first. Every layout starts at the 375px viewport; scale up with sm/md/lg/xl.
3. Every <img> uses next/image with width/height AND a blur placeholder.
4. No CLS. Reserve space for every dynamic element. Fonts loaded with display:swap
   and preloaded via next/font.
5. Every interactive element is keyboard accessible with a visible focus ring
   using --brass at 2px offset.
6. Motion respects prefers-reduced-motion — wrap all Framer Motion in a
   useReducedMotion() guard that returns static markup when reduced.
7. Copy tone: editorial, understated, confident. No marketing exclamation points.
   Use the em dash — not the hyphen — for parenthetical clauses.
8. Never invent facts about Buhari. Use only the copy provided in /content/*.mdx.
9. Commit style: conventional commits, one component/feature per commit.
10. Before saying "done", run `pnpm build && pnpm lint && pnpm typecheck`
    and report the output.

## File conventions
- app/(marketing)/... route group for public pages
- components/ui/... shadcn primitives (customized)
- components/site/... project-specific components (hero, timeline, verticals)
- content/... MDX for long-form copy, JSON for structured data
- lib/... utilities
- public/images/... optimized images; naming: {section}-{descriptor}-{size}.webp

## Testing gate for every PR
- pnpm build passes
- pnpm typecheck passes
- Lighthouse mobile score ≥ 90 on Performance, ≥ 95 on Accessibility/Best/SEO
- No console warnings in dev
- Manually resize from 320px → 1920px in devtools — no horizontal scroll anywhere