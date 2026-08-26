"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const WORDS = [
  { word: "PRECISION", annotation: "FUL://01 — EVERY DECISION IS INTENTIONAL" },
  { word: "CRAFT", annotation: "FUL://02 — BUILT FROM FIRST PRINCIPLES" },
  { word: "BUILT.", annotation: "FUL://03 — DELIVERED. OWNED BY YOU." },
] as const;

const WORD_CLASS =
  "font-cormorant text-[clamp(72px,16vw,180px)] font-bold uppercase leading-[0.88] tracking-[-0.04em] text-text";

/**
 * Renders a manifesto word; the period in "BUILT." is the gold moment —
 * primary gold use #2 of 3.
 */
function ManifestoWord({ word }: { word: string }) {
  if (word === "BUILT.") {
    return (
      <>
        BUILT
        <span style={{ color: "#A37E2C" }}>.</span>
      </>
    );
  }
  return <>{word}</>;
}

/**
 * Kinetic manifesto — three words slam fullscreen, one per scroll step,
 * while the 400vh section pins its viewport-height stage.
 */
export function Manifesto() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  const sectionRef = useRef<HTMLElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / maxScroll));

      const index = Math.min(WORDS.length - 1, Math.floor(progress * 3));
      setWordIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduceMotion]);

  if (reduceMotion) {
    // Static fallback — all three words stacked in normal document flow.
    return (
      <section
        ref={sectionRef}
        aria-label="Manifesto"
        className="flex flex-col items-center gap-[100px] bg-background py-section-mobile lg:py-section-desktop"
      >
        {WORDS.map(({ word, annotation }) => (
          <div key={word} className="text-center">
            <p className={WORD_CLASS}>
              <ManifestoWord word={word} />
            </p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-accent opacity-55">
              {annotation}
            </p>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Manifesto"
      className="relative bg-background"
      style={{ height: "400vh" }}
    >
      {/* Static copy for screen readers — the animated stage is decorative */}
      <div className="sr-only">
        {WORDS.map(({ word, annotation }) => (
          <p key={word}>
            {word} — {annotation}
          </p>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-background"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={wordIndex}
            className="flex flex-col items-center text-center will-change-transform"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.16, ease: "easeOut" },
            }}
            exit={{
              scale: 1.15,
              opacity: 0,
              transition: { duration: 0.12, ease: "easeOut" },
            }}
          >
            <p className={WORD_CLASS}>
              <ManifestoWord word={WORDS[wordIndex].word} />
            </p>
            <motion.p
              className="mt-6 font-mono text-[10px] tracking-[0.18em] text-accent"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.55,
                transition: { duration: 0.2, delay: 0.18 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.08 } }}
            >
              {WORDS[wordIndex].annotation}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
