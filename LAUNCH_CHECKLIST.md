# Launch checklist

**This file is the gate for launch. Nothing ships with unchecked boxes under
Content and accuracy.** Those items are not polish — they are unverified claims
about a real company, and shipping them means publishing something we were told
not to assert.

The other sections are ordinary release work and can be judged on their merits.

---

## Content and accuracy

- [ ] **All CLIENT-CONFIRM markers resolved.** Every occurrence, from
      `git grep -n "CLIENT-CONFIRM"`:
  - [ ] `content/stats-band.json:2` — all four homepage figures
  - [ ] `content/associated-enterprises.json:2` — entity relationships, the
        section heading, and the six placeholder entries
  - [ ] `content/community-band.json:2` — how the three named institutions
        relate to the group
  - [ ] `components/site/community-band.tsx:11` — pointer to the note above;
        re-read before touching the copy
  - [ ] `components/site/group-companies.tsx:55` — pointer to the note above;
        re-read before making cards links or changing the heading
  - [ ] `public/images/README.md:82` — logos may only be used once cleared
- [ ] **Every figure in `content/stats-band.json` confirmed by the client** —
      1989 founding year, 1,000+ people, 8 verticals, 6 markets. The "8" must
      stay in step with `BUSINESS_VERTICALS` in `components/site/nav-config.ts`.
- [ ] **Associated enterprises: relationship to Buhari Holdings confirmed**, and
      the section heading finalised based on that answer. It currently reads
      "Associated enterprises", which asserts nothing about ownership, and the
      cards are deliberately **not links**. Only move to "Group companies" or
      "Subsidiaries" — and only make the cards clickable — on written
      confirmation of that relationship.
- [ ] **Six placeholder enterprise entries replaced with real ones**
      (`"placeholder": true` in `content/associated-enterprises.json`).
- [ ] **Chronicle placeholder copy replaced** (`content/chronicle-preview.json`).
      The current three entries are written to the right length and register but
      state no figures, dates, values or clients.
- [ ] Community band copy re-checked once the institution relationships are
      confirmed — it currently says the family's name "is carried by" the
      institutions rather than claiming the group founded or funds them.

## Assets

- [ ] **All SVG placeholders in `public/images/` replaced with real assets** at
      the dimensions listed in `public/images/README.md` (3 hero, 3 chronicle,
      8 vertical, 1 community, 1 logo).
- [ ] **Remove `dangerouslyAllowSVG` from `next.config.ts`** once real raster
      images are in. It is an XSS vector and exists only to let `next/image`
      serve the placeholder SVGs.
- [ ] Regenerate blur placeholders in `lib/image-placeholders.ts` — currently
      flat 1×1 PNGs. With real photography, prefer static imports so Next
      derives `blurDataURL` automatically.
- [ ] **Real social icons.** Currently neutral Lucide stand-ins (Briefcase, X,
      Aperture, Play) because Lucide v1 removed brand marks. Source from Simple
      Icons or the brands' own kits. See `SOCIAL_LINKS` in
      `components/site/nav-config.ts`.
- [ ] Social links point at real accounts — all four are `href: "#"`.
- [ ] **Company logos in the enterprises marquee — client-cleared.** Do not use
      a mark the client has not approved.
- [ ] **Real alt text once real photography lands.** Decorative images are
      currently `alt=""`, which is correct while they are abstract placeholders
      but wrong for photographs that carry meaning.
- [ ] **`og-default.jpg` for social sharing**, and `openGraph.images` wired up in
      `app/layout.tsx` — the metadata has no image today.
- [ ] **Favicon and app icons** — still the create-next-app default
      `app/favicon.ico`.
- [ ] Placeholder contact details replaced — `+91 44 XXXX XXXX` in
      `components/site/footer.tsx`.

## Testing

- [ ] **320px viewport verified on a real device or full Chrome devtools.** The
      dev pane used during the build clamps at 330px and cannot reach 320.
- [ ] **Hover states eyeballed on a real machine** — marquee pause, chronicle
      card underline wipe, verticals tile image scale. Headless panes report
      compositor-driven animations unreliably; these were verified at the
      CSS/computed-style level only.
- [ ] **Lighthouse run on the deployed URL**, all four categories. Target from
      `CLAUDE.md`: Performance ≥ 90, Accessibility / Best Practices / SEO ≥ 95.
- [ ] **Real iOS Safari and Android Chrome pass.** Check `100dvh` on the hero
      with the URL bar both shown and hidden, and that Lenis has not degraded
      native touch momentum.
- [ ] Keyboard-only pass over the whole page: skip link, header nav, mega-menu,
      mobile sheet, carousel controls, every card.
- [ ] Screen-reader pass on the marquee — the duplicated card list is
      `aria-hidden`, so each company should be announced once.
- [ ] `prefers-reduced-motion` verified end to end on a real machine.

## Infrastructure

- [ ] **Vercel plan: Hobby is non-commercial.** Move to Pro, or deploy under the
      client's own Vercel account, before launch.
- [ ] **Custom domain configured** (buhariholding.com or as directed) with HTTPS
      and the apex/www redirect settled.
- [ ] **Contact form wired to a real destination.** There is no contact form yet
      — the `/contact` route does not exist.
- [ ] **Newsletter form wired.** `components/site/newsletter-form.tsx` is
      presentational; submit only calls `preventDefault()`.
- [ ] **Analytics added.**
- [ ] Routes built out. Every nav and footer link currently 404s except `/` —
      `/businesses/*`, `/community`, `/about/*`, `/newsroom`, `/careers`,
      `/contact`, `/gallery`, `/innovation`, `/privacy`, `/terms`, `/sitemap`.
- [ ] `robots.txt` and `sitemap.xml`.
- [ ] Search dialog wired or removed — it currently says "Search coming soon".
- [ ] Node version in Vercel project settings matches `engines.node` (24.x).
