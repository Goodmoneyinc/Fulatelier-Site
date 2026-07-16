"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { BorderDraw } from "@/components/ui/BorderDraw";

const EASE = [0.16, 1, 0.3, 1] as const;

export type ServiceCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  price: string;
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  /** Blueprint system address, e.g. FUL://01 */
  systemLabel?: string;
  /** Section inView — starts this card's unfold sequence. */
  active?: boolean;
  /** Delay from section trigger before this card starts (ms). */
  startDelayMs?: number;
  /** Unroll edge duration (ms). Card 2 uses 720. */
  unrollDurationMs?: number;
  /** Outer resting / draw border color. */
  borderColor?: string;
  /** Investment-box BorderDraw color. */
  investmentBorderColor?: string;
  reduceMotion?: boolean;
};

/**
 * Service offering card — blueprint unfold entrance.
 * Resting state: full 1px gold rectangle (replaces the old 3px top rule).
 * Hover: border brightens, card lifts 4px (motion-safe).
 *
 * Unroll uses clipPath (not height:auto) so the perimeter BorderDraw can
 * render at final card size from frame one — no layout collapse, less mobile jank.
 */
export function ServiceCard({
  icon,
  title,
  description,
  price,
  features,
  ctaLabel,
  ctaHref,
  systemLabel = "FUL://01",
  active = false,
  startDelayMs = 0,
  unrollDurationMs = 600,
  borderColor = "#A37E2C",
  investmentBorderColor = "#A37E2C",
  reduceMotion = false,
}: ServiceCardProps) {
  const [showCssBorder, setShowCssBorder] = useState(reduceMotion);
  const [investDraw, setInvestDraw] = useState(false);
  const [investBg, setInvestBg] = useState(false);
  const [investPrice, setInvestPrice] = useState(false);
  const [underline, setUnderline] = useState(false);

  const startSec = startDelayMs / 1000;
  const unrollSec = unrollDurationMs / 1000;
  const featureBaseMs = 1100;
  const featureStaggerMs = 50;
  const lastFeatureMs =
    featureBaseMs + Math.max(0, features.length - 1) * featureStaggerMs;
  const ctaDelayMs = lastFeatureMs + 80;

  const isPremium = borderColor === "#C9A84C";

  useEffect(() => {
    if (!active) return;

    if (reduceMotion) {
      setShowCssBorder(true);
      setInvestDraw(true);
      setInvestBg(true);
      setInvestPrice(true);
      setUnderline(true);
      return;
    }

    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => setShowCssBorder(true), startDelayMs + 500),
    );
    timers.push(
      window.setTimeout(() => setInvestDraw(true), startDelayMs + 950),
    );
    timers.push(
      window.setTimeout(() => setInvestBg(true), startDelayMs + 950 + 250),
    );
    timers.push(
      window.setTimeout(
        () => setInvestPrice(true),
        startDelayMs + 950 + 250 + 150,
      ),
    );
    timers.push(
      window.setTimeout(
        () => setUnderline(true),
        startDelayMs + ctaDelayMs + 200 + 200,
      ),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [active, reduceMotion, startDelayMs, ctaDelayMs]);

  const restingBorder = showCssBorder
    ? isPremium
      ? "border border-accent-light"
      : "border border-accent"
    : "border border-transparent";

  return (
    <motion.article
      className={[
        "group relative flex h-full flex-col p-8 lg:p-10",
        restingBorder,
        "transition-[transform,border-color] duration-200 ease-out",
        "motion-safe:hover:-translate-y-1 hover:border-accent-light",
        "focus-within:border-accent-light motion-safe:focus-within:-translate-y-1",
      ].join(" ")}
      initial={{
        backgroundColor: "rgba(26, 42, 64, 0)",
      }}
      animate={
        reduceMotion
          ? {
              backgroundColor: active
                ? "rgba(26, 42, 64, 1)"
                : "rgba(26, 42, 64, 0)",
              opacity: active ? 1 : 0,
            }
          : active
            ? {
                backgroundColor: [
                  "rgba(26, 42, 64, 0)",
                  "rgba(26, 42, 64, 0.4)",
                  "rgba(26, 42, 64, 1)",
                ],
              }
            : { backgroundColor: "rgba(26, 42, 64, 0)" }
      }
      transition={
        reduceMotion
          ? { duration: 0.2, ease: "easeOut" }
          : {
              backgroundColor: {
                duration: 0.65,
                delay: startSec,
                times: [0, 500 / 650, 1],
                ease: "linear",
              },
            }
      }
    >
      {!reduceMotion ? (
        <BorderDraw
          active={active}
          color={borderColor}
          duration={0.5}
          delay={startSec}
          ease="linear"
          fadeOutDuration={0.1}
        />
      ) : null}

      <motion.div
        className="relative flex h-full flex-col"
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { clipPath: "inset(0 0 100% 0)" }
        }
        animate={
          reduceMotion
            ? { opacity: active ? 1 : 0 }
            : active
              ? { clipPath: "inset(0 0 0% 0)" }
              : { clipPath: "inset(0 0 100% 0)" }
        }
        transition={
          reduceMotion
            ? { duration: 0.2, ease: "easeOut" }
            : {
                duration: unrollSec,
                delay: startSec + 0.3,
                ease: EASE,
              }
        }
      >
        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute left-0 right-0 z-20 h-px"
            style={{
              willChange: "top",
              background:
                "linear-gradient(to right, transparent 0%, #A37E2C 20%, #A37E2C 80%, transparent 100%)",
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={
              active
                ? {
                    top: "100%",
                    opacity: [0, 0.7, 0.7, 0],
                  }
                : { top: "0%", opacity: 0 }
            }
            transition={{
              top: {
                duration: unrollSec,
                delay: startSec + 0.3,
                ease: "linear",
              },
              opacity: {
                duration: unrollSec,
                delay: startSec + 0.3,
                times: [
                  0,
                  Math.min(0.15, 60 / unrollDurationMs),
                  Math.max(0.85, 1 - 60 / unrollDurationMs),
                  1,
                ],
                ease: "linear",
              },
            }}
            aria-hidden="true"
          />
        ) : null}

        {/* System label + icon */}
        <motion.div
          className="mb-6 text-accent"
          aria-hidden="true"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0.4 }}
          animate={
            active
              ? { opacity: reduceMotion ? 1 : 0.65 }
              : { opacity: reduceMotion ? 0 : 0.4 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.3,
            delay: reduceMotion ? 0 : startSec + 0.7,
            ease: "easeOut",
          }}
        >
          <p className="mb-3 font-mono text-[10px] tracking-[0.15em] text-accent">
            {systemLabel}
          </p>
          {icon}
        </motion.div>

        <motion.h3
          className="font-playfair text-[28px] font-semibold leading-tight tracking-[-0.01em] text-text"
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0.6, y: 6 }
          }
          animate={
            active
              ? reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0 }
              : reduceMotion
                ? { opacity: 0 }
                : { opacity: 0.6, y: 6 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.35,
            delay: reduceMotion ? 0 : startSec + 0.75,
            ease: EASE,
          }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="mt-3 font-inter text-base leading-relaxed text-subtle"
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0.5, y: 4 }
          }
          animate={
            active
              ? reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0 }
              : reduceMotion
                ? { opacity: 0 }
                : { opacity: 0.5, y: 4 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.3,
            delay: reduceMotion ? 0 : startSec + 0.85,
            ease: "easeOut",
          }}
        >
          {description}
        </motion.p>

        {/* Investment specification box */}
        <div className="relative mt-6 p-4">
          {!reduceMotion ? (
            <BorderDraw
              active={investDraw}
              color={investmentBorderColor}
              duration={0.25}
              delay={0}
              ease="linear"
              fadeOutDuration={0.08}
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: investBg || reduceMotion ? 1 : 0,
              transition: reduceMotion ? undefined : "opacity 150ms linear",
              border:
                investBg || reduceMotion
                  ? `1px solid ${investmentBorderColor}`
                  : "1px solid transparent",
              backgroundColor:
                investmentBorderColor === "#C9A84C"
                  ? "rgba(201, 168, 76, 0.06)"
                  : "rgba(163, 126, 44, 0.06)",
            }}
            aria-hidden="true"
          />
          <motion.p
            className="relative font-playfair text-[32px] font-bold leading-none tracking-[-0.02em] text-accent"
            initial={{ opacity: 0 }}
            animate={{
              opacity: investPrice || (reduceMotion && active) ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {price}
          </motion.p>
        </div>

        <ul className="mt-8 flex flex-col gap-3">
          {features.map((feature, i) => (
            <motion.li
              key={feature}
              className="flex gap-3 font-inter text-sm leading-snug text-text"
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 }
              }
              animate={
                active
                  ? reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, x: 0 }
                  : reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -8 }
              }
              transition={{
                duration: reduceMotion ? 0.2 : 0.22,
                delay: reduceMotion
                  ? 0
                  : startSec + featureBaseMs / 1000 + i * (featureStaggerMs / 1000),
                ease: "easeOut",
              }}
            >
              <span className="shrink-0 text-accent" aria-hidden="true">
                →
              </span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <motion.a
            href={ctaHref}
            className={[
              "group/cta relative inline-flex min-h-11 cursor-pointer items-center gap-3",
              "font-inter text-xs font-semibold uppercase tracking-[0.15em] text-text",
              "transition-colors duration-300 ease-out hover:text-gold-light",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            ].join(" ")}
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }
            }
            animate={
              active
                ? reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0 }
                : reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 4 }
            }
            transition={{
              duration: 0.2,
              delay: reduceMotion ? 0 : startSec + ctaDelayMs / 1000,
              ease: "easeOut",
            }}
          >
            <span className="relative">
              {ctaLabel}
              <motion.span
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: underline || (reduceMotion && active) ? 1 : 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.25,
                  ease: EASE,
                }}
                aria-hidden="true"
              />
            </span>
            <span
              aria-hidden="true"
              className="inline-block text-accent transition-transform duration-300 ease-out motion-safe:group-hover/cta:translate-x-1"
            >
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                <path
                  d="M0 6H14M14 6L9 1M14 6L9 11"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </span>
          </motion.a>
        </div>
      </motion.div>
    </motion.article>
  );
}

/** Hand-drawn browser / window frame — line art, no fill. */
export function BrowserWindowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="48"
      height="40"
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="37"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M1.5 11H46.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="6.25" r="1.25" fill="currentColor" />
      <circle cx="13" cy="6.25" r="1.25" fill="currentColor" />
      <circle cx="18" cy="6.25" r="1.25" fill="currentColor" />
      <path
        d="M10 20H28M10 26H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Hand-drawn stacked / layered windows — line art, no fill. */
export function LayeredWindowsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="48"
      height="44"
      viewBox="0 0 48 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="10"
        y="1.5"
        width="36.5"
        height="27"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10 8H46.5" stroke="currentColor" strokeWidth="1.5" />
      <rect
        x="1.5"
        y="12.5"
        width="36.5"
        height="30"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M1.5 19.5H38" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 27H26M9 32.5H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
