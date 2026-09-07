import { Hero } from "@/components/site/hero";
import { ChroniclePreview } from "@/components/site/chronicle-preview";
import { StatsBand } from "@/components/site/stats-band";

export default function Home() {
  return (
    <>
      <Hero />
      <ChroniclePreview />
      <StatsBand />
    </>
  );
}
