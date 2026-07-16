"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BorderDraw } from "@/components/ui/BorderDraw";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;
const PRICE_EASE = [0.34, 1.1, 0.64, 1] as const;

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 7.5L5.5 11L12 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export type PricingCardProps = {
  name: string;
  price: string;
  subtitle: string;
  features: readonly string[];
  delivery: string;
  ctaLabel: string;
  ctaHref?: string;
  popular?: boolean;
  /** Blueprint system address */
  systemLabel?: string;
  active?: boolean;
  /** Delay from section trigger (ms) — looked up by tier identity in Pricing. */
  startDelayMs?: number;
  reduceMotion?: boolean;
  /** Fires when this card finishes Phase 3 (CTA border drawn). */
  onSettled?: () => void;
};

/**
 * Pricing tier card — blueprint unfold with price as the climactic reveal.
 * Authority (popular): goldLight border, top-bar underline, badge + shimmer.
 */
export function PricingCard({
  name,
  price,
  subtitle,
  features,
  delivery,
  ctaLabel,
  ctaHref = "#contact",
  popular = false,
  systemLabel = "FUL://TIER",
  active = false,
  startDelayMs = 0,
  reduceMotion = false,
  onSettled,
}: PricingCardProps) {
  const [showCssBorder, setShowCssBorder] = useState(reduceMotion);
  const [topBar, setTopBar] = useState(false);
  const [badge, setBadge] = useState(false);
  const [priceDraw, setPriceDraw] = useState(false);
  const [priceBg, setPriceBg] = useState(false);
  const [investLabel, setInvestLabel] = useState(false);
  const [priceVisible, setPriceVisible] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [ctaBorder, setCtaBorder] = useState(false);
  const [ctaResting, setCtaResting] = useState(false);
  const onSettledRef = useRef(onSettled);
  const settledOnce = useRef(false);

  useEffect(() => {
    onSettledRef.current = onSettled;
  }, [onSettled]);

  const startSec = startDelayMs / 1000;
  const borderColor = popular ? "#C9A84C" : "#A37E2C";
  const edgeColor = popular ? "#C9A84C" : "#A37E2C";
  const featureBaseMs = 1150;
  const featureStaggerMs = 45;
  const lastFeatureMs =
    featureBaseMs + Math.max(0, features.length - 1) * featureStaggerMs;
  const ctaDelayMs = lastFeatureMs + 100;

  useEffect(() => {
    if (!active) return;
    settledOnce.current = false;

    if (reduceMotion) {
      setShowCssBorder(true);
      setTopBar(true);
      setBadge(true);
      setPriceDraw(true);
      setPriceBg(true);
      setInvestLabel(true);
      setPriceVisible(true);
      setCtaBorder(true);
      setCtaResting(true);
      if (!settledOnce.current) {
        settledOnce.current = true;
        onSettledRef.current?.();
      }
      return;
    }

    const timers: number[] = [];

    // CSS border after Phase 1 draw (420ms)
    timers.push(
      window.setTimeout(() => setShowCssBorder(true), startDelayMs + 420),
    );

    if (popular) {
      timers.push(
        window.setTimeout(() => setTopBar(true), startDelayMs + 420),
      );
      timers.push(
        window.setTimeout(() => setBadge(true), startDelayMs + 420 + 200),
      );
    }

    // Price hero sequence
    timers.push(
      window.setTimeout(() => setPriceDraw(true), startDelayMs + 820),
    );
    timers.push(
      window.setTimeout(() => setPriceBg(true), startDelayMs + 1000),
    );
    timers.push(
      window.setTimeout(() => setInvestLabel(true), startDelayMs + 1100),
    );
    timers.push(
      window.setTimeout(() => {
        setPriceVisible(true);
        if (popular) setShimmer(true);
      }, startDelayMs + 1200),
    );

    // CTA border after settle, then resting chrome
    timers.push(
      window.setTimeout(
        () => setCtaBorder(true),
        startDelayMs + ctaDelayMs + 250 + 150,
      ),
    );
    timers.push(
      window.setTimeout(() => {
        setCtaResting(true);
        if (!settledOnce.current) {
          settledOnce.current = true;
          onSettledRef.current?.();
        }
      }, startDelayMs + ctaDelayMs + 250 + 150 + 200),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [active, reduceMotion, startDelayMs, popular, ctaDelayMs]);

  const restingBorder = showCssBorder
    ? popular
      ? "border border-accent-light"
      : "border border-accent"
    : "border border-transparent";

  return (
    <motion.div
      className={[
        "relative flex h-full flex-col p-8 lg:p-9",
        restingBorder,
        popular ? "lg:-translate-y-4 motion-reduce:lg:translate-y-0" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      initial={{ backgroundColor: "rgba(26, 42, 64, 0)" }}
      animate={
        reduceMotion
          ? {
              backgroundColor: active
                ? "rgba(26, 42, 64, 1)"
                : "rgba(26, 42, 64, 0)",
              opacity: active ? 1 : 0,
            }
          : active
            ? { backgroundColor: "rgba(26, 42, 64, 1)" }
            : { backgroundColor: "rgba(26, 42, 64, 0)" }
      }
      transition={
        reduceMotion
          ? { duration: 0.2, ease: "easeOut" }
          : {
              backgroundColor: {
                duration: 0.35,
                delay: startSec,
                ease: "linear",
              },
            }
      }
    >
      {!reduceMotion ? (
        <BorderDraw
          active={active}
          color={borderColor}
          duration={0.42}
          delay={startSec}
          ease="linear"
          fadeOutDuration={0.1}
        />
      ) : null}

      {/* Authority 3px top underline */}
      {popular ? (
        <motion.div
          className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left bg-accent-light"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: topBar || (reduceMotion && active) ? 1 : 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.2,
            ease: "linear",
          }}
          aria-hidden="true"
        />
      ) : null}

      {popular ? (
        <motion.p
          className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 bg-accent px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-background"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            badge || (reduceMotion && active)
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: reduceMotion ? 1 : 0.9 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.15,
            ease: "easeOut",
          }}
        >
          Most Popular
        </motion.p>
      ) : null}

      <motion.div
        className="relative flex h-full flex-col"
        initial={
          reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
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
                duration: 0.55,
                delay: startSec + 0.28,
                ease: EASE,
              }
        }
      >
        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute left-0 right-0 z-20 h-px"
            style={{
              willChange: "top",
              background: `linear-gradient(to right, transparent 0%, ${edgeColor} 20%, ${edgeColor} 80%, transparent 100%)`,
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={
              active
                ? {
                    top: ["0%", "52%", "52%", "100%"],
                    opacity: [0, 0.7, 0.7, 0.7, 0],
                  }
                : { top: "0%", opacity: 0 }
            }
            transition={{
              top: {
                duration: 0.63,
                delay: startSec + 0.28,
                times: [0, 0.45, 0.55, 1],
                ease: "linear",
              },
              opacity: {
                duration: 0.63,
                delay: startSec + 0.28,
                times: [0, 0.08, 0.45, 0.9, 1],
                ease: "linear",
              },
            }}
            aria-hidden="true"
          />
        ) : null}

        {/* Tier label */}
        <motion.p
          className="font-mono text-[10px] tracking-[0.15em] text-accent"
          initial={{ opacity: reduceMotion ? 0 : 0.4 }}
          animate={
            active
              ? { opacity: reduceMotion ? 1 : 0.65 }
              : { opacity: reduceMotion ? 0 : 0.4 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.3,
            delay: reduceMotion ? 0 : startSec + 0.65,
            ease: "easeOut",
          }}
        >
          {systemLabel}
        </motion.p>

        <motion.h3
          className="mt-3 font-playfair text-2xl font-semibold tracking-[-0.01em] text-text"
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
            delay: reduceMotion ? 0 : startSec + 0.7,
            ease: EASE,
          }}
        >
          {name}
        </motion.h3>

        {/* Price — hero moment */}
        <div className="relative mt-4 p-3">
          {!reduceMotion ? (
            <BorderDraw
              active={priceDraw}
              color={borderColor}
              duration={0.18}
              delay={0}
              ease="linear"
              fadeOutDuration={0.08}
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: priceBg || reduceMotion ? 1 : 0,
              transition: reduceMotion ? undefined : "opacity 100ms linear",
              border:
                priceBg || reduceMotion
                  ? `1px solid ${borderColor}`
                  : "1px solid transparent",
              backgroundColor: popular
                ? "rgba(201, 168, 76, 0.06)"
                : "rgba(163, 126, 44, 0.06)",
            }}
            aria-hidden="true"
          />
          <motion.p
            className="relative font-inter text-[10px] font-semibold uppercase tracking-[0.25em] text-subtle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: investLabel || (reduceMotion && active) ? 1 : 0,
            }}
            transition={{ duration: reduceMotion ? 0.2 : 0.15, ease: "easeOut" }}
          >
            Investment
          </motion.p>
          <div className="relative mt-2 overflow-hidden">
            <motion.p
              className="font-playfair text-[36px] font-bold leading-none tracking-[-0.02em] text-accent"
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
              }
              animate={
                priceVisible || (reduceMotion && active)
                  ? reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1 }
                  : reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.96 }
              }
              transition={{
                duration: reduceMotion ? 0.2 : 0.4,
                ease: reduceMotion ? "easeOut" : PRICE_EASE,
              }}
              style={{ willChange: priceVisible ? "transform, opacity" : "auto" }}
            >
              {price}
            </motion.p>
            {popular && shimmer && !reduceMotion ? (
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(201,168,76,0.08), transparent)",
                  transformOrigin: "left",
                  willChange: "transform",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onAnimationComplete={() => setShimmer(false)}
                aria-hidden="true"
              />
            ) : null}
          </div>
        </div>

        <motion.p
          className="mt-3 font-inter text-[13px] leading-relaxed text-subtle"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.25,
            delay: reduceMotion ? 0 : startSec + 0.9,
            ease: "easeOut",
          }}
        >
          {subtitle}
        </motion.p>

        <div
          className="my-6 h-px w-full bg-accent/40"
          aria-hidden="true"
        />

        {/* Timeline badge */}
        <motion.p
          className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light"
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0, x: -6 }
          }
          animate={
            active
              ? reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, x: 0 }
              : reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -6 }
          }
          transition={{
            duration: reduceMotion ? 0.2 : 0.2,
            delay: reduceMotion ? 0 : startSec + 1.05,
            ease: "easeOut",
          }}
        >
          {delivery}
        </motion.p>

        <ul className="mt-6 flex flex-col gap-3">
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
                duration: reduceMotion ? 0.2 : 0.2,
                delay: reduceMotion
                  ? 0
                  : startSec +
                    featureBaseMs / 1000 +
                    i * (featureStaggerMs / 1000),
                ease: "easeOut",
              }}
            >
              <span className="mt-0.5 shrink-0 text-accent">
                <CheckIcon />
              </span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        <div className="relative mt-auto pt-8">
          <motion.div
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }
            }
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
              duration: reduceMotion ? 0.2 : 0.25,
              delay: reduceMotion ? 0 : startSec + ctaDelayMs / 1000,
              ease: "easeOut",
            }}
          >
            <div className="relative">
              {!reduceMotion ? (
                <BorderDraw
                  active={ctaBorder}
                  color={borderColor}
                  duration={0.2}
                  delay={0}
                  ease="linear"
                  fadeOutDuration={0.08}
                />
              ) : null}
              <Button
                href={ctaHref}
                variant={popular ? "solid" : "outline"}
                className={[
                  "w-full transition-[background-color,border-color,color] duration-150 ease-out",
                  ctaResting || reduceMotion
                    ? ""
                    : popular
                      ? "!border-transparent !bg-transparent !text-accent-light"
                      : "!border-transparent !bg-transparent",
                ].join(" ")}
              >
                {ctaLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
