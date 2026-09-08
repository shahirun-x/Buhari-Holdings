import { Hero } from "@/components/site/hero";
import { ChroniclePreview } from "@/components/site/chronicle-preview";
import { StatsBand } from "@/components/site/stats-band";
import { VerticalsGrid } from "@/components/site/verticals-grid";
import { CommunityBand } from "@/components/site/community-band";
import { GroupCompanies } from "@/components/site/group-companies";

export default function Home() {
  return (
    <>
      <Hero />
      <ChroniclePreview />
      <StatsBand />
      <VerticalsGrid />
      <CommunityBand />
      <GroupCompanies />
    </>
  );
}
