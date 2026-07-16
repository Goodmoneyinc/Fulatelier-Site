"use client";

import { useEffect, useRef, useState } from "react";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

type TypewriterTextProps = {
  text: string;
  startDelay?: number;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  /** Skip typing — show full text immediately (reduced motion). */
  instant?: boolean;
  cursorColor?: string;
};

/**
 * Character-by-character typewriter with blinking cursor.
 * Parent should provide aria-label with the final text; this span is aria-live="off".
 */
export function TypewriterText({
  text,
  startDelay = 0,
  speed = 45,
  onComplete,
  className = "",
  instant = false,
  cursorColor = "#C9A84C",
}: TypewriterTextProps) {
  const [visibleCount, setVisibleCount] = useState(instant ? text.length : 0);
  const [showCursor, setShowCursor] = useState(!instant);
  const [started, setStarted] = useState(instant);
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    completedRef.current = false;

    if (instant) {
      setVisibleCount(text.length);
      setShowCursor(false);
      setStarted(true);
      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current?.();
      }
      return;
    }

    setVisibleCount(0);
    setShowCursor(true);
    setStarted(false);

    const startTimer = window.setTimeout(() => {
      setStarted(true);
    }, startDelay);

    return () => window.clearTimeout(startTimer);
  }, [text, startDelay, speed, instant]);

  useEffect(() => {
    if (instant || !started) return;

    if (visibleCount < text.length) {
      const tick = window.setTimeout(() => {
        setVisibleCount((n) => Math.min(n + 1, text.length));
      }, speed);
      return () => window.clearTimeout(tick);
    }

    if (!completedRef.current) {
      completedRef.current = true;
      onCompleteRef.current?.();
    }

    const hideCursor = window.setTimeout(() => {
      setShowCursor(false);
    }, 200);

    return () => window.clearTimeout(hideCursor);
  }, [started, visibleCount, text, speed, instant]);

  return (
    <span className={className} aria-live="off">
      <span aria-hidden="true">
        {text.slice(0, visibleCount)}
        <BlinkingCursor active={showCursor && started} color={cursorColor} />
      </span>
    </span>
  );
}
