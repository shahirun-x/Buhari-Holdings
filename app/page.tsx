import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col justify-center py-16">
      <div className="flex items-start justify-between gap-6">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Est. 1989 — Chennai
        </p>
        <ThemeToggle />
      </div>

      <div className="mt-10 max-w-2xl">
        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          Buhari{" "}
          <span className="relative inline-block">
            Holdings
            {/* Brass underline — token check for --brass. */}
            <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-brass" />
          </span>
        </h1>

        <p className="font-body mt-8 text-lg leading-relaxed text-muted-foreground">
          A design-token smoke test. This heading is set in Fraunces — the
          display serif — while this paragraph is Inter, the body sans. The
          brass rule beneath the wordmark confirms the accent token loads, and
          the surface colours flip cleanly between light and dark via the
          toggle above.
        </p>
      </div>
    </main>
  );
}
