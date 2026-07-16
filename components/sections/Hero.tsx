"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DraftingScene } from "@/components/sections/DraftingScene";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Back-out / overshoot — logo "clicks into place" as the mockup fills in */
const RESOLVE_EASE = [0.34, 1.56, 0.64, 1] as const;

/** Sync with DraftingScene Phase 3 fill-in (1250ms) */
const LOGO_RESOLVE_DELAY = 1.25;

const HEADLINE_LINES = ["Precision Built.", "Purpose Driven."] as const;
const HEADLINE_DELAY = 1.7;

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
      style={{
        WebkitTextStroke: "1.5px #0A1628",
        paintOrder: "stroke fill",
      }}
    >
      {HEADLINE_LINES.map((line) => {
        const words = line.split(" ");
        return (
          <span key={line} className="block">
            {words.map((word, i) => {
              const delay = HEADLINE_DELAY + wordIndex * 0.06;
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
 * Stack: atmospheric bg (z-0) → left compass blend (z-[1]) → DraftingScene (z-10) → copy (z-10).
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
      {/* z-0 — full-bleed atmospheric base (blueprint left / glass corner shard right) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Image
          src="/hero-bg-final.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* z-[1] — compass, left 42% only; linear mask dissolves before center */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[42%] opacity-45 mix-blend-screen"
        style={{
          maskImage: "linear-gradient(to right, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 50%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <Image
          src="/dark-atelier-wide-final.png"
          alt=""
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      {/* DraftingScene — center empty region of the atmospheric plate */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4"
        aria-hidden="true"
      >
        <DraftingScene className="mx-auto h-auto w-full max-w-[1000px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center px-6 py-section-mobile text-center lg:px-8 lg:py-section-desktop">
        <motion.div
          className="mb-6 origin-center"
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }
          }
          animate={
            reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
          }
          transition={{
            duration: 0.3,
            delay: 1.3,
            ease: reduceMotion ? EASE : RESOLVE_EASE,
          }}
        >
          <LogoMark className="h-28 w-28 md:h-40 md:w-40" />
        </motion.div>

        <Headline />

        <motion.p
          className="mt-6 max-w-[480px] font-inter text-lg font-normal leading-relaxed text-subtle"
          {...fadeUp(2.0)}
        >
          Custom websites and web applications built to perform — not just to
          exist.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-8"
          {...fadeUp(2.2)}
        >
          <Button href="#contact" variant="solid">
            Start Your Project
          </Button>
          <ArrowLink href="#work">View Our Work</ArrowLink>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 h-px origin-left bg-accent"
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
