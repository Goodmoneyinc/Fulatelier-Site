"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { LogoMark } from "@/components/ui/LogoMark";
import { CTAButton } from "@/components/blueprint/CTAButton";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#0A0A0B] pt-28 pb-20"
      aria-labelledby="hero-heading"
    >
      {/* Ambient brass glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-[9999px] bg-[radial-gradient(ellipse_at_center,rgba(163,126,44,0.16),transparent_65%)] blur-[10px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[50vw] rounded-[9999px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08),transparent_70%)] blur-[10px]" />
      </div>

      <BlueprintGrid className="opacity-70" animateIn />

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center px-6 text-center sm:px-8">
        <motion.div {...fadeUp(0)} className="mb-8">
          <LogoMark className="h-14 w-14 opacity-90" />
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mb-6 rounded-[9999px] border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-accent-light/90 backdrop-blur-md"
        >
          Selecting 5 Mississippi Businesses Monthly
        </motion.p>

        <motion.h1
          {...fadeUp(0.16)}
          id="hero-heading"
          className="max-w-[16ch] font-cormorant text-[44px] font-semibold leading-[1.04] tracking-[-0.02em] text-text sm:text-[64px] md:text-[84px]"
        >
          See Your New Website{" "}
          <span className="bg-gradient-to-b from-[#E8CE8E] to-[#A37E2C] bg-clip-text text-transparent">
            Before You Spend a Dollar.
          </span>
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
          <CTAButton href="#apply" className="w-full sm:w-auto">
            Apply for Your Digital Storefront Blueprint
          </CTAButton>
          <a
            href="#portfolio"
            className="group inline-flex min-h-12 items-center gap-2.5 rounded-[9999px] px-4 font-inter text-sm font-medium text-subtle transition-colors duration-200 ease-out hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B872] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]"
          >
            View Recent Work
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </motion.div>

        <motion.p
          {...fadeUp(0.56)}
          className="mt-6 font-inter text-[13px] text-subtle/70"
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
    </section>
  );
}
