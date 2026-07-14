"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { BlueprintSketch } from "@/components/ui/BlueprintSketch";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE_LINES = ["Precision Built.", "Purpose Driven."] as const;

function RevealedWord({
  word,
  delay,
  reduceMotion,
}: {
  word: string;
  delay: number;
  reduceMotion: boolean | null;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
      <motion.span
        className="inline-block will-change-transform"
        initial={
          reduceMotion ? { opacity: 0 } : { opacity: 0, y: "110%" }
        }
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: "0%" }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {word}
      </motion.span>
    </span>
  );
}

function Headline() {
  const reduceMotion = useReducedMotion();
  let wordIndex = 0;

  return (
    <h1
      id="hero-heading"
      className="max-w-[18ch] font-playfair text-h1 font-bold leading-[1.1] tracking-[-0.02em] text-text lg:text-h1-desktop"
    >
      {HEADLINE_LINES.map((line) => {
        const words = line.split(" ");
        return (
          <span key={line} className="block">
            {words.map((word, i) => {
              const delay = 0.4 + wordIndex * 0.06;
              wordIndex += 1;
              return (
                <span key={`${line}-${word}-${i}`}>
                  <RevealedWord
                    word={word}
                    delay={delay}
                    reduceMotion={reduceMotion}
                  />
                  {i < words.length - 1 ? "\u00A0" : null}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

/**
 * Fulatelier hero — full-viewport navy plane.
 * Blueprint grid + elevation sketch + typography; no image, no scroll cue.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 12 },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <BlueprintGrid animateIn />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-4"
        aria-hidden="true"
      >
        <BlueprintSketch className="mx-auto h-auto w-full max-w-[1000px] text-accent opacity-[0.22]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center px-6 py-section-mobile text-center lg:px-8 lg:py-section-desktop">
        <motion.div className="mb-6" {...fadeUp(0.2)}>
          <LogoMark className="h-14 w-14" />
        </motion.div>

        <Headline />

        <motion.p
          className="mt-6 max-w-[480px] font-inter text-lg font-normal leading-relaxed text-subtle"
          {...fadeUp(0.7)}
        >
          Custom websites and web applications built to perform — not just to
          exist.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-8"
          {...fadeUp(0.9)}
        >
          <Button href="#contact" variant="solid">
            Start Your Project
          </Button>
          <ArrowLink href="#work">View Our Work</ArrowLink>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        initial={reduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 1 }}
        whileInView={
          reduceMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }
        }
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE }}
        aria-hidden="true"
      />
    </section>
  );
}
