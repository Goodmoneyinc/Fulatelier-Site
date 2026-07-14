"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const AMBIENT_START_MS = 1800;
const CIRCLE_PULSE_STAGGER_S = 0.4;
const GRID_STAGGER_S = 0.08;

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
 * After draw-in, a slow ambient loop keeps the blueprint feeling alive.
 */
export function BlueprintSketch({ className = "" }: BlueprintSketchProps) {
  const reduceMotion = useReducedMotion();
  const [ambient, setAmbient] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(() => setAmbient(true), AMBIENT_START_MS);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

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
            delay: ms(delay) + staggerIndex * GRID_STAGGER_S,
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

  const circleMotion = (
    fadeTiming: DrawTiming,
    pulseIndex: number,
  ) => {
    if (reduceMotion) return undefined;

    if (!ambient) {
      return fade(fadeTiming);
    }

    // Continue from post-draw state into a slow staggered pulse
    return {
      animate: { opacity: [0.6, 1], scale: [1, 1.3] },
      transition: {
        duration: 2.5,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "mirror" as const,
        delay: pulseIndex * CIRCLE_PULSE_STAGGER_S,
      },
    };
  };

  const circleOrigin = {
    transformBox: "fill-box" as const,
    transformOrigin: "center",
  };

  const outerFrame = { delay: 200, duration: 500 };
  const chromeBar = { delay: 500, duration: 400 };
  const gridColumns = { delay: 650, duration: 600 };
  const crosshair = { delay: 900, duration: 650 };
  const dimensionLine = { delay: 1300, duration: 400 };
  const registrationMarks = { delay: 1500, duration: 300 };
  const registrationDots = { delay: 1550, duration: 250 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : undefined}
      animate={
        reduceMotion
          ? { opacity: 0.22 }
          : ambient
            ? { opacity: [0.18, 0.28] }
            : undefined
      }
      transition={
        reduceMotion
          ? { duration: 0.5, ease: EASE }
          : ambient
            ? {
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }
            : undefined
      }
    >
      <svg
        viewBox="0 0 1000 700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-auto w-full"
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
            style={circleOrigin}
            {...circleMotion(chromeBar, 0)}
          />
          <motion.circle
            cx="200"
            cy="125"
            r="3"
            fill="currentColor"
            stroke="none"
            style={circleOrigin}
            {...circleMotion(chromeBar, 1)}
          />
          <motion.circle
            cx="220"
            cy="125"
            r="3"
            fill="currentColor"
            stroke="none"
            style={circleOrigin}
            {...circleMotion(chromeBar, 2)}
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
            style={circleOrigin}
            {...circleMotion(registrationDots, 3)}
          />
          <motion.circle
            cx="550"
            cy="350"
            r="3"
            fill="currentColor"
            stroke="none"
            style={circleOrigin}
            {...circleMotion(registrationDots, 4)}
          />
          <motion.circle
            cx="700"
            cy="250"
            r="3"
            fill="currentColor"
            stroke="none"
            style={circleOrigin}
            {...circleMotion(registrationDots, 5)}
          />
        </g>
      </svg>
    </motion.div>
  );
}
