"use client";

import Image from "next/image";
import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { colors } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;
const GRID_STAGGER_S = 0.04;

/** Phase 2 — wireframe stands upright */
const STAND_DELAY_MS = 900;
const STAND_DURATION_MS = 500;

/** Phase 3 — outline → glass mockup photo (overlaps Phase 2 tail) */
const FILL_DELAY_MS = 1250;
const FILL_DURATION_MS = 350;

type DraftingSceneProps = {
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
 * Hero drafting narrative:
 * 1. Isometric blueprint table — wireframe draws in (pathLength)
 * 2. Wireframe lifts off the table and rotates upright
 * 3. Outline crossfades into /glass-mockup-final.png
 *
 * Phase geometry / pathLength draw helpers extend the technique from
 * `BlueprintSketch` — timings compressed for the drafting-table story.
 */
export function DraftingScene({ className = "" }: DraftingSceneProps) {
  const reduceMotion = useReducedMotion();
  const patternId = useId().replace(/:/g, "");

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

  // Phase 1 timings (0–900ms)
  const outerFrame = { delay: 100, duration: 250 };
  const chromeBar = { delay: 250, duration: 200 };
  const gridColumns = { delay: 350, duration: 300 };
  const crosshair = { delay: 500, duration: 300 };
  const dimensionLine = { delay: 650, duration: 200 };
  const registrationMarks = { delay: 750, duration: 150 };
  const registrationDots = { delay: 800, duration: 100 };
  const logoOutline = { delay: 800, duration: 150 };

  const standTransition = {
    duration: ms(STAND_DURATION_MS),
    delay: ms(STAND_DELAY_MS),
    ease: EASE,
  };

  const fillTransition = {
    duration: ms(FILL_DURATION_MS),
    delay: ms(FILL_DELAY_MS),
    ease: EASE,
  };

  if (reduceMotion) {
    return (
      <div
        className={`pointer-events-none flex items-center justify-center bg-transparent ${className}`.trim()}
        aria-hidden="true"
      >
        <GlassMockupImage />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none flex items-center justify-center ${className}`.trim()}
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      <div
        className="relative w-full max-w-[1000px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Isometric grid plane — recedes as the wireframe lifts */}
        <motion.div
          className="absolute inset-0 origin-center will-change-transform"
          style={{
            transform: "rotateX(55deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.95 }}
          transition={standTransition}
        >
          <svg
            className="h-auto w-full"
            viewBox="0 0 1000 700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id={patternId}
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M48 0H0V48"
                  fill="none"
                  stroke={colors.accent}
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect
              x="40"
              y="40"
              width="920"
              height="620"
              fill={`url(#${patternId})`}
            />
            <rect
              x="40"
              y="40"
              width="920"
              height="620"
              fill="none"
              stroke={colors.accent}
              strokeOpacity="0.12"
              strokeWidth="1"
            />
          </svg>
        </motion.div>

        {/* Wireframe group — drafts flat on the table, then stands upright */}
        <motion.div
          className="relative origin-center will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateX: 55, rotateZ: -45 }}
          animate={{ rotateX: 0, rotateZ: 0 }}
          transition={standTransition}
        >
          {/* Soft lift shadow — clears as the glass photo resolves (no hard box under it) */}
          <motion.div
            className="pointer-events-none absolute left-[12%] right-[12%] top-[78%] h-[8%] rounded-[100%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0, filter: "blur(4px)", scaleX: 0.85 }}
            animate={{
              opacity: [0, 0.55, 0],
              filter: ["blur(4px)", "blur(14px)", "blur(14px)"],
              scaleX: [0.85, 1, 1],
            }}
            transition={{
              duration: ms(STAND_DURATION_MS) + ms(FILL_DURATION_MS),
              delay: ms(STAND_DELAY_MS),
              ease: EASE,
              times: [0, 0.5, 1],
            }}
          />

          {/* Phase 1 wireframe — fades out as Phase 3 fills in */}
          <motion.div
            className="relative bg-transparent text-accent"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={fillTransition}
          >
            <WireframeSketch
              draw={draw}
              fade={fade}
              timings={{
                outerFrame,
                chromeBar,
                gridColumns,
                crosshair,
                dimensionLine,
                registrationMarks,
                registrationDots,
                logoOutline,
              }}
            />
          </motion.div>

          {/* Phase 3 — glass mockup photo (1250ms / 350ms); no wrapper chrome */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fillTransition}
          >
            <GlassMockupImage />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Phase 3 payoff — pre-keyed RGBA glass mockup.
 * No wrapper chrome; `unoptimized` preserves alpha through Next Image.
 */
function GlassMockupImage() {
  return (
    <Image
      src="/glass-mockup-final.png"
      alt=""
      width={800}
      height={450}
      className="h-auto w-full max-w-[880px] bg-transparent object-contain"
      priority
      unoptimized
    />
  );
}

type SketchTimings = {
  outerFrame: DrawTiming;
  chromeBar: DrawTiming;
  gridColumns: DrawTiming;
  crosshair: DrawTiming;
  dimensionLine: DrawTiming;
  registrationMarks: DrawTiming;
  registrationDots: DrawTiming;
  logoOutline: DrawTiming;
};

function WireframeSketch({
  draw,
  fade,
  timings,
}: {
  draw: (
    timing: DrawTiming,
    staggerIndex?: number,
  ) =>
    | {
        initial: { pathLength: number };
        animate: { pathLength: number };
        transition: {
          duration: number;
          delay: number;
          ease: typeof EASE;
        };
      }
    | undefined;
  fade: (timing: DrawTiming) =>
    | {
        initial: { opacity: number };
        animate: { opacity: number };
        transition: {
          duration: number;
          delay: number;
          ease: typeof EASE;
        };
      }
    | undefined;
  timings: SketchTimings;
}) {
  const {
    outerFrame,
    chromeBar,
    gridColumns,
    crosshair,
    dimensionLine,
    registrationMarks,
    registrationDots,
    logoOutline,
  } = timings;

  return (
    <svg
      viewBox="0 0 1000 700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-auto w-full opacity-[0.55]"
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

      {/* Abstract construction-line gesture near favicon / tab mark area */}
      <g data-phase="logo-outline">
        <motion.line
          x1="248"
          y1="118"
          x2="268"
          y2="138"
          {...draw(logoOutline)}
        />
        <motion.line
          x1="268"
          y1="118"
          x2="248"
          y2="138"
          {...draw(logoOutline)}
        />
        <motion.line
          x1="258"
          y1="112"
          x2="258"
          y2="144"
          {...draw(logoOutline)}
        />
        <motion.path
          d="M 242 128 A 10 10 0 0 1 274 128"
          {...draw(logoOutline)}
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
    </svg>
  );
}
