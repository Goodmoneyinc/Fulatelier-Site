"use client";

import { motion } from "framer-motion";

type BlinkingCursorProps = {
  active: boolean;
  color?: string;
};

/**
 * Terminal insertion cursor — blinks while `active`, hidden when not.
 */
export function BlinkingCursor({
  active,
  color = "#C9A84C",
}: BlinkingCursorProps) {
  if (!active) return null;

  return (
    <motion.span
      aria-hidden="true"
      className="inline font-mono"
      style={{ color }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.53, repeat: Infinity, ease: "linear" }}
    >
      |
    </motion.span>
  );
}
