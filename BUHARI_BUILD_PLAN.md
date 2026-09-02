# Buhari Holdings — Portfolio Website Build Plan

> **Client:** Buhari Holdings Pvt Ltd (buhariholding.com)
> **Reference:** tata.com (structure, storytelling, gravitas)
> **Deliverable:** Next.js 15 App Router site, mobile-perfect, editorial feel
> **Workflow:** Prompt Claude Code sequentially, section by section, with a QA gate after each

---

## 1) Which Claude model to pick inside Claude Code

For a design-heavy Next.js build where you care about (a) zero bugs, (b) mobile-perfect layouts, and (c) an "extraordinary" look, here's the honest rundown of the current lineup:

| Model | Strengths | Cost/M tok | Use it for |
|---|---|---|---|
| **Claude Sonnet 5** (`claude-sonnet-5`) | Community consensus: "pixel-perfect frontend." Fast, iterative, cheap. | $2 / $10 | **Your daily driver.** 80–90% of the build. Components, pages, styling, Tailwind, Framer Motion, responsive tweaks. |
| **Claude Opus 4.8** (`claude-opus-4-8`) | Deepest reasoning, best at architectural setup, tricky animation choreography, multi-file refactors, debugging weird SSR/hydration issues. | $5 / $25 | Project scaffolding, design-system decisions, hard bugs, complex animation sequences (scroll-linked, layered), accessibility audits. |
| **Claude Fable 5** (`claude-fable-5`) | Most capable widely available frontier model. Slower + expensive. | $10 / $50 | Rare — reserve for one-shot "make this section extraordinary and don't miss anything." E.g. the hero orchestration. |
| Claude Haiku 4.5 | Fast, cheap, limited reasoning. | $1 / $5 | Skip for this project — too much aesthetic judgement required. |

### My recommended workflow for this project

```
Session 1 (Opus 4.8): scaffold repo, design tokens, layout shell, routing
Session 2+ (Sonnet 5): build each page/section, iterate on styling
When stuck (Opus 4.8): switch models mid-session with /model opus
Once (Fable 5): one polish pass on the hero + heritage timeline
```

Switch models inside Claude Code with `/model sonnet`, `/model opus`, `/model fable` (or whatever your CLI exposes). If you're on Claude Max, Opus is included; on Pro, be a bit more careful about Opus quota and default to Sonnet.

**Verdict for "creative + few bugs":** **Sonnet 5** is the answer for the day-to-day. **Opus 4.8** for setup and hard problems. The "few bugs" part is 70% about how you *prompt* it — see section 8 below.

---

## 2) Research summary — who Buhari Holdings actually is

You cannot design a heritage portfolio without knowing the story. Here's what the site + public records show, so your copy and structure are grounded:

### Company
- **Buhari Holdings Pvt Ltd** — Chennai-based holding company, incorporated **8 March 1989**, CIN U45201TN1989PTC017001
- **HQ:** No. 4, Moores Road, Nungambakkam, Chennai 600006 (Buhari Buildings)
- **Employees:** 1,001–2,000
- **Global footprint:** India, UAE, Far East, Europe, America, Australia

### Founder & family (this is the emotional core)
- **B.S. Abdur Rahman** — "BSA Rahman," known as *"Sena Aana"* — the founder, revered for ethics, philanthropy, and leadership. He also chaired ETA, ABR Enterprises, West Asia Maritime, East Coast Constructions, and Sethu Investments.
- Current Board: **Ashraf Abdul Rahman Buhari, Ahmed Buhari, Abdul Qadir, Arif Buhary Rahman, Qurrath Jameela, Mariam Habeeb**
- **Ahmed A.R. Buhari** — Founder President & CEO, Coal and Oil Group (a Buhari energy arm)

### Institutions the family founded / supports (huge trust-builder)
- B.S. Abdur Rahman Crescent Institute of Science & Technology (deemed university)
- Thassim Beevi Abdul Kader College for Women
- Islamic Studies & Cultural Centre
- B.S. Abdur Rahman Zakat Foundation Trust

### Business verticals (from the current site)
1. **Properties** — real estate consulting
2. **Construction** — 40+ years, part of India's infrastructure transformation (via ECCI — East Coast Constructions & Industries — flyovers, civil works)
3. **Engineering** — automobiles, auto components
4. **Manufacturing** — steel, composites
5. **Energy** — power generation, oil & gas (Coal and Oil Group; work with Coastal Energen)
6. **Agency** — watches, jewellery, retail
7. **Shipping & Trading** — long/short charter agreements, dry bulk & liquid cargo across Atlantic, Mediterranean, Pacific, Indian Ocean (via West Asia Maritime)
8. **Services** — facility management, medical care, institutional support

