# Image manifest — what to source

Every file below is currently a **generated SVG placeholder** (flat colour, no
photography). Each renders its own filename in the corner so you can tell which
slot you are looking at. Replace them with real assets at the stated dimensions
and the layouts will not shift — every image is rendered with `next/image`
`fill` inside a parent that already reserves its box, so swapping the file
cannot introduce CLS.

Naming for real assets follows the CLAUDE.md convention:
`{section}-{descriptor}-{size}.webp`

## Hero carousel — `components/site/hero.tsx`

Full-bleed, `object-cover`, behind a bottom-up and a left-to-right ink
gradient. The left third carries the headline, so keep the visual subject
**right of centre** and avoid busy detail or high-key highlights on the left
third — that is where the type sits.

| File | Intended subject | Required dimensions |
| --- | --- | --- |
| `hero-1.svg` | "The Buhari story" — the founding-era premises, or an archival Chennai street/building frame. Warm, documentary, slightly aged. | 1920 × 1080 (16:9), landscape |
| `hero-2.svg` | "Our businesses" — an industrial or construction frame that reads as scale: site, plant floor, or port gantry. | 1920 × 1080 (16:9), landscape |
| `hero-3.svg` | "Community" — an institution in use (school, hospital, civic building) with people, shot with restraint. | 1920 × 1080 (16:9), landscape |

Deliver at 1920 × 1080 minimum; 2560 × 1440 preferred so the Ken Burns scale
to 1.06 stays sharp on large displays. Export `.webp`, quality ~80.

## Chronicle preview — `components/site/chronicle-preview.tsx`

Rendered in a 4:3 box, square-edged, scaling to 1.04 on card hover.

| File | Intended subject | Required dimensions |
| --- | --- | --- |
| `chronicle-1.svg` | Construction — craft detail, structure or site, not a portrait. | 800 × 600 (4:3) |
| `chronicle-2.svg` | Shipping & trading — vessel, cargo, or port operations. | 800 × 600 (4:3) |
| `chronicle-3.svg` | Community institutions — a building in use. | 800 × 600 (4:3) |

Note the placeholders ship at 800 × 450 (16:9) because they are flat colour and
the box crops them; **real assets should be 4:3 (800 × 600 or larger)** so
nothing important is cropped away.

## When you swap in real images

1. Update the `image` paths in `content/hero-slides.json` and
   `content/chronicle-preview.json`.
2. Regenerate the blur placeholders in `lib/image-placeholders.ts` — they are
   currently 1×1 PNGs matching `--ink` and `--sand`. With real photography,
   prefer a real low-resolution blur (e.g. `plaiceholder`, or a static import,
   which lets Next generate `blurDataURL` automatically).
3. Remove `dangerouslyAllowSVG` from `next.config.ts`. It is enabled **only**
   so `next/image` will serve these placeholder SVGs; it is not needed once the
   images are raster, and it should not stay on for a production site that ever
   renders user-supplied images.
