"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { TypewriterText } from "@/components/ui/TypewriterText";

const TYPE_SPEED = 45;
const BOTTOM_TYPE_SPEED = 35;
const COMPILED_DELAY_MS = 200;
const CTA_CROSSFADE_DELAY_MS = 800;

const INIT_LINE = "> INITIALIZING FREE CONSULTATION PROTOCOL_";
const CTA_LINE = "> BOOK YOUR FREE CONSULTATION →";

type StatColumnData = {
  path: string;
  value: string;
  label: string;
  ariaLabel: string;
  typeDelay: number;
};

const COLUMNS: StatColumnData[] = [
  {
    path: "FUL://01",
    value: "5–30 Days",
    label: "DELIVERY TIMELINE",
    ariaLabel: "Delivery timeline: 5 to 30 days",
    typeDelay: 300,
  },
  {
    path: "FUL://02",
    value: "$500–$2,500",
    label: "CUSTOM WEBSITE INVESTMENT",
    ariaLabel: "Custom website investment: $500 to $2,500",
    typeDelay: 700,
  },
  {
    path: "FUL://03",
    value: "Agency Quality",
    label: "QUALITY STANDARD",
    ariaLabel: "Quality standard: Agency Quality",
    typeDelay: 1100,
  },
];

function StatColumn({
  column,
  active,
  reduceMotion,
  onCompiled,
  showDividerBelow,
}: {
  column: StatColumnData;
  active: boolean;
  reduceMotion: boolean;
  onCompiled: () => void;
  showDividerBelow?: boolean;
}) {
  const [showCompiled, setShowCompiled] = useState(false);
  const compiledOnce = useRef(false);

  const markCompiled = useCallback(() => {
    if (compiledOnce.current) return;
    compiledOnce.current = true;
    setShowCompiled(true);
    onCompiled();
  }, [onCompiled]);

  const handleTypeComplete = useCallback(() => {
    if (reduceMotion) {
      markCompiled();
      return;
    }
    window.setTimeout(markCompiled, COMPILED_DELAY_MS);
  }, [markCompiled, reduceMotion]);

  return (
    <div
      className={[
        "flex flex-1 flex-col px-6 py-6 text-left md:px-10 md:py-10",
        showDividerBelow ? "border-b border-accent/25 md:border-b-0" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={column.ariaLabel}
    >
      <p
        className="mb-4 font-mono text-[10px] tracking-[0.15em] text-accent opacity-65"
        aria-hidden="true"
      >
        {active ? column.path : "\u00A0"}
      </p>

      <p
        className="font-playfair text-[32px] font-bold leading-none tracking-[-0.02em] text-accent-light md:text-[44px]"
        aria-label={column.value}
      >
        {active ? (
          <TypewriterText
            text={column.value}
            startDelay={column.typeDelay}
            speed={TYPE_SPEED}
            instant={reduceMotion}
            onComplete={handleTypeComplete}
          />
        ) : (
          <span aria-hidden="true">&nbsp;</span>
        )}
      </p>

      <p className="mt-3 font-inter text-[10px] font-semibold uppercase tracking-[0.25em] text-subtle">
        {active ? (
          <ScrambleText
            finalText={column.label}
            startDelay={column.typeDelay}
            instant={reduceMotion}
          />
        ) : (
          <span aria-hidden="true">&nbsp;</span>
        )}
      </p>

      <p
        className={[
          "mt-4 font-mono text-[9px] text-accent/45 transition-opacity duration-300 ease-out",
          showCompiled ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden="true"
      >
        [COMPILED ✓]
      </p>
    </div>
  );
}

function TerminalFooter({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const [phase, setPhase] = useState<"idle" | "typing" | "cta">("idle");
  const [ctaCursor, setCtaCursor] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setPhase("cta");
      setCtaCursor(false);
      return;
    }
    setPhase("typing");
  }, [active, reduceMotion]);

  const handleInitComplete = useCallback(() => {
    window.setTimeout(() => {
      setPhase("cta");
      setCtaCursor(true);
      window.setTimeout(() => setCtaCursor(false), 530);
    }, CTA_CROSSFADE_DELAY_MS);
  }, []);

  const shellClass = [
    "w-full border-t border-accent/25 px-6 py-5 transition-[background-color,border-color,color] duration-150 ease-out md:px-10",
    phase === "cta" ? "border border-accent bg-transparent hover:bg-accent" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (phase === "cta") {
    return (
      <motion.a
        href="#contact"
        aria-label="Book your free 20-minute consultation"
        className={`${shellClass} group block cursor-pointer`}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <span className="block font-mono text-[11px] text-accent transition-colors duration-150 ease-out group-hover:text-background max-md:text-center">
          {CTA_LINE}
          <BlinkingCursor active={ctaCursor} color="#A37E2C" />
        </span>
      </motion.a>
    );
  }

  return (
    <div className={shellClass}>
      {phase === "idle" ? (
        <span className="font-mono text-[11px] text-accent opacity-0" aria-hidden="true">
          {INIT_LINE}
        </span>
      ) : (
        <p className="font-mono text-[11px] text-accent">
          <TypewriterText
            text={INIT_LINE}
            startDelay={0}
            speed={BOTTOM_TYPE_SPEED}
            cursorColor="#A37E2C"
            onComplete={handleInitComplete}
          />
        </p>
      )}
    </div>
  );
}

/**
 * Layout A — The Terminal Window.
 * Fulatelier build system computing stats in a dark luxury terminal.
 */
export function StatStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  const [compiledCount, setCompiledCount] = useState(0);
  const compiledIds = useRef(new Set<string>());

  const handleCompiled = useCallback((id: string) => {
    if (compiledIds.current.has(id)) return;
    compiledIds.current.add(id);
    setCompiledCount((n) => n + 1);
  }, []);

  const footerActive =
    Boolean(reduceMotion && inView) || compiledCount >= COLUMNS.length;

  return (
    <section
      role="region"
      aria-label="Project specifications"
      className="w-full border-y border-accent/50 bg-background py-[60px] md:py-20"
    >
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-[1100px] bg-background md:border md:border-accent/70"
      >
        <div
          className="hidden h-10 items-center justify-between border-b border-accent/40 bg-footer px-4 md:flex"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2">
            <span className="block h-2 w-2 bg-[#2A3A52]" />
            <span className="block h-2 w-2 bg-[#2A3A52]" />
            <span className="block h-2 w-2 bg-[#2A3A52]" />
          </div>
          <span className="font-mono text-[10px] text-accent/50">
            fulatelier.sys — build output v1.0
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:divide-x md:divide-accent/25">
          {COLUMNS.map((column, index) => (
            <StatColumn
              key={column.path}
              column={column}
              active={inView}
              reduceMotion={reduceMotion}
              onCompiled={() => handleCompiled(column.path)}
              showDividerBelow={index < COLUMNS.length - 1}
            />
          ))}
        </div>

        <TerminalFooter active={footerActive} reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}
