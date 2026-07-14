"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const COUNT_DURATION = 1.2;

type RangeStat = {
  kind: "range";
  start: number;
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  format?: (n: number) => string;
};

type TextStat = {
  kind: "text";
  value: string;
  label: string;
};

type Stat = RangeStat | TextStat;

const STATS: Stat[] = [
  {
    kind: "range",
    start: 5,
    end: 30,
    suffix: " Days",
    label: "Delivery Timeline",
  },
  {
    kind: "range",
    start: 500,
    end: 2500,
    prefix: "$",
    label: "Custom Website Investment",
    format: (n) => n.toLocaleString("en-US"),
  },
  {
    kind: "text",
    value: "Agency Quality",
    label: "Without the Agency Price",
  },
];

function formatNumber(n: number, format?: (n: number) => string) {
  const rounded = Math.round(n);
  return format ? format(rounded) : String(rounded);
}

function CountRange({
  start,
  end,
  prefix = "",
  suffix = "",
  format,
  active,
  reduceMotion,
}: {
  start: number;
  end: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
  active: boolean;
  reduceMotion: boolean | null;
}) {
  const startValue = useMotionValue(reduceMotion ? start : 0);
  const endValue = useMotionValue(reduceMotion ? end : 0);

  const startText = useTransform(startValue, (v) =>
    formatNumber(v, format),
  );
  const endText = useTransform(endValue, (v) => formatNumber(v, format));

  useEffect(() => {
    if (!active) return;

    if (reduceMotion) {
      startValue.set(start);
      endValue.set(end);
      return;
    }

    const controlsStart = animate(startValue, start, {
      duration: COUNT_DURATION,
      ease: EASE,
    });
    const controlsEnd = animate(endValue, end, {
      duration: COUNT_DURATION,
      ease: EASE,
    });

    return () => {
      controlsStart.stop();
      controlsEnd.stop();
    };
  }, [active, reduceMotion, start, end, startValue, endValue]);

  return (
    <p
      className="font-playfair text-[40px] font-bold leading-none tracking-[-0.02em] text-text"
      aria-label={`${prefix}${formatNumber(start, format)}–${prefix}${formatNumber(end, format)}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        <motion.span>{startText}</motion.span>
        –
        {prefix}
        <motion.span>{endText}</motion.span>
        {suffix}
      </span>
    </p>
  );
}

function StatColumn({
  stat,
  active,
  reduceMotion,
}: {
  stat: Stat;
  active: boolean;
  reduceMotion: boolean | null;
}) {
  if (stat.kind === "range") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-8 text-center md:py-0">
        <CountRange
          start={stat.start}
          end={stat.end}
          prefix={stat.prefix}
          suffix={stat.suffix}
          format={stat.format}
          active={active}
          reduceMotion={reduceMotion}
        />
        <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">
          {stat.label}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-8 text-center md:py-0"
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }
      }
      animate={
        active
          ? reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, scale: 1 }
          : reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.92 }
      }
      transition={{ duration: COUNT_DURATION, ease: EASE }}
    >
      <p className="font-playfair text-[40px] font-bold leading-none tracking-[-0.02em] text-text">
        {stat.value}
      </p>
      <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">
        {stat.label}
      </p>
    </motion.div>
  );
}

/**
 * Three-column proof strip — flat 80px vertical padding, card surface.
 * Numeric ranges count up in sync; text column uses a matching scale+fade.
 */
export function StatStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="w-full border-y border-accent/40 bg-card py-20"
      aria-label="Studio highlights"
    >
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="flex flex-col divide-y divide-accent/40 md:min-h-[120px] md:flex-row md:divide-x md:divide-y-0">
          {STATS.map((stat) => (
            <StatColumn
              key={stat.label}
              stat={stat}
              active={inView}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