**Positioning line to work with (draft, refine with client):**
> *"Four decades of Chennai enterprise. From steel and shipping to schools and civic care — built on trust."*

Tata's line is "Leadership with Trust." Buhari's differentiator is **philanthropic capitalism rooted in South India + Islamic values of stewardship**. Lean into that — don't just copy Tata.

---

## 3) Design direction — Tata-inspired, Buhari-authentic

### What to steal from Tata
- Full-bleed hero **story carousel** with editorial titles ("Tata Stories" → **"The Buhari Story"** or **"Chronicle"**)
- Big typography, generous whitespace, restrained color
- Dark mode / light mode toggle (Tata has this)
- **Horizontal-scrolling brand strip** at the bottom of the homepage (their brand carousel is iconic — will translate into a "Group Companies" strip for Buhari)
- Numbers-as-story ("1,028,000 employees" style stat card)
- Sticky global nav with mega-menu on Business
- Heritage timeline as its own scroll-driven page
- Newsroom-first content strategy (press releases as social proof)

### What to do differently (so it's not a Tata clone)
Tata's palette is navy + electric yellow — corporate India default. To feel premium *and* distinct:

**Proposed palette**
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0E1116` | Body text, dark surfaces |
| `--midnight` | `#0A2540` | Primary brand, headers on light |
| `--brass` | `#B8894A` | Accent — CTAs, underlines, small marks |
| `--ivory` | `#F5F1E8` | Warm off-white background (paper feel) |
| `--sand` | `#EBE3D3` | Section dividers, card backgrounds |
| `--seagrass` | `#2C5F5D` | Secondary accent (nod to shipping/maritime heritage) |
| `--white` | `#FFFFFF` | Pure white for photo cards |

**Type system**
- **Display:** a modern editorial serif with character → **PP Editorial New**, **GT Sectra**, or the free **Fraunces** as fallback
- **Body:** clean humanist sans → **Inter**, or **Söhne** if licensed; **Instrument Sans** as a distinctive free option
- **Numerals:** tabular figures for all stats; use large serif numerals for hero numbers ("1989", "40+ years")

**Motion language**
- Slow, weighted, cinematic — no bouncy spring physics
- Text reveals: slight upward mask reveal (like a page turning), not letter-by-letter typewriter
- Hero image: **Ken Burns** slow zoom on stills
- Section transitions: parallax at 0.3–0.5 rate, not aggressive
- Cursor is a subtle brass dot on hover states (desktop only)

**Photography direction**
Editorial B&W or duotone (midnight + brass tint) for archival/heritage shots. Full-color for current projects. Never stock photos with "diverse office workers smiling." Every image should feel like it belongs in a coffee-table book.

**The one distinctive design idea**
Use a subtle **serif drop-cap** at the start of every long-form section (like a newspaper), and a thin brass **kerned wordmark** across the top of section dividers spelling "BUHARI · SINCE 1989" like the masthead of a broadsheet. This single motif will make the site feel like a publication, not a corporate template.

---

## 4) Tech stack

```
Framework:      Next.js 15 (App Router, RSC + Server Actions)
Language:       TypeScript strict mode
Styling:        Tailwind CSS v4 + CSS variables for theming
UI primitives:  shadcn/ui (customize heavily — do NOT use as-is)
Animation:      Framer Motion (or the newer motion.dev) + Lenis for smooth scroll
Icons:          Lucide React
Fonts:          next/font (self-host to avoid Google Fonts request)
Images:         next/image with sharp; blur placeholders on everything
Forms:          react-hook-form + zod
CMS (later):    Sanity or Payload (start with MDX/JSON, migrate later)
Analytics:      Plausible or Vercel Analytics
Deploy:         Vercel
Testing:        Playwright for critical flows, Lighthouse CI in GH Actions
```

**Non-negotiables you should encode in `CLAUDE.md` at repo root:**
- No `use client` unless necessary
- Every image uses `next/image` with explicit dimensions
- Every interactive element passes keyboard + screen reader test
- No layout shift (CLS < 0.05)
- Mobile-first Tailwind — start every component at `sm:` breakpoint and up
- No inline styles; tokens live in `tailwind.config.ts` / CSS variables

---

## 5) Information architecture

