"use client";

import { motion, type Transition } from "framer-motion";

export type BorderDrawProps = {
  /** When true, pathLength animates 0 → 1. */
  active?: boolean;
  /** Stroke color. Defaults to antique gold. */
  color?: string;
  /** Draw duration in seconds. */
  duration?: number;
  /** Delay before draw starts, in seconds. */
  delay?: number;
  /** Motion ease — draftsman's hand defaults to linear. */
  ease?: Transition["ease"];
  /** Stroke width in px (non-scaling). */
  strokeWidth?: number;
  /** Fade the SVG out after the draw completes (seconds). 0 = stay. */
  fadeOutDuration?: number;
  /** Optional fixed size; omit to fill absolutely-positioned parent. */
  width?: number | string;
  height?: number | string;
  className?: string;
  onComplete?: () => void;
};

/**
 * SVG rectangle border drawn via Framer Motion `pathLength`.
 * Fills its parent by default — responsive without stroke-dasharray math.
 * Clockwise: top → right → bottom → left.
 */
export function BorderDraw({
  active = false,
  color = "#A37E2C",
  duration = 0.5,
  delay = 0,
  ease = "linear",
  strokeWidth = 1,
  fadeOutDuration = 0,
  width,
  height,
  className = "",
  onComplete,
}: BorderDrawProps) {
  const sized = width !== undefined || height !== undefined;

  return (
    <motion.svg
      className={[
        "pointer-events-none overflow-visible",
        sized ? "" : "absolute inset-0 z-10 h-full w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      width={width ?? "100%"}
      height={height ?? "100%"}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={
        active && fadeOutDuration > 0
          ? { opacity: 0 }
          : { opacity: 1 }
      }
      transition={
        active && fadeOutDuration > 0
          ? {
              opacity: {
                delay: delay + duration,
                duration: fadeOutDuration,
                ease: "linear",
              },
            }
          : undefined
      }
    >
      <motion.rect
        x={0.5}
        y={0.5}
        width={99}
        height={99}
        stroke={color}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
        fill="none"
        style={{ willChange: "transform" }}
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration, delay, ease }}
        onAnimationComplete={() => {
          if (active) onComplete?.();
        }}
      />
    </motion.svg>
  );
}
