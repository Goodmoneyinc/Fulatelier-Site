"use client";

import { motion } from "framer-motion";
import { StepNode } from "@/components/ui/StepNode";

export type TimelineAxisProps = {
  active?: boolean;
  reduceMotion?: boolean;
  /** Horizontal (desktop) or vertical (mobile) spine. */
  orientation?: "horizontal" | "vertical";
  nodeCount?: number;
  /** Delay before the axis line begins drawing (seconds). */
  lineDelay?: number;
  /** Delay before the first node snaps in (seconds). */
  nodesDelay?: number;
  /** Stagger between nodes (seconds). */
  nodeStagger?: number;
  /** Which node is highlighted from column hover (desktop). */
  hoveredIndex?: number | null;
  className?: string;
};

/**
 * Timeline spine — gold axis line with StepNode circles along it.
 * Desktop: scaleX left→right. Mobile: scaleY top→bottom.
 */
export function TimelineAxis({
  active = false,
  reduceMotion = false,
  orientation = "horizontal",
  nodeCount = 4,
  lineDelay = 0.9,
  nodesDelay = 1.3,
  nodeStagger = 0.15,
  hoveredIndex = null,
  className = "",
}: TimelineAxisProps) {
  const vertical = orientation === "vertical";
  const nodes = Array.from({ length: nodeCount }, (_, i) => i);

  return (
    <div
      className={[
        "pointer-events-none absolute z-[1]",
        vertical
          ? "bottom-0 left-0 top-0 w-[10px]"
          : "left-0 right-0 top-0 h-[10px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      {/* Axis line — centered through the 10px nodes */}
      <motion.div
        className={[
          "absolute bg-accent/30",
          vertical
            ? "bottom-0 left-1/2 top-0 w-px origin-top -translate-x-1/2"
            : "left-0 right-0 top-1/2 h-px origin-left -translate-y-1/2",
        ].join(" ")}
        style={{ willChange: "transform" }}
        initial={
          reduceMotion
            ? vertical
              ? { scaleY: 1 }
              : { scaleX: 1 }
            : vertical
              ? { scaleY: 0 }
              : { scaleX: 0 }
        }
        animate={
          active
            ? vertical
              ? { scaleY: 1 }
              : { scaleX: 1 }
            : vertical
              ? { scaleY: reduceMotion ? 1 : 0 }
              : { scaleX: reduceMotion ? 1 : 0 }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: vertical ? 0.6 : 0.8,
                delay: lineDelay,
                ease: "linear",
              }
        }
      />

      {/* Nodes evenly spaced along the axis */}
      {nodeCount > 0 ? (
        <div
          className={[
            "absolute inset-0",
            vertical ? "" : "",
          ].join(" ")}
        >
          {nodes.map((i) => (
            <div
              key={i}
              className="absolute z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={
                vertical
                  ? {
                      left: "50%",
                      top: `${((i + 0.5) / nodeCount) * 100}%`,
                    }
                  : {
                      top: "50%",
                      left: `${((i + 0.5) / nodeCount) * 100}%`,
                    }
              }
            >
              <StepNode
                active={active}
                delay={reduceMotion ? 0 : nodesDelay + i * nodeStagger}
                reduceMotion={reduceMotion}
                highlighted={hoveredIndex === i}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
