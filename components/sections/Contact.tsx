"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BorderDraw } from "@/components/ui/BorderDraw";
import { social } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function SectionHeader({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="text-center">
      <motion.p
        className="mb-6 font-mono text-[10px] tracking-[0.2em] text-accent"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 0.65 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.25, ease: "easeOut" }}
      >
        FUL://CONTACT
      </motion.p>

      <div className="relative mx-auto inline-block w-full">
        {!reduceMotion ? (
          <motion.span
            className="pointer-events-none absolute left-0 top-1/2 z-10 h-px w-full origin-left bg-accent"
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={
              active
                ? { scaleX: [0, 1, 1], opacity: [1, 1, 0] }
                : { scaleX: 0, opacity: 1 }
            }
            transition={{
              duration: 0.45,
              delay: 0.15,
              times: [0, 300 / 450, 1],
              ease: "linear",
            }}
          />
        ) : null}

        <motion.h2
          id="contact-heading"
          className="mb-6 font-playfair text-h1 font-bold leading-none tracking-[-0.02em] text-text md:text-h1-desktop"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.3,
            delay: reduceMotion ? 0 : 0.15,
            ease: "easeOut",
          }}
        >
          Start Something.
        </motion.h2>
      </div>

      <motion.p
        className="mx-auto mb-14 max-w-[520px] font-inter text-lg leading-[1.7] text-subtle"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={
          active
            ? reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 6 }
        }
        transition={{
          duration: reduceMotion ? 0.2 : 0.3,
          delay: reduceMotion ? 0 : 0.45,
          ease: "easeOut",
        }}
      >
        Every project starts with a free 20-minute conversation — no pitch deck,
        no proposal until we both know it&apos;s the right fit.
      </motion.p>
    </div>
  );
}

function SpecRow({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  leftHref,
  leftAriaLabel,
}: {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
  leftHref?: string;
  leftAriaLabel?: string;
}) {
  const valueClass =
    "font-inter text-sm text-text";
  const goldLinkClass =
    "font-inter text-sm text-accent-light transition-colors duration-150 hover:text-gold-light hover:underline";

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
      <div>
        <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-accent/55">
          {leftLabel}
        </p>
        {leftHref ? (
          <a
            href={leftHref}
            aria-label={leftAriaLabel}
            className={goldLinkClass}
          >
            {leftValue}
          </a>
        ) : (
          <p className={valueClass}>{leftValue}</p>
        )}
      </div>
      <div>
        <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-accent/55">
          {rightLabel}
        </p>
        <p className={valueClass}>{rightValue}</p>
      </div>
    </div>
  );
}

function CommissionPanel({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const [showBorder, setShowBorder] = useState(reduceMotion);
  const [reveal, setReveal] = useState(reduceMotion);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setShowBorder(true);
      setReveal(true);
      return;
    }
    const borderTimer = window.setTimeout(() => setShowBorder(true), 420);
    const revealTimer = window.setTimeout(() => setReveal(true), 280);
    return () => {
      window.clearTimeout(borderTimer);
      window.clearTimeout(revealTimer);
    };
  }, [active, reduceMotion]);

  return (
    <div
      className={[
        "relative mx-auto max-w-[600px] bg-footer p-8 md:p-12",
        showBorder ? "border border-accent/60" : "border border-transparent",
      ].join(" ")}
    >
      {!reduceMotion ? (
        <BorderDraw
          active={active}
          color="#A37E2C"
          duration={0.42}
          delay={0}
          ease="linear"
          fadeOutDuration={0.1}
        />
      ) : null}

      <motion.div
        className="relative z-[1]"
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { clipPath: "inset(0 0 100% 0)", opacity: 0.6 }
        }
        animate={
          reveal
            ? reduceMotion
              ? { opacity: 1 }
              : { clipPath: "inset(0 0 0% 0)", opacity: 1 }
            : reduceMotion
              ? { opacity: 0 }
              : { clipPath: "inset(0 0 100% 0)", opacity: 0.6 }
        }
        transition={
          reduceMotion
            ? { duration: 0.2, ease: "easeOut" }
            : { duration: 0.55, ease: EASE }
        }
      >
        <SpecRow
          leftLabel="STUDIO"
          leftValue="Fulatelier LLC"
          rightLabel="LOCATION"
          rightValue="Jackson, Mississippi"
        />

        <div
          className="my-6 h-px w-full bg-accent/40"
          aria-hidden="true"
        />

        <SpecRow
          leftLabel="EMAIL"
          leftValue="hello@fulatelier.com"
          leftHref="mailto:hello@fulatelier.com"
          leftAriaLabel="Email Fulatelier at hello@fulatelier.com"
          rightLabel="RESPONSE TIME"
          rightValue="Within 24 hours"
        />

        <div
          className="my-6 h-px w-full bg-accent/40"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href="mailto:hello@fulatelier.com"
            aria-label="Email Fulatelier at hello@fulatelier.com"
            className="border border-accent bg-transparent px-0 py-4 text-center font-inter text-xs uppercase tracking-[0.1em] text-text transition-[background-color,color] duration-150 ease-out hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
          >
            EMAIL THE STUDIO →
          </a>
          <a
            href="#pricing"
            className="border border-accent/40 bg-transparent px-0 py-4 text-center font-inter text-xs uppercase tracking-[0.1em] text-subtle transition-[border-color,color] duration-150 ease-out hover:border-accent hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
          >
            REVIEW PRICING →
          </a>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Contact — closing commission panel. Every project starts here.
 */
export function Contact() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section
      ref={sectionRef}
      id="contact"
      role="region"
      aria-label="Contact"
      aria-labelledby="contact-heading"
      className="w-full border-t border-accent/30 bg-background py-section-mobile md:py-section-desktop"
    >
      <div className="relative mx-auto max-w-[720px] px-6 lg:px-8">
        <SectionHeader active={inView} reduceMotion={reduceMotion} />

        <CommissionPanel active={inView} reduceMotion={reduceMotion} />

        <div className="mt-8 text-center">
          <p className="mb-3 font-inter text-sm text-subtle">
            Prefer to talk it through first?
          </p>
          <ArrowLink
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send a message on Facebook (opens in new tab)"
          >
            Send a message on Facebook
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
