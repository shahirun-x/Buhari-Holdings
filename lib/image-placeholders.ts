/**
 * Blur placeholders for `next/image`.
 *
 * `placeholder="blur"` needs an explicit `blurDataURL` for any image that is
 * not a static raster import — which includes the SVG placeholders currently
 * standing in for photography. These are 1×1 PNGs encoding the `--ink` and
 * `--sand` token values, so the blur-up reads as the right ground colour
 * rather than flashing grey.
 *
 * They are generated artefacts, not a place to pick colours: when real
 * photography lands, prefer static imports (Next derives `blurDataURL`
 * automatically) or a real low-res blur, and delete these. See
 * public/images/README.md.
 */

/** 1×1 PNG of --ink #0e1116 — for the dark hero frames. */
export const BLUR_INK =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGPgExQDAABmADbfwJK+AAAAAElFTkSuQmCC";

/** 1×1 PNG of --sand #ebe3d3 — for the chronicle cards. */
export const BLUR_SAND =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGN4/fgyAAVeAqLrAyxlAAAAAElFTkSuQmCC";
