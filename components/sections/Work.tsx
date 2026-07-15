"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
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

const PANEL_Z = ["z-10", "z-20", "z-30"] as const;

/**
 * Hover-capable pointer: hide until hover/focus.
 * Touch / coarse pointer: always visible (no hover state on phones/tablets).
 */
const HOVER_REVEAL =
  "opacity-100 [@media(hover:hover)_and_(pointer:fine)]:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 group-focus-visible:opacity-100";

const HOVER_GOLD =
  "opacity-[0.08] [@media(hover:hover)_and_(pointer:fine)]:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-[0.08] group-focus-visible:opacity-[0.08]";

type Project = (typeof PROJECTS)[number];

function PlaceholderFill({ title }: { title: string }) {
  const initial = title.trim().charAt(0).toUpperCase();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span
        aria-hidden="true"
        className="select-none font-playfair text-[clamp(10rem,28vw,18rem)] font-bold leading-none text-text opacity-[0.08]"
      >
        {initial}
      </span>
    </div>
  );
}

function WorkStackPanel({
  project,
  zClass,
}: {
  project: Project;
  zClass: (typeof PANEL_Z)[number];
}) {
  return (
    <div className="h-screen w-full">
      <div
        className={`sticky top-0 flex h-screen w-full flex-col bg-background ${zClass}`}
      >
        <a
          href="#work"
          className="group relative mx-auto flex h-full w-full max-w-content min-h-0 flex-1 flex-col px-6 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:px-8 lg:py-10"
        >
          <BrowserFrame
            url={project.url}
            fill
            className="flex h-full min-h-0 flex-1 flex-col"
          >
            <PlaceholderFill title={project.title} />

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-accent transition-opacity duration-200 ease-out ${HOVER_GOLD}`}
            />

            {/* Bottom scrim for overlaid type */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-background/95 via-background/55 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <p
                className={`mb-4 font-inter text-xs font-semibold uppercase tracking-[0.15em] text-text transition-opacity duration-200 ease-out ${HOVER_REVEAL}`}
              >
                View Project →
              </p>
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-light">
                {project.badge}
              </p>
              <h3 className="mt-3 font-playfair text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-text transition-colors duration-200 ease-out group-hover:text-accent group-focus-visible:text-accent">
                {project.title}
              </h3>
              <p className="mt-3 max-w-2xl line-clamp-2 font-inter text-base leading-relaxed text-subtle sm:text-lg">
                {project.description}
              </p>
            </div>
          </BrowserFrame>
        </a>
      </div>
    </div>
  );
}

/**
 * Work — sticky stacked full-screen project panels on md+,
 * simple full-width card stack below md.
 */
export function Work() {
  const reduceMotion = useReducedMotion();

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
      </div>

      {/* Mobile / small screens — normal document flow, no sticky stack */}
      <div className="container-fulatelier mt-12 space-y-10 md:hidden">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            badge={project.badge}
            description={project.description}
            url={project.url}
            featured
          />
        ))}
      </div>

      {/* md+ — sticky cover stack: one viewport of scroll per project */}
      <div className="mt-12 hidden md:block lg:mt-16">
        {PROJECTS.map((project, index) => (
          <WorkStackPanel
            key={project.title}
            project={project}
            zClass={PANEL_Z[index]}
          />
        ))}
      </div>

      <div className="container-fulatelier">
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
