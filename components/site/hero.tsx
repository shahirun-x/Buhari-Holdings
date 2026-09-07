"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { BLUR_INK } from "@/lib/image-placeholders";
import { cn } from "@/lib/utils";
import slidesData from "@/content/hero-slides.json";

type HeroSlide = {
  kicker: string;
  headline: string;
  cta: { label: string; href: string };
  image: string;
  alt: string;
};

const SLIDES = slidesData as HeroSlide[];
const SLIDE_MS = 7000;
const SWIPE_THRESHOLD_PX = 48;

/** Kicker styling, shared with the section headers below the fold. */
const KICKER =
  "font-body text-[11px] uppercase tracking-[0.25em] text-brass";

/**
 * One line of the reveal. The outer element clips; the inner one rises from
 * behind that edge. Mask only — never blur, scale, or per-letter.
 */
function MaskLine({
  children,
  delayMs,
  reduced,
}: {
  children: React.ReactNode;
  delayMs: number;
  reduced: boolean;
}) {
  if (reduced) return <div>{children}</div>;

  return (
    <div className="overflow-hidden">
      <div
        className="animate-mask-rise"
        style={{ animationDelay: `${delayMs}ms` }}
      >
        {children}
      </div>
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);

  const go = React.useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance. Keyed on `index` so each slide gets a full interval, and
  // torn down whenever the carousel is paused or motion is reduced.
  React.useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(
      () => setIndex((prev) => (prev + 1) % SLIDES.length),
      SLIDE_MS
    );
    return () => window.clearTimeout(id);
  }, [index, paused, reduced]);

  function onControlKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  }

  function onTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: React.TouchEvent) {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    go(delta < 0 ? index + 1 : index - 1);
  }

  const active = SLIDES[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured stories"
      // Negative margin cancels main's header offset so the fixed, transparent
      // header floats over the image. `isolate` keeps the -z-10 image layer
      // inside this section instead of falling behind the page background.
      className="relative isolate -mt-16 h-[100dvh] w-full overflow-hidden lg:-mt-22"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 -z-10",
            reduced
              ? i === index
                ? "opacity-100"
                : "opacity-0"
              : cn(
                  "transition-opacity duration-[900ms] ease-in-out",
                  i === index ? "opacity-100" : "opacity-0"
                )
          )}
        >
          {/* Ken Burns rides a wrapper, so the class can be added and removed
              without remounting the image and re-triggering a fetch. */}
          <div
            className={cn(
              "absolute inset-0",
              !reduced && i === index && "animate-ken-burns"
            )}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_INK}
              className="object-cover"
            />
          </div>

          {/* Bottom-up scrim for the content block. */}
          <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/40 to-transparent" />
          {/* Left-to-right scrim so the headline and header stay legible
              whatever the photograph is doing on that side. */}
          <div className="absolute inset-0 bg-linear-to-r from-ink/50 to-transparent to-60%" />
        </div>
      ))}

      {/* Content. Keyed on index so the mask reveal replays each change. */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container pb-24 lg:pb-32">
          <div key={index} className="max-w-3xl">
            <MaskLine delayMs={0} reduced={reduced}>
              <p className={cn(KICKER, "mb-5")}>{active.kicker}</p>
            </MaskLine>

            <MaskLine delayMs={80} reduced={reduced}>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-ivory">
                {active.headline}
              </h1>
            </MaskLine>

            <MaskLine delayMs={160} reduced={reduced}>
              <div className="mt-8">
                <Link
                  href={active.cta.href}
                  className="group inline-flex items-center gap-2 rounded-sm font-body text-sm tracking-wide text-ivory outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <span className="border-b border-brass pb-1">
                    {active.cta.label}
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-brass transition-transform duration-200 ease-out group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </MaskLine>
          </div>
        </div>
      </div>

      {/* Controls, aligned to the same container gutter as the content. */}
      <div className="absolute inset-x-0 bottom-0 z-20 mb-10">
        <div className="container flex items-center gap-4">
          <div className="flex items-center">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => go(i)}
                onKeyDown={onControlKeyDown}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="grid size-11 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span
                  className={cn(
                    "size-2 rounded-full border transition-colors duration-200",
                    i === index
                      ? "border-brass bg-brass"
                      : "border-ivory/40 bg-transparent"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              onKeyDown={onControlKeyDown}
              aria-label="Previous slide"
              className="grid size-11 place-items-center rounded-full border border-ivory/30 text-ivory outline-none transition-colors duration-200 hover:border-brass focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              onKeyDown={onControlKeyDown}
              aria-label="Next slide"
              className="grid size-11 place-items-center rounded-full border border-ivory/30 text-ivory outline-none transition-colors duration-200 hover:border-brass focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Progress. Hidden under reduced motion — nothing is advancing. */}
      {!reduced && (
        <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-ivory/20">
          {/* Duration and play state are inline: both are dynamic, and the
              fill has to freeze exactly when auto-advance does. */}
          <div
            key={index}
            style={{
              animationDuration: `${SLIDE_MS}ms`,
              animationPlayState: paused ? "paused" : "running",
            }}
            className="animate-progress h-full bg-brass"
          />
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${SLIDES.length}: ${active.headline}`}
      </p>
    </section>
  );
}
