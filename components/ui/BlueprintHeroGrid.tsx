"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const GRID_SPACING = 48;
const GRID_SPEED = 0.3;
const REVEAL_RADIUS_PX = 380;

type FulatelierGridProps = {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
  color: string;
};

function FulatelierGrid({ offsetX, offsetY, color }: FulatelierGridProps) {
  const patternId = `fulatelier-grid-${color.replace("#", "")}`;

  return (
    <svg className="h-full w-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id={patternId}
          width={GRID_SPACING}
          height={GRID_SPACING}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <line x1="0" y1="0" x2={GRID_SPACING} y2="0" stroke={color} strokeWidth={0.6} />
          <line x1="0" y1="0" x2="0" y2={GRID_SPACING} stroke={color} strokeWidth={0.6} />
          <circle cx="0" cy="0" r={1} fill={color} opacity={0.4} />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

/**
 * Blueprint page hero background — a slowly drifting gold drafting grid
 * (Fulatelier brand colors only) with a mouse-reveal spotlight. Scoped to
 * /blueprint; the sitewide BlueprintGrid component is untouched.
 */
export function BlueprintHeroGrid({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    if (reduceMotion) return;
    gridOffsetX.set((gridOffsetX.get() + GRID_SPEED) % GRID_SPACING);
    gridOffsetY.set((gridOffsetY.get() + GRID_SPEED) % GRID_SPACING);
  });

  const maskImage = useMotionTemplate`radial-gradient(${REVEAL_RADIUS_PX}px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A1628" }}
    >
      {/* Base grid — always visible, faint */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07] md:opacity-[0.04]"
        aria-hidden="true"
      >
        <FulatelierGrid offsetX={gridOffsetX} offsetY={gridOffsetY} color="#A37E2C" />
      </div>

      {/* Mouse-reveal grid — brighter gold, visible only under the cursor */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.18]"
        style={{ maskImage, WebkitMaskImage: maskImage }}
        aria-hidden="true"
      >
        <FulatelierGrid offsetX={gridOffsetX} offsetY={gridOffsetY} color="#C9A84C" />
      </motion.div>

      {/* Radial vignette — keeps content readable over the grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(10, 22, 40, 0.6) 70%, rgba(10, 22, 40, 0.92) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
