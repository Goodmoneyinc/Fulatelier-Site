"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/blueprint/Reveal";
import { SectionHeading } from "@/components/blueprint/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    title: "Discover",
    body: "A short conversation about your business, your customers, and what success looks like — so the design has a purpose from the first pixel.",
  },
  {
    title: "Design Your Homepage",
    body: "We build a real, custom homepage concept for your business. Not a template. Not a mockup guess. An actual working design.",
  },
  {
    title: "Review Together",
    body: "We walk through the design with you and explain every decision — then get your honest reaction, good or bad.",
  },
  {
    title: "Approve",
    body: "If it's right, you say yes. There's no pressure and no invoice until this exact moment.",
  },
  {
    title: "Build",
    body: "Once approved, we build the full site — fast, precise, and true to what you signed off on.",
  },
] as const;

export function BlueprintTimeline() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.3 });

  return (
    <section
      id="process"
      className="relative w-full bg-[#0E0E10] py-24 md:py-32"
      aria-labelledby="timeline-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <SectionHeading
          eyebrow="The Blueprint"
          id="timeline-heading"
          title="Five Steps. Zero Risk."
          description="A clear, guided path from first conversation to launch — you always know exactly what's next."
        />

        <div className="relative mt-20">
          <div
            ref={lineRef}
            className="absolute left-[19px] top-0 hidden h-full w-px bg-white/[0.08] lg:left-0 lg:top-[19px] lg:h-px lg:w-full lg:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-accent via-accent-light to-accent"
              initial={{ scaleX: reduceMotion ? 1 : 0 }}
              animate={{ scaleX: lineInView ? 1 : reduceMotion ? 1 : 0 }}
              transition={{ duration: 1.1, ease: EASE }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <div
            className="absolute left-[19px] top-0 w-px bg-gradient-to-b from-accent via-accent-light to-accent lg:hidden"
            aria-hidden="true"
            style={{
              height: lineInView || reduceMotion ? "100%" : "0%",
              transition: "height 1.1s cubic-bezier(0.16,1,0.3,1)",
            }}
          />

          <ol className="relative flex flex-col gap-10 lg:grid lg:grid-cols-5 lg:gap-6">
            {STEPS.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={0.1 * index}
                className="relative flex gap-6 pl-[52px] lg:flex-col lg:gap-0 lg:pl-0"
              >
                <div className="absolute left-0 top-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-[9999px] border border-accent-light/50 bg-[#0E0E10] font-cormorant text-base font-semibold text-accent-light lg:relative">
                  {index + 1}
                </div>

                <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-md lg:mt-8">
                  <h3 className="font-cormorant text-[22px] font-semibold leading-tight tracking-[-0.01em] text-text">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-inter text-[14px] leading-[1.7] text-subtle">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
