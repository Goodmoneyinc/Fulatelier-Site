"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { StepNode } from "@/components/ui/StepNode";
import { TimelineAxis } from "@/components/ui/TimelineAxis";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    number: "01",
    digit: "1",
    title: "Consult",
    description:
      "A free 20-minute call to understand your business, goals, and what success actually looks like for you. No proposal until we both know it's the right fit.",
    detail: "[ FREE · NO OBLIGATION ]",
  },
  {
    number: "02",
    digit: "2",
    title: "Design",
    description:
      "Structure, typography, and layout direction locked to your brand. You review before a single page ships — no surprises at the end of the build.",
    detail: "[ YOUR APPROVAL REQUIRED ]",
  },
  {
    number: "03",
    digit: "3",
    title: "Build",
    description:
      "Next.js engineering with accessibility, performance, and SEO built in from the start — not bolted on as an afterthought.",
    detail: "[ LIGHTHOUSE 90+ TARGET ]",
  },
  {
    number: "04",
    digit: "4",
    title: "Launch",
    description:
      "Deploy, domain, handoff, and a 30–60 day support window so you're never left alone the week after go-live.",
    detail: "[ 30–60 DAY SUPPORT INCLUDED ]",
  },
] as const;

function PhaseBracket({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative mb-12 hidden w-full md:block" aria-hidden="true">
      <motion.span
        className="absolute left-0 top-1/2 h-3 w-px -translate-y-1/2 bg-accent/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.15,
          delay: reduceMotion ? 0 : 1.25,
          ease: "easeOut",
        }}
      />
      <motion.span
        className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-accent/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.15,
          delay: reduceMotion ? 0 : 1.25,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="h-px w-full origin-center bg-accent/35"
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        animate={{ scaleX: active || reduceMotion ? 1 : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.4,
          delay: reduceMotion ? 0 : 0.7,
          ease: "linear",
        }}
      />

      <motion.span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 font-mono text-[9px] tracking-[0.2em] text-accent/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.2,
          delay: reduceMotion ? 0 : 1.35,
          ease: "easeOut",
        }}
      >
        FOUR PHASES
      </motion.span>
    </div>
  );
}

function SectionHeader({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="mx-auto mb-16 max-w-[640px] text-center md:mb-24">
      <motion.p
        className="mb-5 font-mono text-[10px] tracking-[0.2em] text-accent"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 0.65 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.25, ease: "easeOut" }}
      >
        FUL://PROCESS
      </motion.p>

      <div className="relative inline-block w-full">
        {!reduceMotion ? (
          <motion.span
            className="pointer-events-none absolute left-0 top-1/2 z-10 h-px w-full origin-left bg-accent"
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={
              active
                ? { scaleX: [0, 1, 1], opacity: [1, 1, 0] }
                : { scaleX: 0, opacity: 1 }
            }
            transition={{
              duration: 0.45,
              delay: 0.2,
              times: [0, 300 / 450, 1],
              ease: "linear",
            }}
          />
        ) : null}

        <motion.h2
          id="process-heading"
          className="font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.015em] text-text md:text-[56px]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.3,
            delay: reduceMotion ? 0 : 0.2,
            ease: "easeOut",
          }}
        >
          From Call to Launch.
        </motion.h2>
      </div>

      <motion.p
        className="mt-5 font-inter text-[17px] leading-[1.7] text-subtle"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={
          active
            ? reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 6 }
        }
        transition={{
          duration: reduceMotion ? 0.2 : 0.3,
          delay: reduceMotion ? 0 : 0.5,
          ease: "easeOut",
        }}
      >
        A clear path with no black-box phases — you always know what&apos;s
        next.
      </motion.p>
    </div>
  );
}

/**
 * Process — The Timeline.
 * Four phases on a continuous gold thread, styled as a project spec diagram.
 */
