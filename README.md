# Buhari Holdings

Marketing site for Buhari Holdings Pvt Ltd, a Chennai-based conglomerate founded
in 1989. Editorial in tone rather than SaaS — heavy type, restrained motion,
square edges.

**Not production-ready.** See [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) — the
copy contains unconfirmed claims and every image is a placeholder.

## Stack

- **Next.js 15** (App Router), React 19, TypeScript strict
- **Tailwind v4** — tokens in `app/globals.css`, bridged to `tailwind.config.ts`
- **shadcn/ui** on Radix primitives (`components/ui/`)
- **Framer Motion** for scroll reveals, **Lenis** for smooth scroll
- **next/font** (Fraunces + Inter, self-hosted), **next/image** throughout
- **next-themes** for light/dark
- react-hook-form + zod (installed; forms not yet wired)

## Getting started

Prerequisites:

| Tool | Version |
| --- | --- |
| Node | 24.x |
| pnpm | 11.x (pinned via `packageManager`) |

```bash
pnpm install
pnpm dev
```

Build and the three gate commands — all three must pass before any commit:

```bash
pnpm build && pnpm lint && pnpm typecheck
```

`pnpm build` must finish with **zero warnings**, not merely exit 0.

## Project structure

```
app/
  layout.tsx            Root layout: fonts, theme provider, Lenis, header, footer
  page.tsx              Homepage — composes the six sections, server component
  globals.css           Design tokens, motion keyframes, reduced-motion safety net
components/
  site/                 Project components. Server by default; client only where
                        state, refs or browser APIs are genuinely needed
    nav-config.ts       Single source of truth for nav items, the 8 verticals,
                        footer links and social links. Do not duplicate these.
    hero.tsx            Full-viewport carousel (client — carousel state)
    reveal.tsx          Shared scroll-reveal wrapper (client — useInView)
    smooth-scroll.tsx   Lenis init; renders nothing (client)
  ui/                   shadcn primitives, lightly customised
content/                Copy and structured data as JSON — see below
lib/
  utils.ts              cn() — clsx + tailwind-merge
  use-reduced-motion.ts Hydration-safe prefers-reduced-motion hook
  image-placeholders.ts Generated blur data URIs
  scroll-events.ts      Lenis per-frame scroll event name
public/images/          Placeholder art + the asset manifest
styles/tokens.md        What every design token means and when to use it
```

## Content

All copy lives in `content/*.json`, not inline in components, so it can be
reviewed and replaced without touching TSX.

Several files carry a `_note` field marked **CLIENT-CONFIRM REQUIRED**. These
are claims that are plausible but unverified — figures, and relationships
between Buhari Holdings and other entities or institutions. They exist because
`CLAUDE.md` forbids inventing facts about the client, so anything uncertain is
written down rather than quietly asserted.

Read the `_note` before editing the copy around it. Some of the wording is
deliberately hedged, and the associated-enterprises section heading in
particular depends on an answer the client has not yet given.

Find them all with:

```bash
git grep -n "CLIENT-CONFIRM"
```

## Placeholders

Every image in `public/images/` is a generated SVG placeholder that renders its
own filename, so you can tell which slot you are looking at.

[`public/images/README.md`](./public/images/README.md) is the asset manifest: it
lists each file, its intended subject, and the exact dimensions to supply. It
also covers what to change when real photography lands — including removing
`dangerouslyAllowSVG` from `next.config.ts`, which exists **only** to let
`next/image` serve these placeholders.

## Motion

Motion is weighted and slow — no spring easing, no bounce. The signature reveal
is a mask slide-up; text never blurs or scales in.

`prefers-reduced-motion` is honoured as *behaviour*, not just paint: the hero
stops auto-advancing, the marquee becomes a plain scroll-snap row, count-ups
show final values, scroll reveals render at rest, and Lenis is never
constructed. Gate on `lib/use-reduced-motion.ts`; the CSS block at the bottom of
`globals.css` is only a safety net.

## Deployment

Vercel, zero-config. `pnpm-lock.yaml` and `pnpm-workspace.yaml` are both
committed — the latter carries the `allowBuilds` decision for `unrs-resolver`,
without which a CI install has no way to answer that prompt.
