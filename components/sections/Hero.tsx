"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DraftingScene } from "@/components/sections/DraftingScene";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";

const EASE = [0.16, 1, 0.3, 1] as const;
const RESOLVE_EASE = [0.34, 1.56, 0.64, 1] as const;
const LOGO_RESOLVE_DELAY = 1.25;

const HEADLINE_LINES = ["Precision Built.", "Purpose Driven."] as const;
const HEADLINE_DELAY = 1.7;

const MOCKUP_MASK =
  "radial-gradient(ellipse 85% 80% at 55% 50%, black 35%, transparent 100%)";

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

function Headline({ alignLeft }: { alignLeft?: boolean }) {
  const reduceMotion = useReducedMotion();
  let wordIndex = 0;

  return (
    <h1
      id="hero-heading"
      className={[
        "max-w-[18ch] font-cormorant text-[56px] font-bold leading-[0.95] tracking-[-0.02em] text-accent-light md:text-[104px]",
        alignLeft ? "text-left" : "text-center",
      ].join(" ")}
      style={{
        textShadow:
          "0 0 8px rgba(10, 22, 40, 1), 0 2px 40px rgba(10, 22, 40, 1), 0 4px 80px rgba(10, 22, 40, 0.95)",
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
 * Fulatelier hero — two-column desktop (copy left / glass mockup right).
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
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

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center px-6 py-section-mobile md:flex-row md:items-center md:gap-10 md:px-8 lg:py-section-desktop xl:gap-14">
        {/* LEFT — copy (55%) */}
        <div className="flex w-full flex-col items-center text-center md:w-[55%] md:items-start md:text-left">
          <motion.div
            className="mb-5 origin-center md:mb-6"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }
            }
            animate={
              reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
            }
            transition={{
              duration: 0.3,
              delay: LOGO_RESOLVE_DELAY,
              ease: reduceMotion ? EASE : RESOLVE_EASE,
            }}
          >
            <LogoMark className="h-20 w-20 md:h-28 md:w-28" />
          </motion.div>

          <motion.p
            className="mb-4 font-mono text-[10px] tracking-[0.2em] text-accent/65"
            {...fadeUp(1.5)}
          >
            FUL://ATELIER
          </motion.p>

          <Headline alignLeft />

          <motion.p
            className="mt-6 max-w-[480px] font-inter text-lg font-normal leading-relaxed text-subtle"
            {...fadeUp(2.0)}
          >
            Custom websites and web applications built to perform — not just to
            exist.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-8 md:items-start"
            {...fadeUp(2.2)}
          >
            <Button href="#contact" variant="solid">
              Start Your Project
            </Button>
            <ArrowLink href="#work">View Our Work</ArrowLink>
          </motion.div>
        </div>

        {/* RIGHT — glass mockup (45%) */}
        <div className="mt-12 flex w-full justify-center md:mt-0 md:w-[45%] md:justify-end">
          <motion.div
            className="relative w-full max-w-[280px] opacity-70 md:max-w-[480px] md:opacity-100"
            style={{
              maskImage: MOCKUP_MASK,
              WebkitMaskImage: MOCKUP_MASK,
            }}
            aria-hidden="true"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -8, 0] }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <DraftingScene className="mx-auto h-auto w-full bg-transparent" />
          </motion.div>
        </div>
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
