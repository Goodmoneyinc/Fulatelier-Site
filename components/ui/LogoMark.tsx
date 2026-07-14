"use client";

import { motion, useReducedMotion } from "framer-motion";

type LogoMarkProps = {
  className?: string;
  /** Animate in on mount (scale + opacity). Honors reduced motion. */
  animateIn?: boolean;
  /** Accessible name. Omit when the mark is decorative beside a wordmark. */
  title?: string;
};

/**
 * Geometric "F" mark — thin gold stroke in a diamond frame.
 * Standalone and swappable; pair with the FULATELIER wordmark in Nav.
 */
export function LogoMark({
  className = "",
  animateIn = false,
  title,
}: LogoMarkProps) {
  const reduceMotion = useReducedMotion();
  const isDecorative = !title;

  const mark = (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-9 w-9 shrink-0 ${className}`.trim()}
      aria-hidden={isDecorative ? true : undefined}
      role={isDecorative ? undefined : "img"}
    >
      {!isDecorative ? <title>{title}</title> : null}
      <path
        d="M20 2.5 L37.5 20 L20 37.5 L2.5 20 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="miter"
      />
      <path
        d="M14.5 27.5 V12.5 H25.5 M14.5 20 H22.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );

  if (!animateIn) {
    return <span className="inline-flex text-accent">{mark}</span>;
  }

  return (
    <motion.span
      className="inline-flex text-accent"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {mark}
    </motion.span>
  );
}