```
/                       Home — hero carousel, story cards, verticals grid, timeline preview, brand strip
/about                  Overview, mission, values, principles
/about/heritage         Scroll-driven timeline from 1989 → today (this is the "wow" page)
/about/leadership       Board, chairman, key executives
/about/founder          B.S. Abdur Rahman tribute page — long-form editorial
/businesses             Overview grid (8 verticals as large photo tiles)
/businesses/properties
/businesses/construction
/businesses/engineering
/businesses/manufacturing
/businesses/energy
/businesses/agency
/businesses/shipping-trading
/businesses/services
/community              Institutions supported, philanthropy, education, medical care
/community/institutions Crescent Institute, Thassim Beevi College, Zakat Foundation, etc.
/innovation             Forward-looking initiatives
/newsroom               Press releases, work orders, awards
/newsroom/[slug]
/gallery                Photo/video archive
/careers                Overview + open roles
/careers/[slug]
/contact                Locations, form, key contacts
```

Global nav (desktop): **Businesses · Community · Heritage · Newsroom · Careers · Contact** with a subtle dark/light toggle and search icon.

---

## 6) Repo scaffolding (paste this into a `CLAUDE.md` at repo root)

Claude Code reads `CLAUDE.md` on every session — put your standards here so you don't repeat them in every prompt.

```markdown
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
```

Drop that in as your first commit before any code.

---

## 7) The sequential Claude Code prompts

Feed these in order. After each, review the diff, test in browser, then move on. **Don't chain prompts.** One deliverable, one review, one commit.

---

### 🟦 Prompt 1 — Scaffold + design system (use Opus 4.8)

```
Read CLAUDE.md, then scaffold this Next.js 15 project.

1. Initialize with pnpm, TypeScript strict, Tailwind v4, ESLint, App Router,
   src/ directory OFF (use root app/), import alias "@/*".
2. Install: framer-motion, lenis, lucide-react, clsx, tailwind-merge,
   class-variance-authority, react-hook-form, zod, @hookform/resolvers.
3. Set up shadcn/ui — init with base color "stone", CSS variables ON. Add
   Button, Sheet, NavigationMenu, Dialog, Input, Textarea, Label.
4. Configure next/font: self-host Fraunces (400, 500, 600, weights) as
   --font-display and Inter (400, 500, 600) as --font-body. Both variable
   fonts, subset "latin", display "swap", preload true.
5. In app/globals.css define the token layer:
   :root { --ink, --midnight, --brass, --ivory, --sand, --seagrass, --white }
   .dark inverts appropriately. Body uses --ivory bg / --ink text in light,
   --ink bg / --ivory text in dark.
6. Extend tailwind.config.ts to expose those tokens as color utilities
   (bg-ink, text-brass, border-sand, etc.) and font families
   (font-display, font-body). Add a container class with max-w-[1440px]
   and generous horizontal padding that scales: px-6 md:px-10 lg:px-16.
7. Create a ThemeProvider (next-themes) with system default + manual toggle
   that persists to localStorage. No flash of wrong theme on load.
8. Create /styles/tokens.md documenting every token and when to use it.

Deliverables:
- Clean `pnpm build` with zero warnings
- A minimal app/page.tsx showing "Buhari Holdings" in Fraunces + a Inter
  paragraph + a brass underline — so I can visually verify tokens load.
- Commit as "chore: scaffold Next.js 15 with design tokens".
```

---

### 🟦 Prompt 2 — Global layout: header, footer, mobile nav (Sonnet 5)

```
Build the site shell.

Header (components/site/header.tsx):
- Fixed to top, backdrop-blur on scroll past 40px (add scroll listener in a
  small client component). Background: transparent on top, --ivory/85 with
  blur once scrolled.
- Left: BUHARI wordmark in Fraunces 500, tracking-wide. Below it in Inter
  10px uppercase tracking-widest: "SINCE 1989". Wordmark links to /.
- Center: nav items — Businesses, Community, Heritage, Newsroom, Careers.
  Each item has a hover state: brass underline animates from left to right
  (200ms ease-out). Active route: brass underline, static.
- "Businesses" opens a mega-menu on hover (desktop) / tap (mobile) with the
  8 verticals in a 4-column grid, each with a small icon (Lucide) + title
  + one-line description. Menu backdrop-blurs the page behind it.
- Right: search icon (opens a Dialog, keep the search itself as a TODO
  placeholder), theme toggle (sun/moon icon animates on switch), "Contact"
  as a small outline button in brass.

Mobile (< 1024px):
- Hamburger opens a full-screen Sheet from the right. Nav items stack
  vertically in Fraunces 32px. Sub-menus expand accordion-style.
- Wordmark stays left, hamburger right. Header height 64px mobile, 88px desktop.

Footer (components/site/footer.tsx):
- Multi-column, --ink background, --ivory text.
- Column 1: BUHARI wordmark large, then "No. 4, Moores Road, Nungambakkam,
  Chennai 600006" + phone/email (use placeholders).
- Column 2: Businesses (8 links)
- Column 3: About (Heritage, Leadership, Founder, Community, Innovation)
- Column 4: Company (Newsroom, Careers, Contact, Gallery)
- Column 5: Social icons + newsletter signup (email input + brass button)
- Bottom bar: © 2026 Buhari Holdings Pvt Ltd · Privacy · Terms · Sitemap
- On the very top edge of the footer, a thin brass line (1px) that spans full
  width with the text "BUHARI · SINCE 1989" centered, letter-spaced, 10px,
  ivory on ink. This is the "masthead" motif.

Accessibility:
- All nav links have visible focus rings (--brass, 2px offset).
- Mobile nav traps focus while open, closes on Escape.
- Theme toggle has aria-label that updates ("Switch to dark mode" / "light mode").

Wire header + footer into app/layout.tsx. Add a <main> with min-h-screen.
Set metadata: title default = "Buhari Holdings — Leadership Through Legacy",
description, openGraph placeholders.

Commit: "feat: global header + footer shell with mobile nav".
Run build + typecheck + report.
```

