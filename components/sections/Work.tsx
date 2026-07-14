"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { social } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROJECTS = [
  {
    title: "Anderson Contracting Co.",
    badge: "Contractor · Concept Build",
    description:
      "A Mississippi general contractor site that leads with job-site photography, service areas across the Gulf Coast, and a direct estimate request flow built for busy owners on their phones.",
    url: "andersoncontracting.co",
    featured: true,
  },
  {
    title: "Magnolia Boutique",
    badge: "Retail · Concept Build",
    description:
      "An elegant boutique storefront for a Jackson retailer — seasonal lookbooks, inventory-aware product grids, and a checkout path that feels as considered as the racks on Fondren.",
    url: "magnoliaboutique.shop",
  },
  {
    title: "River City Eats",
    badge: "Restaurant · Concept Build",
    description:
      "A Vicksburg restaurant presence with tonight’s menu, reservation prompts, and event nights — designed so locals and river travelers can decide where to eat in under a minute.",
    url: "rivercityeats.com",
  },
] as const;

/**
 * Work — portfolio grid. Featured project full-width, then a 50/50 pair.
 */
export function Work() {
  const reduceMotion = useReducedMotion();
  const [featured, ...rest] = PROJECTS;

  return (
    <section
      id="work"
      className="section-fulatelier bg-background"
      aria-labelledby="work-heading"
    >
      <div className="container-fulatelier">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            The Work
          </p>
          <h2
            id="work-heading"
            className="mt-4 font-playfair text-h2 font-bold tracking-[-0.015em] text-text lg:text-h2-desktop"
          >
            Built to Perform.
          </h2>
        </div>

        <div className="mt-12 space-y-10 lg:mt-16 lg:space-y-12">
          <ProjectCard
            title={featured.title}
            badge={featured.badge}
            description={featured.description}
            url={featured.url}
            featured
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8">
            {rest.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                badge={project.badge}
                description={project.description}
                url={project.url}
              />
            ))}
          </div>
        </div>

        <motion.p
          className="mx-auto mt-14 max-w-2xl text-center font-inter text-base leading-relaxed text-subtle lg:mt-20 lg:text-lg"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          whileInView={
            reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          More work in progress — follow{" "}
          <a
            href={social.buildLog}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline decoration-accent underline-offset-4 transition-colors duration-200 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            the Build Log
          </a>{" "}
          to watch it happen in real time.
        </motion.p>
      </div>
    </section>
  );
}
