import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Reveal } from "@/components/blueprint/Reveal";
import { SectionHeading } from "@/components/blueprint/SectionHeading";

const PROJECTS = [
  {
    initial: "R",
    title: "Restaurant & Hospitality",
    badge: "Concept",
    domain: "example-restaurant.com",
    description:
      "A warm, image-led homepage built to make reservations and takeout orders effortless on any device.",
  },
  {
    initial: "P",
    title: "Professional Services",
    badge: "Concept",
    domain: "example-firm.com",
    description:
      "A credibility-first layout that positions a local firm as the obvious, trustworthy choice in its market.",
  },
  {
    initial: "B",
    title: "Boutique Retail",
    badge: "Concept",
    domain: "example-boutique.com",
    description:
      "A clean, product-forward storefront designed to turn browsing into buying — in-store and online.",
  },
] as const;

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative w-full border-t border-accent/30 bg-background py-24 md:py-32"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <SectionHeading
          eyebrow="FUL://WORK"
          id="portfolio-heading"
          title="Precision, Applied to Every Industry."
          description="A sample of the caliber of design your Blueprint homepage will be built to match."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.title} delay={0.08 * index}>
              <a
                href="#apply"
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
                  <BrowserFrame url={project.domain}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="select-none font-cormorant text-[9rem] font-bold leading-none text-text opacity-[0.08]"
                      >
                        {project.initial}
                      </span>
                    </div>

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-accent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-[0.08]"
                    />

                    <p className="pointer-events-none absolute inset-x-0 bottom-0 px-5 py-4 font-inter text-xs font-semibold uppercase tracking-[0.15em] text-text opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
                      View Project →
                    </p>
                  </BrowserFrame>

                  <span className="absolute bottom-0 left-4 z-10 -translate-y-1/2 border border-accent bg-card px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-text">
                    {project.badge}
                  </span>
                </div>

                <div className="mt-8">
                  <h3 className="font-cormorant text-[22px] font-semibold leading-tight tracking-[-0.01em] text-text transition-colors duration-200 ease-out group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-inter text-[14px] leading-[1.6] text-subtle">
                    {project.description}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