---

### 🟦 Prompt 3 — Homepage hero + story carousel (Sonnet 5, escalate to Opus if animation choreography is off)

```
Build the homepage hero. This is the first impression — take extra care.

Structure (app/page.tsx):
1. Hero carousel — full viewport height (100dvh, not vh, to handle mobile URL bar).
   3 slides, auto-advance every 7s, pause on hover. Manual dots + prev/next
   arrows bottom-left. Progress bar at the bottom in brass that fills as the
   slide plays.

   Slide content (create /content/hero-slides.json with these 3 entries;
   use placeholder images from /public/images/hero-1.jpg etc — I'll swap them):
   - Slide 1: "Built on Trust. Since 1989." Kicker: "The Buhari Story"
     CTA: "Read our chronicle" → /about/heritage
   - Slide 2: "Eight sectors. One legacy." Kicker: "Our Businesses"
     CTA: "Explore verticals" → /businesses
   - Slide 3: "A commitment beyond commerce." Kicker: "Community"
     CTA: "Our institutions" → /community

   Layout of each slide:
   - Full-bleed image with a subtle Ken Burns zoom (scale 1.0 → 1.05 over 8s).
   - Gradient overlay from --ink/70 at bottom to transparent at top.
   - Content aligned bottom-left, max-w-2xl:
     - Kicker in Inter 12px uppercase, tracking-widest, brass color.
     - Headline in Fraunces, clamp(2.5rem, 6vw, 5.5rem), leading-[1.05],
       ivory. Reveal with a mask-slide-up animation on slide change.
     - CTA: text link with brass arrow that translates 4px on hover.

2. Below the hero, a "The Buhari Chronicle" section — 3 story cards in a
   grid (1 col mobile, 3 cols desktop). Each card:
   - Aspect-video image top with hover zoom (scale 1.03, 400ms).
   - Small kicker: "Chronicle · [Category]"
   - Fraunces headline (24–28px)
   - Two-line Inter excerpt, muted
   - Brass "Read →" that underlines on hover
   Use placeholder content in /content/chronicle-preview.json.

3. Below that, a stats band — --midnight background, --ivory text, 4 stats
   in a row (2x2 on mobile):
   - "1989" — Founded
   - "40+" — Years of enterprise
   - "8" — Business verticals
   - "6" — Continents of operation
   Numbers in Fraunces clamp(3rem, 8vw, 6rem), tabular-nums. Labels
   Inter uppercase 11px tracking-widest brass.
   Animate numbers counting up when the section enters viewport (framer-motion
   useInView + a small counter hook).

Motion rules:
- Respect prefers-reduced-motion — no auto-advance, no Ken Burns, no counter
  animation. Show final state immediately.
- All Framer Motion in tiny client wrappers, not the whole page.

Mobile checks:
- Hero text doesn't overflow at 320px.
- Carousel arrows are 44px min touch target.
- Stats grid becomes 2x2, numbers still readable.

Commit: "feat(home): hero carousel + chronicle + stats band".
Run build + typecheck. Take a screenshot at 375px and 1440px and describe
what you see so I know nothing is off.
```

---

### 🟦 Prompt 4 — Homepage: businesses grid + brand strip + featured story (Sonnet 5)

