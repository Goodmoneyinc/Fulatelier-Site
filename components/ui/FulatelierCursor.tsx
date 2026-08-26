"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Custom cursor — a gold dot tracks the pointer exactly while a larger ring
 * trails behind with spring-like lag. The ring expands over interactive
 * elements. Disabled on touch devices and under reduced motion (the default
 * cursor stays via the media-scoped `cursor: none` rule in globals.css).
 */
export function FulatelierCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const rafId = useRef<number>();

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }
    if ("ontouchstart" in window) return;
    setEnabled(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      hovering.current = Boolean(
        target?.closest?.("a, button, [data-cursor-hover]"),
      );
      if (ringRef.current) {
        ringRef.current.style.opacity = hovering.current ? "0.25" : "0.5";
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        const scale = hovering.current ? 2 : 1;
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) scale(${scale})`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#A37E2C",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: -18,
          left: -18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid #A37E2C",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "opacity 200ms ease-out",
        }}
      />
    </>
  );
}
