"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BlueprintHeroGrid } from "@/components/ui/BlueprintHeroGrid";
import { LogoMark } from "@/components/ui/LogoMark";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative" aria-labelledby="hero-heading">
      <BlueprintHeroGrid>
        <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center px-6 pt-28 pb-20 text-center sm:px-8">
          <motion.div {...fadeUp(0)} className="mb-8">
            <LogoMark className="h-14 w-14 opacity-90" />
          </motion.div>

          <motion.p
            {...fadeUp(0.08)}
            className="mb-6 border border-accent/50 bg-transparent px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-accent"
          >
            SELECTING 5 MISSISSIPPI BUSINESSES MONTHLY
          </motion.p>

          <motion.h1
            {...fadeUp(0.16)}
            id="hero-heading"
            className="max-w-[16ch] font-cormorant text-[44px] font-semibold leading-[1.04] tracking-[-0.02em] text-text sm:text-[64px] md:text-[84px]"
          >
            See Your New Website{" "}
            <span className="text-accent-light">Before You Spend a Dollar.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.32)}
            className="mt-7 max-w-[52ch] font-inter text-lg leading-relaxed text-subtle sm:text-xl"
          >
            We&apos;ll design a custom homepage specifically for your business —
            before asking for any payment. Love it, and we build the rest. If
            not, you owe nothing.
          </motion.p>

          <motion.div
            {...fadeUp(0.44)}
            className="mt-11 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6"
          >
            <Button
              href="#apply"
              className="w-full hover:!border-accent hover:!bg-accent sm:w-auto"
            >
              Apply for Your Digital Storefront Blueprint
            </Button>
            <ArrowLink href="#portfolio">View Recent Work</ArrowLink>
          </motion.div>

          <motion.p
            {...fadeUp(0.56)}
            className="mt-6 font-inter text-[13px] text-subtle"
          >
            The Fulatelier Zero-Risk Guarantee™ — no payment until you approve
            the design.
          </motion.p>
        </div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
        >
          <motion.div
            className="h-9 w-px bg-gradient-to-b from-transparent via-accent-light to-transparent"
            animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
      </BlueprintHeroGrid>
    </section>
  );
}