```
Continue app/page.tsx below the stats band.

1. "Our Businesses" section:
   - Section header: small kicker "OUR BUSINESSES" brass, headline in Fraunces
     "Eight sectors, one legacy." Two-line lead-in paragraph max-w-xl.
   - Grid of 8 large photo tiles (4 cols desktop, 2 cols tablet, 1 col mobile):
     Properties, Construction, Engineering, Manufacturing, Energy, Agency,
     Shipping & Trading, Services.
   - Each tile: aspect-[4/5], full-bleed image, gradient overlay from --ink/80
     bottom to transparent 40%. Content bottom-left: vertical name in Fraunces
     28px, one-line descriptor in Inter 14px ivory. On hover: image zooms
     scale-105 (500ms ease-out), a brass arrow appears bottom-right.
   - Each tile is a full Link to /businesses/[slug].

   Content lives in /content/verticals.json — an array with slug, name,
   tagline, image path. Populate it based on the actual Buhari verticals
   from CLAUDE.md context.

2. "Community" featured story — full-width editorial band:
   - Two-column split desktop: left = image (aspect-[4/5]), right = copy.
     Stack on mobile with image first.
   - Copy column has kicker "COMMUNITY", Fraunces headline
     "A commitment beyond commerce.", body paragraph about the institutions
     the family founded (Crescent Institute, Thassim Beevi College, Zakat
     Foundation) — 3 sentences, editorial tone.
   - CTA "Explore our institutions →" in brass.

3. "Group Companies" horizontal strip — inspired by Tata's brand carousel:
   - Full-bleed band, --sand background.
   - Small kicker centered top: "GROUP COMPANIES"
   - Horizontal scroller with 12+ company cards, each card 240x160,
     white background, company logo centered, name below in Inter 13px.
     Cards have a subtle 1px sand border and a hover state that lifts them
     (translate-y -4px, shadow-lg).
   - Auto-scroll slowly leftward (marquee style, ~40s per full loop),
     pause on hover. Use CSS animation, not JS, for performance.
   - Companies to list (use placeholders for logos): East Coast Constructions
     & Industries, West Asia Maritime, Coal and Oil Group, ABR Enterprises,
     Sethu Investments, Buhari Properties, plus placeholders for the rest.
   - Mobile: touch-scrollable, keep the auto-scroll but slower (60s loop).

4. Final band above footer — "Chronicle Latest" — a simple 3-column preview
   of recent newsroom items (title, date, category kicker). Static for now,
   content in /content/newsroom-preview.json.

Commit: "feat(home): verticals grid + community band + group companies strip".
Run build + typecheck + describe the desktop and mobile view.
```

---

### 🟦 Prompt 5 — Heritage timeline page (Opus 4.8 — this is the "wow" page)

```
Build /about/heritage — the crown jewel of the site.

This is a scroll-driven, editorial timeline. Think NYTimes long-form article
meets Tata's heritage page. Take your time.

Layout:
- Full-viewport intro at the top: large Fraunces "The Buhari Chronicle"
  centered, "1989 — Present" below in Inter tracking-widest. A single
  archival B&W photo behind, duotoned midnight + brass, low opacity.
  Subtle down-arrow hint animating gently.

- Then the timeline itself. Structure it as alternating left/right cards
  on desktop, single column on mobile. A central vertical brass line runs
  down the page with year markers at each milestone.

  Each milestone card:
  - Large year in Fraunces (72px desktop, 48px mobile), brass.
  - Title in Fraunces 32px.
  - 2–3 paragraph body in Inter 16px, max-w-md.
  - Optional image (aspect-video) with a caption in italic Fraunces 13px.

- Scroll behavior:
  - As user scrolls, each card fades and slides up into view (opacity 0 → 1,
    translateY 40 → 0, 600ms ease-out).
  - The brass central line "draws" itself as the user scrolls — use a
    Framer Motion scroll-linked animation on a scaleY of the line.
  - Year markers highlight as they enter view (small brass dot expands).

- Sticky mini-map on the left (desktop only, >1280px):
  - Small column, decade markers (1989, 2000s, 2010s, 2020s), clicking one
    scrolls to that section.
  - Highlights current decade as user scrolls.

Content — put in /content/timeline.mdx (create it) with these milestones
(placeholder text I'll refine — write 2-paragraph editorial descriptions
for each, respectful and factual, based on the CLAUDE.md context):
- 1989: Incorporation of Buhari Holdings in Chennai
- 1990s: Foundation of ECCI, entry into large-scale construction
- Early 2000s: West Asia Maritime — the shipping era begins
- Late 2000s: Coal and Oil Group; energy vertical scales up
- 2010: Coastal Energen work order (₹2.31 Cr) — infrastructure milestone
- 2010s: Institutional expansion — Crescent Institute grows to deemed
  university status
- 2020s: Diversification into agency, retail, watches & jewellery
- Today: 8 verticals, 6 continents, 1,000+ employees

At the bottom, a call-out card:
- --midnight background, --ivory text, --brass accent border-top 2px.
- Fraunces headline "A story still being written."
- Body: one paragraph about the future.
- CTA "Meet our leadership →" to /about/leadership.

Accessibility:
- Respect prefers-reduced-motion — show static timeline, no scroll effects.
- Every year is a proper <h2>, every milestone title a <h3>.
- Sticky mini-map is aria-hidden and marked as decorative.

Performance:
- Images lazy-loaded except the hero.
- Scroll animations use transform + opacity only (no layout thrash).
- No layout shift when images load — placeholders reserved.

Commit: "feat(heritage): scroll-driven timeline with sticky nav".
This is the make-or-break page — polish it. Report Lighthouse scores when done.
```

