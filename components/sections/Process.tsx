"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Consult",
    description:
      "A free 20-minute call to clarify goals, audience, and scope — before any proposal or invoice.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Structure, typography, and layout direction locked to your brand. You review before a single page ships.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Next.js engineering with accessibility, performance, and SEO baked in — not bolted on at the end.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Deploy, handoff, and a support window so you’re not left alone the week after go-live.",
  },
] as const;

/**
 * Process — how Fulatelier takes a project from call to launch.
 */
export function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="process"
      className="section-fulatelier bg-background"
      aria-labelledby="process-heading"
    >
      <div className="container-fulatelier">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            The Process
          </p>
          <h2
            id="process-heading"
            className="mt-4 font-playfair text-h2 font-bold tracking-[-0.015em] text-text lg:text-h2-desktop"
          >
            From Call to Launch.
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-subtle lg:text-lg">
            A clear path with no black-box phases — you always know what’s next.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, index) => (
            <motion.li
              key={step.number}
              className="border-t border-accent/40 pt-6"
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
              }
              whileInView={
                reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: EASE,
              }}
            >
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">
                {step.number}
              </p>
              <h3 className="mt-3 font-playfair text-[28px] font-semibold tracking-[-0.01em] text-text">
                {step.title}
              </h3>
              <p className="mt-3 font-inter text-sm leading-relaxed text-subtle">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
