"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectLinkCard } from "@/components/ui/ProjectLinkCard";
import { social } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROJECTS = {
  anderson: {
    title: "Anderson Contracting Co.",
    badge: "Contractor · Concept Build",
    description:
      "A Mississippi general contractor site that leads with job-site photography, service areas across the Gulf Coast, and a direct estimate request flow built for busy owners on their phones.",
    url: "andersoncontracting.co",
  },
  magnolia: {
    title: "Magnolia Boutique",
    badge: "Retail · Concept Build",
    description:
      "An elegant boutique storefront for a Jackson retailer — seasonal lookbooks, inventory-aware product grids, and a checkout path that feels as considered as the racks on Fondren.",
    url: "magnoliaboutique.shop",
  },
  river: {
    title: "River City Eats",
    badge: "Restaurant · Concept Build",
    description:
      "A Vicksburg restaurant presence with tonight’s menu, reservation prompts, and event nights — designed so locals and river travelers can decide where to eat in under a minute.",
    url: "rivercityeats.com",
  },
} as const;

const PROJECT_LIST = [
  PROJECTS.anderson,
  PROJECTS.magnolia,
  PROJECTS.river,
] as const;

const REFERENCES: {
  status: "live";
  displayUrl: string;
  siteUrl: string;
  projectType: string;
  projectName: string;
  description: string;
  imageSrc?: string;
}[] = [
  {
    status: "live",
    displayUrl: "for-living.it",
    siteUrl: "https://www.for-living.it/",
    projectType: "Reference · Premium Studio",
    projectName: "For Living Milano",
    description:
      "Italian interior design studio — the editorial craft and precision we reference when building premium digital experiences.",
    imageSrc:
      "https://cdn.prod.website-files.com/696a99fdabc03596762256a7/69b2d8a4d4f29968faf5f80a_a33203f4efca1708d662d11231cef221_Share%20Image.jpg",
  },
  {
    status: "live",
    displayUrl: "voxelo.ai",
    siteUrl: "https://www.voxelo.ai/",
    projectType: "Reference · Product Design",
    projectName: "Voxelo",
    description:
      "3D and AI studio — clean product storytelling and motion-forward web design.",
  },
  {
    status: "live",
    displayUrl: "outfit.hellohello.is",
    siteUrl: "https://outfit.hellohello.is/",
    projectType: "Reference · Awwwards SOTD",
    projectName: "Outfit by ++hellohello",
    description:
      "Awwwards Site of the Day — interaction design and animation at the highest level.",
  },
];

function FadeUp({
  reduceMotion,
  delay,
  children,
}: {
  reduceMotion: boolean;
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="h-full"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={
        reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Work — staggered floating parallax collage on md+,
 * simple full-width stack below md.
 */
export function Work() {
  const reduceMotion = useReducedMotion();
  const collageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "end start"],
  });

  // Distinct speeds so cards drift independently through the section
  const andersonY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const magnoliaY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const riverY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="work"
      className="section-fulatelier bg-background"
      aria-labelledby="work-heading"
    >
      <div className="container-fulatelier">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 block font-mono text-[10px] uppercase tracking-[0.2em] text-accent opacity-65">
            FUL://WORK
          </p>
          <h2
            id="work-heading"
            className="font-cormorant text-h2 font-semibold tracking-[-0.02em] text-text md:text-h2-desktop"
          >
            Built to Perform.
          </h2>
        </div>

        {/* Scroll target wraps both layouts so useScroll always has measurable bounds */}
        <div ref={collageRef} className="mt-12 lg:mt-16">
          {/* Mobile — normal stacked flow, no offsets / parallax */}
          <div className="space-y-10 md:hidden">
            {PROJECT_LIST.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                badge={project.badge}
                description={project.description}
                url={project.url}
                featured={project.title === PROJECTS.magnolia.title}
              />
            ))}
          </div>

          {/* Desktop — asymmetric staggered collage with scroll-linked parallax */}
          <div className="relative hidden pt-12 pb-8 md:block lg:pb-12 lg:pt-16">
            <div className="grid grid-cols-3 items-start gap-6 lg:gap-8 xl:gap-10">
              {/* Anderson — left, lower */}
              <motion.div
                className="col-span-1 mt-16 lg:mt-24"
                style={reduceMotion ? undefined : { y: andersonY }}
              >
                <ProjectCard
                  title={PROJECTS.anderson.title}
                  badge={PROJECTS.anderson.badge}
                  description={PROJECTS.anderson.description}
                  url={PROJECTS.anderson.url}
                />
              </motion.div>

              {/* Magnolia — center, higher, visually dominant (featured frame) */}
              <motion.div
                className="relative z-10 col-span-1 -mt-8 lg:-mt-12"
                style={reduceMotion ? undefined : { y: magnoliaY }}
              >
                <ProjectCard
                  title={PROJECTS.magnolia.title}
                  badge={PROJECTS.magnolia.badge}
                  description={PROJECTS.magnolia.description}
                  url={PROJECTS.magnolia.url}
                  featured
                />
              </motion.div>

              {/* River City — right, different lower offset (not mirrored) */}
              <motion.div
                className="col-span-1 mt-10 lg:mt-14"
                style={reduceMotion ? undefined : { y: riverY }}
              >
                <ProjectCard
                  title={PROJECTS.river.title}
                  badge={PROJECTS.river.badge}
                  description={PROJECTS.river.description}
                  url={PROJECTS.river.url}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Reference sites — craft we study */}
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-6 mt-12 text-center font-mono text-[9px] tracking-[0.2em] text-[#A37E2C]/50">
            FUL://REFERENCES — Sites we study
          </p>
          <p className="mb-6 text-center font-inter text-sm italic text-[#8A9AB0]">
            The craft we reference. The standard we build toward.
          </p>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {REFERENCES.map((ref, index) => (
              <FadeUp
                key={ref.displayUrl}
                reduceMotion={Boolean(reduceMotion)}
                delay={index * 0.12}
              >
                <ProjectLinkCard
                  status={ref.status}
                  displayUrl={ref.displayUrl}
                  siteUrl={ref.siteUrl}
                  projectType={ref.projectType}
                  projectName={ref.projectName}
                  description={ref.description}
                  imageSrc={ref.imageSrc}
                />
              </FadeUp>
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
            href={social.facebook}
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
