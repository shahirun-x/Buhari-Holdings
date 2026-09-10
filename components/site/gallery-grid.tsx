"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { BLUR_SAND } from "@/lib/image-placeholders";
import type { GalleryItem } from "@/lib/content-types";

/**
 * Masonry via CSS columns, with a lightbox.
 *
 * Radix handles the focus trap and Escape. Focus return is handled here:
 * Radix restores focus to whatever opened the dialog, but the reader may
 * have paged to a different image, so on close we move focus to the
 * trigger for the image they actually ended on.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const triggerRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  // Which trigger to focus once the dialog has finished closing.
  const returnTo = React.useRef<number | null>(null);

  const open = openIndex !== null;
  const current = open ? items[openIndex] : null;

  const step = React.useCallback(
    (delta: number) => {
      setOpenIndex((prev) => {
        if (prev === null) return prev;
        return (prev + delta + items.length) % items.length;
      });
    },
    [items.length]
  );

  function handleOpenChange(next: boolean) {
    if (next) return;
    returnTo.current = openIndex;
    setOpenIndex(null);
  }

  return (
    <>
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            ref={(node) => {
              triggerRefs.current[i] = node;
            }}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open image: ${item.caption}`}
            className="group mb-6 block w-full break-inside-avoid overflow-hidden rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Image
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL={BLUR_SAND}
              className="h-auto w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton
          className="max-w-4xl border-none bg-ink p-4 sm:max-w-4xl"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              step(1);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              step(-1);
            }
          }}
          onCloseAutoFocus={(event) => {
            const index = returnTo.current;
            if (index === null) return;
            event.preventDefault();
            triggerRefs.current[index]?.focus();
          }}
        >
          <DialogTitle className="sr-only">
            {current ? current.caption : "Image"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Use the left and right arrow keys to move between images, and
            Escape to close.
          </DialogDescription>

          {current ? (
            <>
              <div className="relative flex max-h-[70vh] items-center justify-center">
                <Image
                  key={current.id}
                  src={current.src}
                  alt=""
                  width={current.width}
                  height={current.height}
                  sizes="90vw"
                  placeholder="blur"
                  blurDataURL={BLUR_SAND}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="font-body text-sm text-ivory/75">
                  {current.caption}
                </p>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                    className="grid size-11 place-items-center rounded-full border border-ivory/30 text-ivory outline-none transition-colors hover:border-brass focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <ChevronLeft className="size-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next image"
                    className="grid size-11 place-items-center rounded-full border border-ivory/30 text-ivory outline-none transition-colors hover:border-brass focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <ChevronRight className="size-5" aria-hidden />
                  </button>
                </div>
              </div>

              <p className="sr-only" aria-live="polite">
                {`Image ${(openIndex ?? 0) + 1} of ${items.length}`}
              </p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
