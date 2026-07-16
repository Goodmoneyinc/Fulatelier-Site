"use client";

import { useEffect, useState } from "react";

const DEFAULT_SCRAMBLE_CHARS = [
  ">",
  "_",
  "/",
  ":",
  ".",
  "|",
  "0",
  "1",
  "F",
  "U",
  "L",
] as const;

type ScrambleTextProps = {
  finalText: string;
  startDelay?: number;
  scrambleChars?: readonly string[];
  className?: string;
  /** Skip scramble — show final text immediately (reduced motion). */
  instant?: boolean;
};

function scrambleLike(finalText: string, chars: readonly string[]) {
  return Array.from(finalText, (ch) => {
    if (ch === " ") return " ";
    return chars[Math.floor(Math.random() * chars.length)] ?? ">";
  }).join("");
}

/**
 * Brief character scramble, then instant resolve to final label text.
 * Phase 1 (0–240ms): 3 random swaps every 80ms. Phase 2 (240ms): resolve.
 */
export function ScrambleText({
  finalText,
  startDelay = 0,
  scrambleChars = DEFAULT_SCRAMBLE_CHARS,
  className = "",
  instant = false,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(instant ? finalText : "");
  const [visible, setVisible] = useState(instant);

  useEffect(() => {
    if (instant) {
      setDisplay(finalText);
      setVisible(true);
      return;
    }

    setDisplay("");
    setVisible(false);

    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        setVisible(true);
        setDisplay(scrambleLike(finalText, scrambleChars));
      }, startDelay),
    );

    // Three scramble frames at 0 / 80 / 160ms after start, resolve at 240ms.
    timers.push(
      window.setTimeout(() => {
        setDisplay(scrambleLike(finalText, scrambleChars));
      }, startDelay + 80),
    );
    timers.push(
      window.setTimeout(() => {
        setDisplay(scrambleLike(finalText, scrambleChars));
      }, startDelay + 160),
    );
    timers.push(
      window.setTimeout(() => {
        setDisplay(finalText);
      }, startDelay + 240),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [finalText, startDelay, scrambleChars, instant]);

  if (!visible && !instant) {
    return <span className={className} aria-hidden="true" />;
  }

  return (
    <span className={className} aria-hidden="true">
      {display}
    </span>
  );
}
