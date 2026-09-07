import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { BLUR_SAND } from "@/lib/image-placeholders";
import { cn } from "@/lib/utils";
import chronicleData from "@/content/chronicle-preview.json";

type ChronicleEntry = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
};

const { items, viewAllHref } = chronicleData as {
  items: ChronicleEntry[];
  viewAllHref: string;
};

const KICKER = "font-body uppercase tracking-[0.25em] text-brass";

function ViewAllLink({ className }: { className?: string }) {
  return (
    <Link
      href={viewAllHref}
      className={cn(
        "group inline-flex items-center gap-2 rounded-sm font-body text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span className="border-b border-transparent pb-1 transition-colors duration-200 group-hover:border-brass">
        View all
      </span>
      <ArrowRight
        className="size-4 shrink-0 text-brass transition-transform duration-200 ease-out group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}

export function ChroniclePreview() {
  return (
    <section className="bg-ivory py-24 lg:py-32 dark:bg-ink">
      <div className="container">
        <div className="mb-14 flex items-end justify-between gap-8">
          <div>
            <p className={cn(KICKER, "text-[11px]")}>The Chronicle</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
              Stories from the group.
            </h2>
          </div>
          <ViewAllLink className="hidden shrink-0 md:inline-flex" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {items.map((entry, i) => (
            <Reveal key={entry.slug} delayMs={i * 100}>
              <Link
                href={`${viewAllHref}/${entry.slug}`}
                className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={entry.image}
                    alt={entry.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    placeholder="blur"
                    blurDataURL={BLUR_SAND}
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="pt-6">
                  <p className={cn(KICKER, "text-[10px]")}>
                    {`Chronicle · ${entry.category}`}
                  </p>

                  <h3 className="mt-3 font-display text-2xl leading-tight text-foreground">
                    {/* Brass underline wipes in left-to-right on card hover. */}
                    <span className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-brass after:transition-[width] after:duration-[400ms] after:ease-out group-hover:after:w-full">
                      {entry.title}
                    </span>
                  </h3>

                  <p className="mt-3 line-clamp-2 font-body text-sm text-ink/70 dark:text-ivory/70">
                    {entry.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <ViewAllLink />
        </div>
      </div>
    </section>
  );
}
