import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { StatStrip } from "@/components/sections/StatStrip";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <StatStrip />
      <Services />
    </main>
  );
}
