# Design tokens — Buhari Holdings

The single source of truth for colour, type, radius and layout. **Never
hardcode a colour, font, or radius anywhere else.** Every value below is a CSS
custom property declared in [`app/globals.css`](../app/globals.css) and exposed
as a Tailwind utility in [`tailwind.config.ts`](../tailwind.config.ts).

The two systems are wired together: the brand palette drives the semantic
surface tokens, which shadcn/ui primitives consume. Change a brand value once
and it propagates everywhere, in both themes.

---

## Brand palette

Constant across light and dark. Use the brand utilities for deliberate,
on-brand accents (a brass rule, an ink panel, a seagrass tag).

| Token         | Hex       | Utility examples                     | Use it for |
| ------------- | --------- | ------------------------------------ | ---------- |
| `--ink`       | `#0E1116` | `bg-ink`, `text-ink`, `border-ink`   | Primary text on light; darkest surface on dark. |
| `--midnight`  | `#0A2540` | `bg-midnight`, `text-midnight`       | Deep, formal panels; primary buttons in light. |
| `--brass`     | `#B8894A` | `bg-brass`, `text-brass`, `ring-brass` | The accent — underlines, rules, focus rings, primary in dark. |
| `--ivory`     | `#F5F1E8` | `bg-ivory`, `text-ivory`             | Page ground in light; primary text on dark. |
| `--sand`      | `#EBE3D3` | `bg-sand`, `border-sand`             | Subtle fills, secondary/muted surfaces, hairline borders. |
| `--seagrass`  | `#2C5F5D` | `bg-seagrass`, `text-seagrass`       | Secondary accent — tags, quiet highlights. |
| `--white`     | `#FFFFFF` | `bg-white`                           | Cards and popovers in light. |

---

## Semantic surface tokens

Theme-aware. These flip between light and dark, so **prefer these for
structural UI** (backgrounds, text, borders, controls) — they keep contrast
correct in both themes. shadcn/ui components are built entirely on them.

| Token / utility base    | Light        | Dark          | Role |
| ----------------------- | ------------ | ------------- | ---- |
| `background`            | ivory        | ink           | Page background (applied to `body`). |
| `foreground`            | ink          | ivory         | Default body text. |
| `card` / `popover`      | white        | `#14181F`     | Raised surfaces. |
| `primary`               | midnight     | brass         | Primary action / emphasis. |
| `primary-foreground`    | ivory        | ink           | Text on `primary`. |
| `secondary`             | sand         | `#1C2129`     | Secondary buttons, chips. |
| `muted`                 | sand         | `#1C2129`     | Muted fills. |
| `muted-foreground`      | `#57524A`    | `#A7A093`     | Secondary / caption text. |
| `accent`                | sand         | `#1C2129`     | Hover states, subtle emphasis. |
| `destructive`           | `#B23B3B`    | `#E06B6B`     | Errors, destructive actions. |
| `border` / `input`      | `#DDD2BC`    | `#262B33` / `#2A2F37` | Hairlines and form field edges. |
| `ring`                  | brass        | brass         | Focus ring (2px, brass — see a11y rule). |

Utilities follow Tailwind's usual shape: `bg-background`, `text-foreground`,
`bg-primary text-primary-foreground`, `border-border`, `ring-ring`,
`text-muted-foreground`, etc.

---

## Typography

| Token            | Family (self-hosted via `next/font`) | Utility        | Use it for |
| ---------------- | ------------------------------------ | -------------- | ---------- |
| `--font-display` | Fraunces (variable serif)            | `font-display` | Headings, the wordmark, editorial display type. |
| `--font-body`    | Inter (variable sans)                | `font-body`    | Body copy, UI, labels. Also the `body` default. |

Both load with `display: "swap"` and `preload: true` and are subset to
`latin`. For statistics and figures, add `.tabular-nums`
(`font-variant-numeric: tabular-nums`) so digits align.

---

## Radius

`--radius` is `0.625rem`. The scale derives from it and is consumed by
shadcn primitives and the `rounded-{sm,md,lg,xl}` utilities.

| Token         | Value                     |
| ------------- | ------------------------- |
| `--radius-sm` | `calc(var(--radius) - 4px)` |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-lg` | `var(--radius)`           |
| `--radius-xl` | `calc(var(--radius) + 4px)` |

---

## Layout — `.container`

The editorial page container. Centred, capped at **1440px**, with horizontal
padding that scales mobile-first:

| Viewport           | Horizontal padding |
| ------------------ | ------------------ |
| base (≥ 375px)     | `1.5rem` (24px)    |
| `md` (≥ 768px)     | `2.5rem` (40px)    |
| `lg` (≥ 1024px)    | `4rem` (64px)      |

Apply with the `container` class. Defined as a component in
`tailwind.config.ts` so it stays in one typed place.

---

## Theming mechanics

- Light/dark is a `.dark` class on `<html>`, managed by **next-themes**
  (`attribute="class"`), defaulting to the OS setting with a manual toggle
  that persists to `localStorage`.
- A blocking inline script applies the theme before paint, so there is **no
  flash of the wrong theme**. `<html>` carries `suppressHydrationWarning`.
- `dark:` Tailwind variants are wired to the `.dark` class via
  `@custom-variant dark` in `globals.css`, not the OS media query — so the
  toggle always wins.
