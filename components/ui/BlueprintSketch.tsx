"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type BlueprintSketchProps = {
  className?: string;
};

type DrawTiming = {
  delay: number;
  duration: number;
};

function ms(msValue: number) {
  return msValue / 1000;
}

/**
 * Technical elevation drawing of a browser interface.
 * Six `data-phase` groups are the animation units for the draw-in sequence.
 */
export function BlueprintSketch({ className = "" }: BlueprintSketchProps) {
  const reduceMotion = useReducedMotion();

  const draw = (
    { delay, duration }: DrawTiming,
    staggerIndex = 0,
  ) =>
    reduceMotion
      ? undefined
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: {
            duration: ms(duration),
            delay: ms(delay) + staggerIndex * 0.1,
            ease: EASE,
          },
        };

  const fade = ({ delay, duration }: DrawTiming) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: {
            duration: ms(duration),
            delay: ms(delay),
            ease: EASE,
          },
        };

  const outerFrame = { delay: 500, duration: 700 };
  const chromeBar = { delay: 900, duration: 500 };
  const gridColumns = { delay: 1100, duration: 800 };
  const crosshair = { delay: 1400, duration: 900 };
  const dimensionLine = { delay: 1900, duration: 500 };
  const registrationMarks = { delay: 2200, duration: 400 };
  const registrationDots = { delay: 2500, duration: 400 };

  return (
    <motion.svg
      viewBox="0 0 1000 700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      initial={reduceMotion ? { opacity: 0 } : undefined}
      animate={reduceMotion ? { opacity: 1 } : undefined}
      transition={
        reduceMotion ? { duration: 0.5, ease: EASE } : undefined
      }
    >
      <g data-phase="outer-frame">
        <motion.rect
          x="150"
          y="100"
          width="700"
          height="450"
          {...draw(outerFrame)}
        />
      </g>
      <g data-phase="chrome-bar">
        <motion.line
          x1="150"
          y1="150"
          x2="850"
          y2="150"
          {...draw(chromeBar)}
        />
        <motion.circle
          cx="180"
          cy="125"
          r="3"
          fill="currentColor"
          stroke="none"
          {...fade(chromeBar)}
        />
        <motion.circle
          cx="200"
          cy="125"
          r="3"
          fill="currentColor"
          stroke="none"
          {...fade(chromeBar)}
        />
        <motion.circle
          cx="220"
          cy="125"
          r="3"
          fill="currentColor"
          stroke="none"
          {...fade(chromeBar)}
        />
      </g>
      <g data-phase="grid-columns">
        <motion.line
          x1="350"
          y1="150"
          x2="350"
          y2="550"
          {...draw(gridColumns, 0)}
        />
        <motion.line
          x1="550"
          y1="150"
          x2="550"
          y2="550"
          {...draw(gridColumns, 1)}
        />
        <motion.line
          x1="750"
          y1="150"
          x2="750"
          y2="550"
          {...draw(gridColumns, 2)}
        />
        <motion.line
          x1="150"
          y1="350"
          x2="850"
          y2="350"
          {...draw(gridColumns, 3)}
        />
      </g>
      <g data-phase="crosshair">
        <motion.line
          x1="150"
          y1="100"
          x2="850"
          y2="550"
          {...draw(crosshair)}
        />
        <motion.line
          x1="850"
          y1="100"
          x2="150"
          y2="550"
          {...draw(crosshair)}
        />
      </g>
      <g data-phase="dimension-line">
        <motion.line
          x1="150"
          y1="620"
          x2="850"
          y2="620"
          {...draw(dimensionLine)}
        />
        <motion.line
          x1="150"
          y1="610"
          x2="150"
          y2="630"
          {...draw(dimensionLine)}
        />
        <motion.line
          x1="500"
          y1="610"
          x2="500"
          y2="630"
          {...draw(dimensionLine)}
        />
        <motion.line
          x1="850"
          y1="610"
          x2="850"
          y2="630"
          {...draw(dimensionLine)}
        />
      </g>
      <g data-phase="registration-marks">
        <motion.line
          x1="130"
          y1="100"
          x2="145"
          y2="100"
          {...draw(registrationMarks)}
        />
        <motion.line
          x1="150"
          y1="80"
          x2="150"
          y2="95"
          {...draw(registrationMarks)}
        />
        <motion.line
          x1="855"
          y1="100"
          x2="870"
          y2="100"
          {...draw(registrationMarks)}
        />
        <motion.line
          x1="850"
          y1="80"
          x2="850"
          y2="95"
          {...draw(registrationMarks)}
        />
        <motion.line
          x1="130"
          y1="550"
          x2="145"
          y2="550"
          {...draw(registrationMarks)}
        />
        <motion.line
          x1="150"
          y1="555"
          x2="150"
          y2="570"
          {...draw(registrationMarks)}
        />
        <motion.line
          x1="855"
          y1="550"
          x2="870"
          y2="550"
          {...draw(registrationMarks)}
        />
        <motion.line
          x1="850"
          y1="555"
          x2="850"
          y2="570"
          {...draw(registrationMarks)}
        />
        <motion.circle
          cx="350"
          cy="350"
          r="3"
          fill="currentColor"
          stroke="none"
          {...fade(registrationDots)}
        />
        <motion.circle
          cx="550"
          cy="350"
          r="3"
          fill="currentColor"
          stroke="none"
          {...fade(registrationDots)}
        />
        <motion.circle
          cx="700"
          cy="250"
          r="3"
          fill="currentColor"
          stroke="none"
          {...fade(registrationDots)}
        />
      </g>
    </motion.svg>
  );
}
