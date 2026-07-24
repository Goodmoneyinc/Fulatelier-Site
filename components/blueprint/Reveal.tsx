"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to delay this element's entrance after its group triggers. */
  delay?: number;
  /** Vertical offset (px) the element travels in from. */
  y?: number;
  /** Viewport fraction that must be visible before triggering. */
  amount?: number;
  as?: "div" | "li";
};

/**
 * Scroll-triggered fade + rise — the base entrance motion for Blueprint
 * page content. Honors prefers-reduced-motion (opacity only, no travel).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
  amount = 0.3,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as RefObject<Element>, {
    once: true,
    amount,
  });
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion ? { opacity: 0 } : { opacity: 0, y };
  const animate = inView
    ? { opacity: 1, y: 0 }
    : reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y };
  const transition = {
    duration: reduceMotion ? 0.3 : 0.7,
    delay: reduceMotion ? 0 : delay,
    ease: EASE,
  };

  if (as === "li") {
    return (
      <motion.li
        ref={ref as RefObject<HTMLLIElement>}
        className={className}
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      ref={ref as RefObject<HTMLDivElement>}
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
