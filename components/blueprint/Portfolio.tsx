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
      className="relative w-full bg-[#0E0E10] py-24 md:py-32"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <SectionHeading
          eyebrow="Recent Work"
          id="portfolio-heading"
          title="Precision, Applied to Every Industry."
          description="A sample of the caliber of design your Blueprint homepage will be built to match."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.title} delay={0.08 * index}>
              <a
                href="#apply"
                className="group block rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B872] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E10]"
              >
                <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-md transition-[border-color,transform] duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-accent-light/35">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/30 px-4 py-3">
                    <span className="h-2 w-2 rounded-[9999px] bg-white/15" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-[9999px] bg-white/15" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-[9999px] bg-white/15" aria-hidden="true" />
                    <span className="ml-2 truncate font-inter text-[11px] text-subtle/70">
                      {project.domain}
                    </span>
                  </div>

                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent">
                    <span
                      aria-hidden="true"
                      className="select-none font-cormorant text-[9rem] font-bold leading-none text-accent-light/[0.08]"
                    >
                      {project.initial}
                    </span>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,126,44,0.12),transparent_70%)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/70 to-transparent px-5 py-4 font-inter text-xs font-semibold uppercase tracking-[0.15em] text-text opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      View Project →
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-cormorant text-[22px] font-semibold leading-tight tracking-[-0.01em] text-text transition-colors duration-200 ease-out group-hover:text-accent-light">
                      {project.title}
                    </h3>
                    <p className="mt-2 font-inter text-[14px] leading-[1.6] text-subtle">
                      {project.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-[9999px] border border-white/[0.1] px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-subtle">
                    {project.badge}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