export function Process() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="process"
      role="region"
      aria-label="Our process"
      aria-labelledby="process-heading"
      className="w-full border-b border-accent/30 bg-background py-section-mobile md:py-section-desktop"
    >
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeader active={inView} reduceMotion={reduceMotion} />

        <div className="relative mx-auto max-w-[1100px]">
          <PhaseBracket active={inView} reduceMotion={reduceMotion} />

          <div className="relative">
            {/* Desktop horizontal spine + nodes */}
            <div className="relative mb-8 hidden h-[10px] md:block">
              <TimelineAxis
                active={inView}
                reduceMotion={reduceMotion}
                orientation="horizontal"
                nodeCount={4}
                lineDelay={0.9}
                nodesDelay={1.3}
                nodeStagger={0.15}
                hoveredIndex={hoveredIndex}
              />
            </div>

            {/* Mobile vertical spine (line only) */}
            <TimelineAxis
              active={inView}
              reduceMotion={reduceMotion}
              orientation="vertical"
              nodeCount={0}
              lineDelay={0.9}
              className="md:hidden"
            />

            <ol className="relative grid grid-cols-1 gap-0 md:grid-cols-4 md:gap-8">
              {STEPS.map((step, index) => {
                const contentDelay = reduceMotion ? 0 : 1.7 + index * 0.12;
                const detailDelay = contentDelay + 0.2;
                const isLast = index === STEPS.length - 1;
                const hovered = hoveredIndex === index;

                return (
                  <li
                    key={step.number}
                    className={[
                      "group relative pl-6 md:pl-0",
                      !isLast
                        ? "border-b border-accent/30 pb-12 md:border-b-0 md:pb-0"
                        : "",
                    ].join(" ")}
                    aria-label={`Step ${index + 1} of 4: ${step.title}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Mobile node at step midpoint */}
                    <div className="absolute left-0 top-1/2 z-[2] -translate-y-1/2 md:hidden">
                      <StepNode
                        active={inView}
                        delay={reduceMotion ? 0 : 1.3 + index * 0.15}
                        reduceMotion={reduceMotion}
                        highlighted={hovered}
                      />
                    </div>

                    <motion.div
                      initial={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 12 }
                      }
                      animate={
                        inView
                          ? reduceMotion
                            ? { opacity: 1 }
                            : { opacity: 1, y: 0 }
                          : reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 12 }
                      }
                      transition={{
                        duration: reduceMotion ? 0.2 : 0.4,
                        delay: contentDelay,
                        ease: EASE,
                      }}
                    >
                      <p className="mb-2 font-mono text-[10px] tracking-[0.15em] text-accent/65">
                        {step.number}
                      </p>

                      {/* Watermark + title — negative-margin pull-up */}
                      <div className="relative">
                        <motion.div
                          className="pointer-events-none select-none"
                          aria-hidden="true"
                          initial={
                            reduceMotion
                              ? { opacity: 0, scale: 1 }
                              : { opacity: 0, scale: 1.1 }
                          }
                          animate={
                            inView
                              ? { opacity: 1, scale: 1 }
                              : {
                                  opacity: 0,
                                  scale: reduceMotion ? 1 : 1.1,
                                }
                          }
                          transition={{
                            duration: reduceMotion ? 0 : 0.4,
                            delay: contentDelay,
                            ease: EASE,
                          }}
                        >
                          <span
                            className="block font-playfair text-[64px] font-bold leading-none text-accent transition-opacity duration-200 ease-out md:text-[96px] max-md:opacity-[0.08] md:opacity-10"
                            style={{
                              opacity: hovered
                                ? 0.18
                                : undefined,
                            }}
                          >
                            {step.digit}
                          </span>
                        </motion.div>

                        <h3 className="relative z-[1] -mt-10 mb-4 font-playfair text-[18px] font-bold leading-tight text-text md:-mt-14 md:text-[22px]">
                          {step.title}
                        </h3>
                      </div>

                      <p className="mb-5 font-inter text-sm leading-[1.75] text-subtle">
                        {step.description}
                      </p>

                      <motion.p
                        className="mt-3 font-mono text-[9px] tracking-[0.15em] text-accent"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: inView ? (hovered ? 0.8 : 0.5) : 0,
                        }}
                        transition={{
                          duration: reduceMotion ? 0.2 : 0.3,
                          delay: reduceMotion ? 0 : detailDelay,
                          ease: "easeOut",
                        }}
                      >
                        {step.detail}
                      </motion.p>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