---

### 🟦 Prompt 6 — Business overview + single vertical page template (Sonnet 5)

```
Build /businesses and /businesses/[slug].

/businesses (app/businesses/page.tsx):
- Editorial hero: Fraunces headline "Eight sectors. One legacy." Kicker
  "OUR BUSINESSES" brass. Lead paragraph.
- The same 8 photo tiles from the homepage grid, but larger and with more
  descriptive copy under each. Reuse the VerticalCard component.
- Below the grid, a "Global Footprint" section: a subtle world map SVG
  (use a simple outline map, no full geography) with brass dots on India,
  UAE, Far East, Europe, America, Australia. On hover, a tooltip shows
  the region and business activities there.

/businesses/[slug] (app/businesses/[slug]/page.tsx):
Dynamic route. Generate static params for all 8 verticals.
Data lives in /content/verticals/[slug].mdx — one file per vertical with
frontmatter (title, tagline, hero image) and MDX body.

Template:
1. Hero: full-bleed image, aspect-[21/9] desktop / [4/5] mobile. Overlay:
   kicker "BUSINESSES", Fraunces headline (vertical name), Inter tagline.
2. Two-column intro: left = big serif pull-quote about the vertical,
   right = 2-paragraph overview.
3. "Companies in this sector" — grid of company cards (name, one-line,
   arrow link). Use placeholder companies from the CLAUDE.md context.
4. "Recent work" — 3-card grid of projects/milestones.
5. Related verticals strip at the bottom (horizontal scroll of other 7).
6. "Talk to us" CTA card → /contact.

Create MDX files for all 8 with editorial placeholder copy grounded in
the real Buhari verticals. Don't invent specific numbers or client names —
keep copy about the sector, not fabricated stats.

Mobile:
- Hero text scales down cleanly (clamp).
- Two-column intro stacks.
- Company cards go single-column.

Commit: "feat(businesses): overview + dynamic vertical pages".
Run build + typecheck. Confirm all 8 slugs generate.
```

---

### 🟦 Prompt 7 — About, Leadership, Founder, Community pages (Sonnet 5)

```
Build the remaining "About" family of pages. All share a similar editorial
template — extract a shared <EditorialPage> component if it makes sense.

/about (app/about/page.tsx):
- Hero editorial (kicker + Fraunces headline + lead)
- Sections: Mission, Vision, Values, Principles — each a full-width band
  alternating --ivory and --sand backgrounds, with a large section number
  ("01", "02" in Fraunces brass) and a two-column layout (title left,
  body right).
- Sub-nav card at bottom linking to Heritage, Leadership, Founder, Community.

/about/leadership (app/about/leadership/page.tsx):
- Hero: "The Board" in Fraunces, kicker "LEADERSHIP".
- Grid of leadership cards (2 cols mobile, 3 cols desktop):
  Portrait aspect-[3/4], name in Fraunces, title in Inter, one-line bio.
  On hover: subtle brass border appears.
- Board members from CLAUDE.md context: Ashraf Abdul Rahman Buhari,
  Ahmed Buhari, Abdul Qadir, Arif Buhary Rahman, Qurrath Jameela,
  Mariam Habeeb. Use placeholder portraits — I'll swap them.
- Below the grid, a "Chairman's Message" band with a signature-style
  quote in Fraunces italic.

/about/founder (app/about/founder/page.tsx):
- This is a tribute page — treat it like a magazine feature.
- Full-viewport intro with archival B&W portrait of B.S. Abdur Rahman,
  duotoned midnight + brass. Overlay: Fraunces "B.S. Abdur Rahman",
  Inter italic "1927 – 2015 · Founder", one line "Sena Aana".
- Long-form MDX body with drop-caps at section starts. Sections:
  Early Life, Building an Enterprise, Institutions, Legacy.
- Sidebar (desktop only) with "In his own words" pull-quotes.
- Bottom: linked-list to the institutions he founded.

/community (app/community/page.tsx):
- Hero: "A commitment beyond commerce." Kicker "COMMUNITY".
- 4 pillar cards: Education, Medical Care, Facility Management,
  Institutional Support. Each card leads to a deeper section on the page.
- Institutions section: large cards for Crescent Institute, Thassim
  Beevi College, Islamic Studies & Cultural Centre, Zakat Foundation Trust.
  Each with photo, description, "Visit →" link (external).

All copy in /content/*.mdx. Editorial tone throughout. Respect the
family's legacy — no marketing fluff.

Commit: "feat(about): leadership, founder tribute, community pages".
```

