"use client";

import { motion } from "framer-motion";

const NODE_EASE = [0.34, 1.4, 0.64, 1] as const;

export type StepNodeProps = {
  /** Start the snap-in animation. */
  active?: boolean;
  /** Delay in seconds before the node appears. */
  delay?: number;
  reduceMotion?: boolean;
  /** Hover fill + scale (driven by parent column hover). */
  highlighted?: boolean;
  className?: string;
};

/**
 * Timeline node — 10px navy-filled circle with gold stroke.
 * Sits on the timeline axis so the line appears to pass through it.
 */
export function StepNode({
  active = false,
  delay = 0,
  reduceMotion = false,
  highlighted = false,
  className = "",
}: StepNodeProps) {
  return (
    <motion.span
      className={[
        "block h-[10px] w-[10px] border border-accent/70 bg-background",
        "transition-[background-color,transform,border-color] duration-200 ease-out",
        highlighted ? "scale-[1.3] !bg-accent border-accent" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ borderRadius: "50%" }}
      aria-hidden="true"
      initial={
        reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
      }
      animate={
        reduceMotion
          ? { opacity: active ? 1 : 0, scale: 1 }
          : active
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.2, delay, ease: NODE_EASE }
      }
    />
  );
}
