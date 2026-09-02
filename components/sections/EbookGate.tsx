"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLink } from "@/components/ui/ArrowLink";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Formspree endpoint for ebook downloads.
 *
 * Gerald: create a dedicated form at formspree.io named
 * "Fulatelier Ebook — Playbook Download", then replace YOUR_FORM_ID
 * below with the real endpoint (https://formspree.io/f/XXXXXXXX).
 * Every submission emails fulatelier@gmail.com with the visitor's
 * name and email; reply manually with the download link until
 * volume justifies a paid Formspree autoresponder.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const CHAPTERS = [
  "The Digital Shift",
  "Starting Small",
  "AI as Leverage",
  "Start With a Problem",
  "10 Digital Business Opportunities",
  "Side Hustle to Business",
  "The Digital Business Stack",
  "Build Before You Believe",
  "30-Day Digital Business Challenge",
  "When You Outgrow DIY",
] as const;

/* ────────────────────────────────────────────────────────────
   Book cover — CSS-built mockup
   ──────────────────────────────────────────────────────────── */

function BookCover() {
  return (
    <div
      className="relative w-[200px] shrink-0 border border-accent/60 bg-footer md:w-[280px]"
      style={{
        aspectRatio: "3 / 4",
        boxShadow: "8px 8px 0px rgba(163,126,44,0.3)",
      }}
    >
      <div className="h-1 w-full bg-accent" aria-hidden="true" />

      <div className="flex h-full flex-col p-6">
        <p className="mb-3 font-mono text-[7px] tracking-[0.2em] text-accent">
          FULATELIER LLC
        </p>

        <p className="font-cormorant text-[28px] font-bold leading-[0.95] text-text">
          FROM
        </p>
        <p className="font-cormorant text-[36px] font-bold leading-[0.95] text-text">
          SIDE
        </p>
        <p className="font-cormorant text-[42px] font-bold leading-[0.95] text-accent">
          HUSTLE
        </p>
        <p className="mt-2 font-inter text-[10px] font-semibold tracking-[0.15em] text-text">
          TO DIGITAL BUSINESS
        </p>

        <div className="my-4 h-px w-full bg-accent/40" aria-hidden="true" />

        <p className="font-inter text-[8px] leading-[1.5] text-subtle">
          The Modern Playbook for Building,
          <br />
          Selling, and Scaling With AI
        </p>

        <div className="mt-auto">
          <p className="font-mono text-[7px] tracking-[0.15em] text-accent">
            10 CHAPTERS — FREE
          </p>
        </div>
      </div>

      <div className="h-[3px] w-full bg-accent/60" aria-hidden="true" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Chapter list — shared between the always-visible desktop
   rendering and the collapsible mobile rendering.
   ──────────────────────────────────────────────────────────── */

function ChapterRow({
  chapter,
  index,
  reveal,
  reduceMotion,
}: {
  chapter: string;
  index: number;
  reveal: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.li
      className="flex items-center gap-2.5 border-b border-card py-2"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
      animate={reveal ? { opacity: 1 } : undefined}
      transition={{
        duration: reduceMotion ? 0.2 : 0.3,
        delay: reduceMotion ? 0 : 0.4 + index * 0.04,
        ease: "easeOut",
      }}
    >
      <span className="font-inter text-xs text-accent" aria-hidden="true">
        →
      </span>
      <span className="font-inter text-[11px] text-subtle">{chapter}</span>
    </motion.li>
  );
}

function ChaptersDesktop({ reveal, reduceMotion }: { reveal: boolean; reduceMotion: boolean }) {
  return (
    <div className="hidden md:block">
      <p className="mb-4 mt-7 font-inter text-[11px] tracking-[0.05em] text-subtle">
        What&apos;s inside:
      </p>
      <ul>
        {CHAPTERS.map((chapter, index) => (
          <ChapterRow
            key={chapter}
            chapter={chapter}
            index={index}
            reveal={reveal}
            reduceMotion={reduceMotion}
          />
        ))}
      </ul>
      <p className="mt-6 font-mono text-[8px] text-accent/50">
        32 pages. No fluff. No paywall.
      </p>
    </div>
  );
}

function ChaptersMobile() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full py-2 text-left font-inter text-[11px] tracking-[0.05em] text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        See all 10 chapters {expanded ? "↑" : "↓"}
      </button>
      {expanded ? (
        <ul className="mt-2">
          {CHAPTERS.map((chapter) => (
            <li
              key={chapter}
              className="flex items-center gap-2.5 border-b border-card py-2"
            >
              <span className="font-inter text-xs text-accent" aria-hidden="true">
                →
              </span>
              <span className="font-inter text-[11px] text-subtle">{chapter}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-4 font-mono text-[8px] text-accent/50">
        32 pages. No fluff. No paywall.
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   The form
   ──────────────────────────────────────────────────────────── */

type Status = "idle" | "loading" | "success" | "error";

function SuccessPanel() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="border border-accent bg-footer px-8 py-10 text-center"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#A37E2C"
        strokeWidth="2"
        className="mx-auto"
        aria-hidden="true"
      >
        <path d="M20 6L9 17l-5-5" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>

      <h2 className="mt-4 font-cormorant text-[28px] font-bold text-text">
        It&apos;s on its way.
      </h2>
      <p className="mt-2 font-inter text-sm leading-[1.7] text-subtle">
        Check your inbox — your copy of From Side Hustle to Digital Business
        is heading there now.
      </p>

      <div className="my-5 h-px w-full bg-accent/40" aria-hidden="true" />

      <p className="font-mono text-[9px] tracking-[0.15em] text-accent">
        While you wait:
      </p>

      <div className="mt-4 flex flex-col items-center gap-3">
        <ArrowLink href="/#work" className="!text-accent">
          See what Fulatelier builds
        </ArrowLink>
        <ArrowLink href="/blueprint" className="!text-accent">
          Apply for your free website design
        </ArrowLink>
      </div>
    </div>
  );
}

function EbookForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return <SuccessPanel />;

  const fieldClass =
    "w-full border border-accent/30 bg-background px-4 py-3 font-inter text-sm text-text outline-none transition-[border-color,background-color] duration-150 ease-out placeholder:text-subtle focus:border-accent/80 focus:bg-[#0D1E35]";

  const labelClass =
    "mb-1.5 block font-mono text-[8px] tracking-[0.15em] text-accent";

  return (
    <div className="border border-accent/35 bg-footer p-8">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <input
          type="hidden"
          name="_subject"
          value="New Ebook Download — Fulatelier Playbook"
        />
        <input
          type="hidden"
          name="ebook"
          value="From Side Hustle to Digital Business"
        />

        <div>
          <label htmlFor="ebook-first-name" className={labelClass}>
            FIRST NAME
          </label>
          <input
            id="ebook-first-name"
            type="text"
            name="first_name"
            placeholder="Your first name"
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="ebook-email" className={labelClass}>
            EMAIL ADDRESS
          </label>
          <input
            id="ebook-email"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className={fieldClass}
          />
          <p className="mt-1.5 font-inter text-[10px] italic text-subtle">
            No spam. Just the ebook and occasional updates from Fulatelier.
          </p>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className={[
            "mt-1 w-full bg-accent px-4 py-4 font-inter text-xs font-semibold uppercase tracking-[0.1em] text-background transition-colors duration-150 ease-out",
            "hover:bg-gold-light",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer",
            status === "loading" ? "pointer-events-none opacity-75" : "",
          ].join(" ")}
        >
          {status === "loading" ? "SENDING..." : "GET THE FREE EBOOK →"}
        </button>

        {status === "error" ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="font-inter text-xs text-[#E57373]"
            role="alert"
            aria-live="polite"
          >
            Something went wrong. Email fulatelier@gmail.com directly.
          </motion.p>
        ) : null}
      </form>
    </div>
  );
}

function TrustRow() {
  const items = ["Free — no credit card", "32 pages — 10 chapters", "Cancel anytime"];
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-3">
          {i > 0 ? <span className="h-1 w-1 bg-accent" aria-hidden="true" /> : null}
          <span className="font-mono text-[8px] text-subtle">{item}</span>
        </span>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Right column — headline + form (duplicated header for mobile
   so the headline can sit above the book cover in mobile order,
   while remaining part of the right column on desktop).
   ──────────────────────────────────────────────────────────── */

function HeaderCopy({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <>
      <motion.p
        className="mb-5 font-mono text-[9px] tracking-[0.2em] text-accent opacity-65"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: EASE }}
      >
        FUL://GET ACCESS
      </motion.p>
      <motion.h1
        className="mb-4 font-cormorant text-[clamp(32px,8vw,56px)] font-bold leading-[1] tracking-[-0.02em] text-text md:text-[clamp(36px,5vw,56px)]"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: EASE }}
      >
        Build something real.
      </motion.h1>
      <motion.p
        className="mb-8 max-w-[380px] font-inter text-sm leading-[1.7] text-subtle"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
      >
        10 chapters on how AI, software, and the internet have made it
        cheaper and faster than ever to turn an idea into a real digital
        business. Written by Gerald Anderson, founder of Fulatelier LLC.
      </motion.p>
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   About row
   ──────────────────────────────────────────────────────────── */

function AboutRow() {
  return (
    <section className="w-full border-t border-accent/30 bg-footer py-10">
      <div className="mx-auto max-w-[600px] px-6 text-center">
        <p className="font-inter text-xs font-semibold text-text">
          Written by Gerald Anderson
        </p>
        <p className="mb-3 font-inter text-[11px] text-subtle">
          Founder, Fulatelier LLC — Jackson, Mississippi
        </p>
        <p className="font-inter text-[13px] leading-[1.7] text-subtle">
          Gerald Anderson builds custom websites and SaaS products for
          businesses that refuse to settle for generic. He founded Fulatelier
          LLC in Jackson, Mississippi in 2026.
        </p>
        <div className="mt-4 flex justify-center">
          <ArrowLink href="/" className="!text-accent">
            fulatelier.com
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Main export
   ──────────────────────────────────────────────────────────── */

export function EbookGate() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  return (
    <>
      <section
        className="min-h-screen w-full bg-background"
        aria-label="Free ebook — From Side Hustle to Digital Business"
      >
        {/* Mobile-only header — headline needs to lead on small screens.
            Exactly one of these two HeaderCopy instances is ever exposed
            to assistive tech at a time: Tailwind's `hidden`/`md:hidden`
            utilities set display:none, which removes the other from the
            accessibility tree, so only one <h1> is ever announced. */}
        <div className="px-6 pt-16 md:hidden">
          <HeaderCopy reduceMotion={reduceMotion} />
        </div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-6 pb-20 pt-8 md:grid-cols-2 md:gap-16 md:pt-24 lg:px-8">
          {/* Left column — book visual */}
          <div className="flex flex-col items-center md:items-start">
            <motion.p
              className="mb-6 hidden font-mono text-[9px] tracking-[0.2em] text-accent opacity-65 md:block"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: EASE }}
            >
              FUL://FREE GUIDE
            </motion.p>

            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: EASE }}
            >
              <BookCover />
            </motion.div>

            <div className="w-full max-w-[280px] md:max-w-none">
              <ChaptersDesktop reveal={true} reduceMotion={reduceMotion} />
            </div>
          </div>

          {/* Right column — form */}
          <div className="flex flex-col items-center md:items-start">
            <div className="hidden md:block">
              <HeaderCopy reduceMotion={reduceMotion} />
            </div>

            <div className="w-full max-w-[420px]">
              <EbookForm />
              <TrustRow />
            </div>
          </div>

          {/* Mobile-only collapsible chapter list */}
          <div className="w-full max-w-[420px] md:hidden">
            <ChaptersMobile />
          </div>
        </div>
      </section>

      <AboutRow />
    </>
  );
}
