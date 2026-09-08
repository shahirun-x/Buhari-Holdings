import { CountUp } from "@/components/site/count-up";
import { MastheadRule } from "@/components/site/masthead-rule";
import statsData from "@/content/stats-band.json";

type Stat = {
  value: number;
  /** Where the count-up starts. A year counting from 0 reads as a bug. */
  from?: number;
  suffix?: string;
  /** Thousands separators. Off by default so years stay 1989, not 1,989. */
  grouped?: boolean;
  label: string;
};

const { stats } = statsData as { stats: Stat[] };

export function StatsBand() {
  return (
    <section className="bg-midnight py-20 text-ivory lg:py-24">
      <MastheadRule className="mb-16" />

      <div className="container grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-ivory/10">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 text-center">
            <p className="font-display text-[clamp(3rem,7vw,5.5rem)] font-normal leading-none">
              <CountUp
                value={stat.value}
                from={stat.from}
                suffix={stat.suffix}
                grouped={stat.grouped}
              />
            </p>
            <p className="mt-4 font-body text-[10px] uppercase tracking-[0.25em] text-brass">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
