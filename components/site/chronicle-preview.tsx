import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArticleCard } from "@/components/site/article-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
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
          <SectionHeader
            kicker="The Chronicle"
            heading="Stories from the group."
          />
          <ViewAllLink className="hidden shrink-0 md:inline-flex" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {items.map((entry, i) => (
            <Reveal key={entry.slug} delayMs={i * 100}>
              <ArticleCard
                slug={entry.slug}
                title={entry.title}
                category={`Chronicle · ${entry.category}`}
                excerpt={entry.excerpt}
                image={entry.image}
                alt={entry.alt}
              />
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
