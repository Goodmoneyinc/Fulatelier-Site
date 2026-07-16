"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "@/components/ui/LogoMark";
import { colors } from "@/lib/constants";

const STORAGE_KEY = "fulatelier_intro_seen";
const EASE = [0.16, 1, 0.3, 1] as const;
const EXIT_EASE = [0.76, 0, 0.24, 1] as const;
const WORDMARK = "FULATELIER";

/**
 * Eight construction rays from center — diamond / F-mark geometry
 * (cardinals + diagonals), same spirit as DraftingScene logo-outline.
 * viewBox 0 0 100 100, origin at 50,50.
 */
const CONSTRUCTION_LINES = [
  { x1: 50, y1: 50, x2: 50, y2: 4 }, // N
  { x1: 50, y1: 50, x2: 96, y2: 50 }, // E
  { x1: 50, y1: 50, x2: 50, y2: 96 }, // S
  { x1: 50, y1: 50, x2: 4, y2: 50 }, // W
  { x1: 50, y1: 50, x2: 88, y2: 12 }, // NE
  { x1: 50, y1: 50, x2: 88, y2: 88 }, // SE
  { x1: 50, y1: 50, x2: 12, y2: 88 }, // SW
  { x1: 50, y1: 50, x2: 12, y2: 12 }, // NW
] as const;

/**
 * First-visit session intro — fixed overlay above Nav (z-100).
 * Defaults hidden to avoid flash for returning visitors; mounts only
 * after sessionStorage check confirms the key is absent.
 */
export function IntroReveal() {
  const reduceMotion = useReducedMotion();
  const [shouldShowIntro, setShouldShowIntro] = useState(false);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      setShouldShowIntro(true);
    } catch {
      // sessionStorage unavailable — skip intro entirely
    }
  }, []);

  const completeExit = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore quota / private-mode failures
    }
    setShouldShowIntro(false);
    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
  }, []);

  // Schedule exit: full timeline at 3600ms, or reduced-motion hold 1000ms
  useEffect(() => {
    if (!shouldShowIntro) return;

    const delayMs = reduceMotion ? 1000 : 3600;
    const timer = window.setTimeout(() => setPhase("exit"), delayMs);
    return () => window.clearTimeout(timer);
  }, [shouldShowIntro, reduceMotion]);

  if (!shouldShowIntro) return null;

  const skipStagger = Boolean(reduceMotion);

  return (
    <motion.div
      role="status"
      aria-label="Loading Fulatelier"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      initial={false}
      animate={
        phase === "exit"
          ? reduceMotion
            ? { opacity: 0 }
            : { y: "-100vh" }
          : { opacity: 1, y: 0 }
      }
      transition={
        phase === "exit"
          ? reduceMotion
            ? { duration: 0.25, ease: EASE }
            : { duration: 0.6, ease: EXIT_EASE }
          : undefined
      }
      onAnimationComplete={() => {
        if (phase === "exit") completeExit();
      }}
    >
      {/* Layer 1 — background + navy veil */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/dark-atelier-wide-final.png"
          alt=""
          fill
          className="object-cover object-left"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-background"
          initial={skipStagger ? { opacity: 0.72 } : { opacity: 0.9 }}
          animate={{ opacity: 0.72 }}
          transition={
            skipStagger
              ? { duration: 0 }
              : { duration: 0.6, delay: 1, ease: EASE }
          }
        />
      </div>

      {/* Layer 2 — blueprint construction lines */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        fill="none"
      >
        {CONSTRUCTION_LINES.map((line, i) => (
          <motion.line
            key={`${line.x2}-${line.y2}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={colors.accent}
            strokeWidth={0.6}
            vectorEffect="non-scaling-stroke"
            initial={skipStagger ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={
              skipStagger
                ? { duration: 0 }
                : {
                    duration: 0.8,
                    delay: 0.2 + i * 0.1,
                    ease: EASE,
                  }
            }
          />
        ))}
      </svg>

      {/* Layers 3–6 — centered brand stack */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="flex h-[72px] w-[72px] items-center justify-center"
          initial={
            skipStagger ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            skipStagger
              ? { duration: 0 }
              : { duration: 0.4, delay: 1, ease: EASE }
          }
        >
          <LogoMark className="h-[72px] w-[72px]" />
        </motion.div>

        <p
          className="mt-6 font-cormorant text-[20px] font-semibold tracking-[0.35em] text-text md:text-[28px]"
          aria-label="Fulatelier"
        >
          {WORDMARK.split("").map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block"
              initial={
                skipStagger ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                skipStagger
                  ? { duration: 0 }
                  : {
                      duration: 0.12,
                      delay: 1.4 + i * 0.06,
                      ease: EASE,
                    }
              }
            >
              {char}
            </motion.span>
          ))}
        </p>

        <motion.p
          className="mt-2.5 font-inter text-[10px] font-medium tracking-[0.3em] text-subtle"
          initial={skipStagger ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            skipStagger
              ? { duration: 0 }
              : { duration: 0.3, delay: 2.1, ease: EASE }
          }
        >
          LLC
        </motion.p>

        <motion.div
          className="mt-8 h-px w-screen origin-left bg-accent"
          initial={skipStagger ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={
            skipStagger
              ? { duration: 0 }
              : { duration: 0.3, delay: 2.8, ease: EASE }
          }
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
