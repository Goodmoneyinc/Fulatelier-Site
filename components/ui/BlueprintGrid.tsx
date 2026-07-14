"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { colors } from "@/lib/constants";

type BlueprintGridProps = {
  className?: string;
  /** Fade in on mount (opacity only — safe for reduced motion). */
  animateIn?: boolean;
};

/**
 * Faint blueprint grid — gold strokes at 4% opacity, uniform edge-to-edge.
 * No vignette or fade mask. Swappable decorative layer for hero/sections.
 */
export function BlueprintGrid({
  className = "",
  animateIn = false,
}: BlueprintGridProps) {
  const patternId = useId().replace(/:/g, "");

  const grid = (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`.trim()}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M64 0H0V64"
            fill="none"
            stroke={colors.accent}
            strokeOpacity="0.04"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );

  if (!animateIn) {
    return grid;
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      {grid}
    </motion.div>
  );
}
