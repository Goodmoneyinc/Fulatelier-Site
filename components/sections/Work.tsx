"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectLinkCard } from "@/components/ui/ProjectLinkCard";
import { social } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const REFERENCES: {
  status: "live";
  displayUrl: string;
  siteUrl: string;
  projectType: string;
  projectName: string;
  description: string;
  imageSrc: string;
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
    imageSrc:
      "https://www.voxelo.ai/opengraph-image.png?opengraph-image.2pg3g7ibz2vq7.png",
  },
  {
    status: "live",
    displayUrl: "outfit.hellohello.is",
    siteUrl: "https://outfit.hellohello.is/",
    projectType: "Reference · Awwwards SOTD",
    projectName: "Outfit by ++hellohello",
    description:
      "Awwwards Site of the Day — interaction design and animation at the highest level.",
    imageSrc:
      "https://outfit.hellohello.is/opengraph-image.png?opengraph-image.6e3a848f.png",
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
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
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
 * Work — reference sites that set the craft standard.
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
          <p className="mb-6 font-mono text-[9px] tracking-[0.2em] text-[#A37E2C]/50">
            FUL://REFERENCES — Sites we study
          </p>
          <h2
            id="work-heading"
            className="font-inter text-sm font-normal italic leading-relaxed text-[#8A9AB0]"
          >
            The craft we reference. The standard we build toward.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-[1100px] lg:mt-14">
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
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
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
