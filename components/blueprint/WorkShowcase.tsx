"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/blueprint/ProjectCard";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROJECTS = [
  {
    href: "https://craftmen-omega.vercel.app/",
    screenshot: "/work/craftmen.png",
    displayUrl: "craftmen-omega.vercel.app",
    badge: "LUXURY BRAND · CONCEPT",
    name: "Craftmen Eclipse",
    description:
      "Limited edition Swiss watch drop. Edition of 88. $48,000 per piece.",
  },
  {
    href: "https://gym-project.vercel.app/",
    screenshot: "/work/twogs.png",
    displayUrl: "gym-project.vercel.app",
    badge: "STREETWEAR · E-COMMERCE",
    name: "Two G's Supply",
    description:
      "Midnight drop with countdown, cart, and sold-out modal. FW26.",
  },
  {
    href: "https://barber-sharp.vercel.app/",
    screenshot: "/work/sharp.png",
    displayUrl: "barber-sharp.vercel.app",
    badge: "BARBERSHOP · JACKSON MS",
    name: "Sharp Barbershop",
    description:
      "Precision barbershop in Jackson, MS. Booking and full service menu.",
  },
  {
    href: "https://apex-roofing.vercel.app/",
    screenshot: "/work/apex.png",
    displayUrl: "apex-roofing.vercel.app",
    badge: "CONTRACTOR · FULL BUILD",
    name: "Apex Roofing",
    description:
      "Jackson MS roofing company. Before/after slider, lead form, insurance claims workflow.",
  },
  {
    href: "https://loadhunters.vercel.app/",
    screenshot: "/work/loadhunters.png",
    displayUrl: "loadhunters.vercel.app",
    badge: "SAAS PLATFORM · LIVE PRODUCT",
    name: "LoadHunters",
    description:
      "Freight dispatcher detention billing platform. Live SaaS product in active pilot.",
    emphasized: true,
  },
  {
    href: "https://the-villie.vercel.app/",
    screenshot: "/work/villie.png",
    displayUrl: "the-villie.vercel.app",
    badge: "NON-PROFIT · 501(C)(3)",
    name: "The Villie",
    description: "501(c)(3) non-profit community brand.",
  },
] as const;

/**
 * Blueprint work showcase — six real, live projects Gerald has built.
 * Rows: 3 + 3 on desktop, single column on mobile. LoadHunters (the one
 * live SaaS product, not a concept build) gets the brighter gold treatment.
 */
export function WorkShowcase() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.15 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 });

  const [row1, row2] = [PROJECTS.slice(0, 3), PROJECTS.slice(3)];

  return (
    <section
      className="relative w-full border-y border-accent/30 bg-background py-16 md:py-[100px]"
      aria-labelledby="work-showcase-heading"
    >
      <div className="mx-auto max-w-[1100px] px-6 sm:px-8">
        <div ref={headerRef} className="text-center">
          <motion.p
            className="mb-5 font-mono text-[10px] tracking-[0.2em] text-accent/65"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.3 : 0.5, ease: EASE }}
          >
            FUL://WORK
          </motion.p>

          <motion.h2
            id="work-showcase-heading"
            className="font-cormorant text-[34px] font-bold text-text md:text-[52px]"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={
              headerInView
                ? { opacity: 1, y: 0 }
                : reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16 }
            }
            transition={{ duration: reduceMotion ? 0.3 : 0.5, ease: EASE }}
          >
            Built by Fulatelier.
          </motion.h2>

          <motion.p
            className="mx-auto mb-16 mt-4 max-w-xl font-inter text-base text-subtle"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={
              headerInView
                ? { opacity: 1, y: 0 }
                : reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16 }
            }
            transition={{
              duration: reduceMotion ? 0.3 : 0.5,
              delay: reduceMotion ? 0 : 0.08,
              ease: EASE,
            }}
          >
            Six live projects. Every one built from scratch. No templates.
          </motion.p>
        </div>

        <div ref={gridRef}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {row1.map((project, i) => (
              <motion.div
                key={project.name}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={
                  gridInView
                    ? { opacity: 1, y: 0 }
                    : reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: reduceMotion ? 0.3 : 0.4,
                  delay: reduceMotion ? 0 : i * 0.08,
                  ease: EASE,
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex flex-col items-stretch gap-5 md:flex-row md:justify-center">
            {row2.map((project, i) => (
              <motion.div
                key={project.name}
                className="md:w-[45%]"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={
                  gridInView
                    ? { opacity: 1, y: 0 }
                    : reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: reduceMotion ? 0.3 : 0.4,
                  delay: reduceMotion ? 0 : (row1.length + i) * 0.08,
                  ease: EASE,
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <p className="mb-4 font-inter text-[15px] text-subtle">
            Every one of these was built from scratch. No templates. No page
            builders.
          </p>
          <p className="mb-6 font-cormorant text-[28px] font-semibold text-text">
            Yours is next.
          </p>
          <a
            href="#apply"
            className="group inline-flex items-center font-inter text-xs uppercase tracking-[0.1em] text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Apply for your Digital Storefront Blueprint
            <span
              aria-hidden="true"
              className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
