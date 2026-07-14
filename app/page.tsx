import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { StatStrip } from "@/components/sections/StatStrip";
import { Work } from "@/components/sections/Work";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <StatStrip />
      <Services />
      <Work />
    </main>
  );
}