---

### 🟦 Prompt 8 — Newsroom, Gallery, Careers, Contact (Sonnet 5)

```
Build the utility pages.

/newsroom (app/newsroom/page.tsx):
- Editorial hero: "Chronicle" (matching the homepage naming), kicker
  "NEWSROOM".
- Filter row: All · Press Releases · Awards · Milestones · Events.
- Grid of article cards (1 col mobile, 2 tablet, 3 desktop): image top,
  category kicker + date, Fraunces title, 2-line excerpt.
- Cursor pagination or "Load more" button.
- Data in /content/news/*.mdx with frontmatter (title, date, category,
  excerpt, image). Create 6 placeholder entries based on the real
  Buhari items I noted (Coastal Energen work order, ECCI flyover project,
  etc.) — keep facts accurate, don't invent details.

/newsroom/[slug] (app/newsroom/[slug]/page.tsx):
- Article template: hero image, category kicker, Fraunces title,
  Inter byline + date, long-form MDX body with drop-cap, share buttons,
  related articles at bottom.
- generateStaticParams from the MDX files.

/gallery (app/gallery/page.tsx):
- Masonry grid using CSS columns (columns-1 md:columns-2 lg:columns-3).
- Each item: image + optional caption in italic Fraunces.
- Click opens a Dialog with the full image + caption + navigation arrows.
- Use next/image for all with blur placeholders.
- Keyboard nav in the dialog (arrows, escape).

/careers (app/careers/page.tsx):
- Hero: "Build the next chapter with us."
- 3-column "Why Buhari" section (Legacy, Growth, Impact).
- Open roles list — accordion or simple table, filterable by location and
  department. Placeholder roles for now, structure so it's easy to hook
  to a CMS later.
- Bottom CTA: "Don't see a fit? Send us your story →" (mailto link
  or /contact).

/contact (app/contact/page.tsx):
- Two-column layout: form left, info right (mobile: form first, info below).
- Form fields: Name, Email, Company, Subject, Message.
  react-hook-form + zod validation. Server Action submits (log to console
  for now — hook to email later). Success state replaces form with
  Fraunces "Thank you. We'll be in touch."
- Info column: HQ address (No. 4 Moores Road, Nungambakkam), phone, email,
  regional offices list, embedded Google Map (use an iframe placeholder,
  not the paid API for now).

Commit: "feat: newsroom, gallery, careers, contact".
Run build + typecheck.
```

---

### 🟦 Prompt 9 — Dark mode pass + accessibility audit (Opus 4.8)

```
Go through every page and verify:

1. Dark mode:
   - Every color reference uses a token, no hardcoded hex.
   - Contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text in BOTH
     light and dark modes. Fix any violation.
   - Images that need duotone treatment (hero archival photos, founder
     portrait) handle dark mode gracefully — brass tint stays consistent.
   - Toggle test: switch modes 3 times on every page, no flash of wrong
     colors, no layout shift.

2. Accessibility:
   - Run through with a keyboard only. Every link, button, form field
     reachable and operable. Focus rings visible on --brass, 2px offset,
     never suppressed.
   - Skip-to-content link at the top of layout.tsx.
   - Every image has meaningful alt text (or alt="" if decorative).
   - Heading hierarchy correct on every page: exactly one h1, no skipped levels.
   - Landmarks: header, main, footer, nav all correct semantic tags.
   - Forms have labels associated (htmlFor / id).
   - Modals trap focus and return focus on close.
   - prefers-reduced-motion: verify no motion runs when enabled. Test by
     toggling in devtools.

3. Report:
   - Any violations found and fixed.
   - Any that couldn't be fixed and why.
   - Lighthouse Accessibility score per page (should be 100 on all).

Commit: "a11y: dark mode + keyboard + reduced motion audit".
```

---

### 🟦 Prompt 10 — Mobile QA pass (Sonnet 5, tedious but critical)

```
This is the "mobile-perfect" pass. Go page by page at these viewports:
320px (small phone), 375px (iPhone SE), 414px (larger phone),
768px (tablet portrait), 1024px (tablet landscape / small laptop).

For each viewport and each page, check and fix:

1. Zero horizontal scroll. If any element overflows, wrap or reflow it.
2. Text never breaks awkwardly — use clamp() on all display sizes.
3. Touch targets ≥ 44x44px. Fix any smaller.
4. Line length: body text max 65ch on mobile, 75ch desktop.
5. Images fill their containers with object-cover, no stretching.
6. Sticky elements (header, mini-map) don't cover content on landing.
7. Modals and sheets fill the viewport comfortably, close button visible.
8. Forms are usable one-handed — inputs have inputMode where appropriate
   (email, tel, numeric).
9. Long words break correctly (overflow-wrap: anywhere on likely culprits).
10. Safe-area insets respected — padding-bottom uses env(safe-area-inset-bottom)
    on the footer and any fixed CTAs.

For each page, report what you changed. Then run build + typecheck.

Commit: "fix(mobile): comprehensive responsive QA".
```

