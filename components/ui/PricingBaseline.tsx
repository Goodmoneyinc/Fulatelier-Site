"use client";

import { motion } from "framer-motion";

export type PricingBaselineProps = {
  /** Start the baseline draw + ticks. */
  active?: boolean;
  reduceMotion?: boolean;
  /** Fires when the horizontal line finishes (before ticks). */
  onLineComplete?: () => void;
};

/**
 * Desktop-only connecting baseline under the three pricing cards.
 * Line scaleX left→right, then three vertical ticks under each card.
 */
export function PricingBaseline({
  active = false,
  reduceMotion = false,
  onLineComplete,
}: PricingBaselineProps) {
  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-4 hidden h-px md:block"
        aria-hidden="true"
      >
        <div className="relative h-px w-full bg-accent/45">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute top-full h-2 w-px bg-accent/50"
              style={{
                left: `${(i + 0.5) * (100 / 3)}%`,
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 -bottom-4 hidden h-px md:block"
      aria-hidden="true"
    >
      <motion.div
        className="relative h-px w-full origin-left bg-accent/45"
        style={{ willChange: "transform" }}
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, ease: "linear" }}
        onAnimationComplete={() => {
          if (active) {
            onLineComplete?.();
          }
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute top-full h-2 w-px bg-accent/50"
            style={{
              left: `${(i + 0.5) * (100 / 3)}%`,
              transform: "translateX(-50%)",
              willChange: "opacity",
            }}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.15,
              delay: active ? 0.5 + 0.2 + i * 0.08 : 0,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              // Clear will-change after last tick settles
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