---

### 🟦 Prompt 11 — Performance + SEO pass (Opus 4.8)

```
Final optimization pass.

Performance:
1. Every next/image has explicit width + height AND a blurDataURL. Generate
   blur placeholders for all local images (plaiceholder or built-in).
2. Above-the-fold images use priority. Below-the-fold lazy load.
3. Fonts: verify next/font is subsetting correctly, both fonts preload.
4. No large client components. Audit any file with "use client" — can it
   be smaller? Move motion to leaf components only.
5. Third-party scripts: none unless justified. If any, use next/script
   with strategy="afterInteractive".
6. Run `pnpm build` and check the bundle analyzer output. Report any
   route with First Load JS > 150KB and see if it can be shrunk.
7. Lighthouse mobile: Performance ≥ 90, LCP < 2.5s, CLS < 0.05, INP < 200ms.
   Report scores per key page (home, heritage, a business detail, contact).

SEO:
1. app/layout.tsx has default metadata with template "%s | Buhari Holdings".
2. Every page exports its own generateMetadata with page-specific title,
   description, and openGraph (image, title, description).
3. app/sitemap.ts generates sitemap.xml from all static + dynamic routes.
4. app/robots.ts allows all + points to sitemap.
5. Structured data: on the homepage, add JSON-LD Organization schema
   (name, url, logo, address, sameAs social links). On newsroom articles,
   NewsArticle schema.
6. Open Graph images: one default 1200x630 with the wordmark + a photo,
   at /public/og-default.jpg. Reference in default metadata.

Report all Lighthouse scores and any bundle-size wins.

Commit: "perf: images, fonts, bundle + SEO metadata + structured data".
```

---

## 8) How to prompt Claude Code without bugs — the meta-rules

Every prompt above follows a pattern. If you write your own prompts, follow it too:

1. **Start with the file/scope.** "In app/page.tsx, add..." not "make a homepage."
2. **State the outcome, not the implementation.** "The hero should feel cinematic and slow" gives it more to work with than "use scale 1.05 with a 8s duration."
3. **Include the acceptance criteria in the prompt.** "Zero horizontal scroll at 375px" makes it self-check.
4. **Demand it run the build.** Ending every prompt with "run `pnpm build && pnpm typecheck`, report the output" catches ~80% of bugs before they reach you.
5. **One deliverable per prompt.** Don't ask for "hero + footer + contact form" in one go — you'll get sloppy work everywhere.
6. **Review the diff before saying "good, continue."** If the diff is 800 lines, something's off. Split it.
7. **Keep `CLAUDE.md` short but firm.** It's the constitution. Update it as rules emerge.
8. **When stuck, ask Claude to explain before it fixes.** "Explain why this hydration warning fires, then propose 2 fixes with tradeoffs." Then pick one.

---

## 9) After the build — testing tools you'll want

- **Playwright** for a few smoke tests on critical routes.
- **Lighthouse CI** in a GitHub Action, gate PRs on scores.
- **BrowserStack** or a physical iPhone + a physical Android for the real mobile check — devtools emulation lies about scroll behavior, safe-areas, and font rendering.
- **Claude in Chrome** — install the extension, then you can literally have Claude walk through the site and report layout issues page-by-page as an extra QA pass.

---

## 10) Quick decision tree if something breaks

| Symptom | First thing to try |
|---|---|
| Hydration warning | Move state/effect out of RSC boundary, check `suppressHydrationWarning` on theme root |
| CLS jumping | Missing width/height on image, or font swap — check font preload |
| Slow LCP | Hero image not `priority`, or too large — check WebP + srcset |
| Mobile nav won't close | Sheet not receiving controlled open state, or Escape handler missing |
| Fonts flash unstyled | `next/font` not properly variable, or `display: swap` misconfigured |
| Dark mode flash on load | Move theme script to before hydration, use `next-themes`' `attribute="class"` |
| Build passes, runtime crashes | Server component using browser API — move to a client wrapper |

---

**You've got this.** Prompt 1 kicks it off — feed it to Opus 4.8 in Claude Code and go from there. Ping me between prompts if you want me to adjust a section or generate the actual MDX copy for a specific page.
