"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { CarePricingCard } from "@/components/ui/CarePricingCard";

const EASE = [0.16, 1, 0.3, 1] as const;
const CALENDLY_URL =
  "https://calendly.com/fulatelier/free-20-minute-website-audit";

/** Shared "FUL://" eyebrow label used above every section headline. */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-accent opacity-65">
      {children}
    </p>
  );
}

/** Small sharp check badge — a square, not a circle, per the site's no-border-radius rule. */
function CheckBadge() {
  return (
    <span
      aria-hidden="true"
      className="flex h-4 w-4 shrink-0 items-center justify-center border border-accent bg-accent/10 text-accent"
    >
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
        <path
          d="M1 5.2L3.8 8L9 1.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
   Section 1 — Hero
   ──────────────────────────────────────────────────────────── */

const HERO_LINE_1 = "Your Website Should Work";
const HERO_LINE_2 = "After Launch Too.";

const TRUST_BADGES = [
  "No contracts",
  "Cancel anytime",
  "Response within 24 hours",
] as const;

function HeroHeadline({ reduceMotion }: { reduceMotion: boolean }) {
  let wordIndex = 0;

  const renderLine = (line: string, colorClass: string) =>
    line.split(" ").map((word, i, arr) => {
      const delay = 0.5 + wordIndex * 0.07;
      wordIndex += 1;
      return (
        <span key={`${line}-${word}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className={["inline-block will-change-transform", colorClass].join(" ")}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: reduceMotion ? 0.3 : 0.6, delay, ease: EASE }}
          >
            {word}
            {i < arr.length - 1 ? " " : ""}
          </motion.span>
        </span>
      );
    });

  return (
    <h1 className="mx-auto max-w-[16ch] text-center font-cormorant text-[clamp(48px,7vw,88px)] font-bold leading-[0.95] tracking-[-0.03em]">
      <span className="block">{renderLine(HERO_LINE_1, "text-text")}</span>
      <span className="block">{renderLine(HERO_LINE_2, "text-accent")}</span>
    </h1>
  );
}

function CareHero() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.3 : 0.6, delay, ease: EASE },
  });

  return (
    <section
      className="w-full bg-background pb-section-mobile pt-32 md:pb-section-desktop md:pt-44"
      aria-labelledby="care-hero-heading"
    >
      <div className="mx-auto max-w-[820px] px-6 lg:px-8">
        <motion.p
          className="mb-6 text-center font-mono text-[10px] tracking-[0.2em] text-accent opacity-65"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.5, ease: EASE }}
        >
          FUL://CARE
        </motion.p>

        <div id="care-hero-heading">
          <HeroHeadline reduceMotion={reduceMotion} />
        </div>

        <motion.p
          className="mx-auto mt-8 max-w-[560px] text-center font-inter text-lg leading-relaxed text-subtle"
          {...fadeUp(1.1)}
        >
          Most websites are launched and forgotten. They slow down, break,
          fall in Google rankings, and silently lose customers while the
          owner is focused on running their business. Fulatelier Care exists
          to prevent that.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          {...fadeUp(1.3)}
        >
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 border border-accent/40 bg-footer px-4 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-accent"
            >
              <span aria-hidden="true">✓</span>
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Section 2 — The Problem
   ──────────────────────────────────────────────────────────── */

const PROBLEMS = [
  {
    number: "01",
    title: "Vulnerabilities accumulate",
    body: "Outdated plugins and software become entry points for hackers. A compromised site gets blacklisted by Google — removing you from search results entirely.",
  },
  {
    number: "02",
    title: "Speed degrades over time",
    body: "Without optimization, load times increase. Every extra second costs you visitors. Your PageSpeed score drops and Google ranks you lower for it.",
  },
  {
    number: "03",
    title: "Content goes stale",
    body: "Wrong hours, discontinued services, outdated pricing. Customers who find incorrect information lose trust immediately.",
  },
  {
    number: "04",
    title: "Rankings quietly slip",
    body: "Google rewards fresh, well-maintained sites. An ignored site slides down search results while your maintained competitors move up.",
  },
] as const;

function ProblemCard({
  number,
  title,
  body,
  index,
  inView,
  reduceMotion,
}: (typeof PROBLEMS)[number] & {
  index: number;
  inView: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className="relative overflow-hidden border border-accent/30 bg-card p-7"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: reduceMotion ? 0.3 : 0.4,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: EASE,
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-3 select-none font-cormorant text-5xl font-bold leading-none text-accent opacity-[0.08]"
      >
        {number}
      </span>
      <h3 className="relative font-inter text-sm font-semibold text-text">
        {title}
      </h3>
      <p className="relative mt-3 font-inter text-[13px] leading-[1.7] text-subtle">
        {body}
      </p>
    </motion.div>
  );
}

function CareProblem() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      className="w-full border-t border-accent/20 bg-background py-section-mobile md:py-section-desktop"
      aria-labelledby="care-problem-heading"
    >
      <div className="mx-auto max-w-[900px] px-6 lg:px-8">
        <Eyebrow>FUL://PROBLEM</Eyebrow>
        <h2
          id="care-problem-heading"
          className="mx-auto max-w-2xl text-center font-cormorant text-h2 font-semibold tracking-[-0.02em] text-text md:text-h2-desktop"
        >
          What happens to websites that get no attention.
        </h2>

        <div ref={ref} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PROBLEMS.map((problem, index) => (
            <ProblemCard
              key={problem.title}
              {...problem}
              index={index}
              inView={inView}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Section 3 — What Care Includes
   ──────────────────────────────────────────────────────────── */

const INCLUDES_LEFT = [
  {
    title: "Security updates",
    body: "Monthly platform and plugin updates applied before they become vulnerabilities.",
  },
  {
    title: "Uptime monitoring",
    body: "We know when your site goes down before you do. Issues are addressed immediately.",
  },
  {
    title: "Performance checks",
    body: "Monthly PageSpeed audit. We flag drops and fix the causes before customers notice.",
  },
  {
    title: "Contact form testing",
    body: "Every month we submit your forms and confirm the emails arrive. No silent failures.",
  },
] as const;

const INCLUDES_RIGHT = [
  {
    title: "Content updates",
    body: "Hours, pricing, services, photos — we make the changes so your site stays current.",
  },
  {
    title: "Google Business updates",
    body: "Your Google listing reflects your current hours, services, and photos. Always.",
  },
  {
    title: "Monthly report",
    body: "A brief report each month showing your site health, traffic, and any actions taken.",
  },
  {
    title: "Priority support",
    body: "Questions and requests go to the front of the queue. Response within 24 hours.",
  },
] as const;

function IncludesColumn({
  items,
}: {
  items: readonly { title: string; body: string }[];
}) {
  return (
    <ul className="flex flex-col divide-y divide-accent/25">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3 py-5 first:pt-0 last:pb-0">
          <div className="mt-0.5">
            <CheckBadge />
          </div>
          <div>
            <p className="font-inter text-xs font-semibold text-text">
              {item.title}
            </p>
            <p className="mt-1.5 font-inter text-[11px] leading-relaxed text-subtle">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CareIncludes() {
  return (
    <section
      className="w-full border-t border-accent/20 bg-background py-section-mobile md:py-section-desktop"
      aria-labelledby="care-includes-heading"
    >
      <div className="mx-auto max-w-[900px] px-6 lg:px-8">
        <Eyebrow>FUL://INCLUDES</Eyebrow>
        <h2
          id="care-includes-heading"
          className="text-center font-cormorant text-h2 font-semibold tracking-[-0.02em] text-text md:text-h2-desktop"
        >
          Every Care plan includes.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
          <IncludesColumn items={INCLUDES_LEFT} />
          <IncludesColumn items={INCLUDES_RIGHT} />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Section 4 — Pricing
   ──────────────────────────────────────────────────────────── */

const CARE_TIERS = [
  {
    name: "Care Basic",
    price: "$75",
    description:
      "Essential maintenance for businesses that want their site healthy without thinking about it.",
    includes: [
      "Monthly security updates",
      "Uptime monitoring",
      "1 content update per month",
      "Monthly performance report",
      "Email support (48hr response)",
    ],
    ctaLabel: "Start Basic Care",
    featured: false,
  },
  {
    name: "Care Standard",
    price: "$150",
    description:
      "Active maintenance and monthly optimization for businesses that depend on their site to generate leads.",
    includes: [
      "Everything in Basic plus:",
      "2 content updates per month",
      "Google Business Profile updates",
      "Monthly SEO health check",
      "Quarterly comprehensive audit",
      "Priority support (24hr response)",
    ],
    ctaLabel: "Start Standard Care",
    featured: true,
  },
  {
    name: "Care Premium",
    price: "$250",
    description:
      "Full-service digital support for businesses where the website is a primary revenue driver.",
    includes: [
      "Everything in Standard plus:",
      "Unlimited small content updates",
      "2 social media graphics per month",
      "Monthly analytics review call",
      "Emergency same-day support",
      "New page added quarterly",
    ],
    ctaLabel: "Start Premium Care",
    featured: false,
  },
] as const;

function CarePricing() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      className="w-full border-t border-accent/20 bg-background py-section-mobile md:py-section-desktop"
      aria-labelledby="care-pricing-heading"
    >
      <div className="mx-auto max-w-[1100px] px-6 lg:px-8">
        <Eyebrow>FUL://INVESTMENT</Eyebrow>
        <h2
          id="care-pricing-heading"
          className="text-center font-cormorant text-h2 font-semibold tracking-[-0.02em] text-text md:text-h2-desktop"
        >
          Three levels of care.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center font-inter text-base leading-relaxed text-subtle">
          All plans are month-to-month. No contracts. Cancel at any time.
        </p>

        <div
          ref={ref}
          className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-6"
        >
          {CARE_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: reduceMotion ? 0.3 : 0.4,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: EASE,
              }}
              className="h-full"
            >
              <CarePricingCard
                name={tier.name}
                price={tier.price}
                description={tier.description}
                includes={tier.includes}
                ctaLabel={tier.ctaLabel}
                ctaHref={CALENDLY_URL}
                featured={tier.featured}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Section 5 — FAQ
   ──────────────────────────────────────────────────────────── */

const CARE_FAQS = [
  {
    question: "Do I have to be a Fulatelier client to get Care?",
    answer:
      "No. Care is available for any professionally built website — whether Fulatelier built it or not. The site needs to be built on a modern platform (Next.js, WordPress, Webflow, Shopify, or similar). We'll review it before onboarding.",
  },
  {
    question: "What if I need more updates than my plan includes?",
    answer:
      "Additional content updates are available at $50 per update outside your plan's allocation. Premium Care includes unlimited small updates — if you regularly need more than Standard allows, Premium is likely the right fit.",
  },
  {
    question: "How do I submit update requests?",
    answer:
      "Standard Care clients and above receive a simple email address for update requests. Most updates are completed within 48 hours of request.",
  },
  {
    question: "What counts as a content update?",
    answer:
      "Text changes, photo swaps, hours updates, adding a team member, updating pricing — anything that does not require new page design or development. New pages and new features are quoted separately.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. All Care plans are month-to-month. Cancel with 30 days notice and your plan continues through the end of the billing period.",
  },
  {
    question: "What if my site has an emergency?",
    answer:
      "Basic Care clients receive email support within 48 hours. Standard within 24 hours. Premium clients receive same-day emergency support — we treat a down site as a critical issue.",
  },
] as const;

function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  reduceMotion,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  return (
    <div className="border-b border-accent/20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="font-inter text-sm font-medium text-text">
          {question}
        </span>
        <motion.span
          aria-hidden="true"
          className="shrink-0 text-accent"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
        >
          →
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="pb-5 font-inter text-[13px] leading-[1.7] text-subtle">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

function CareFAQ() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="w-full border-t border-accent/20 bg-background py-section-mobile md:py-section-desktop"
      aria-labelledby="care-faq-heading"
    >
      <div className="mx-auto max-w-[720px] px-6 lg:px-8">
        <Eyebrow>FUL://FAQ</Eyebrow>
        <h2
          id="care-faq-heading"
          className="text-center font-cormorant text-h2 font-semibold tracking-[-0.02em] text-text md:text-h2-desktop"
        >
          Common questions.
        </h2>

        <div className="mt-14">
          {CARE_FAQS.map((faq, index) => (
            <FaqAccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Section 6 — Final CTA
   ──────────────────────────────────────────────────────────── */

function CareContact() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      className="w-full border-t border-accent bg-footer py-20"
      aria-labelledby="care-contact-heading"
    >
      <div
        ref={ref}
        className="mx-auto max-w-[720px] px-6 text-center lg:px-8"
      >
        <Eyebrow>FUL://START</Eyebrow>

        <motion.h2
          id="care-contact-heading"
          className="font-cormorant text-[clamp(40px,6vw,72px)] font-bold leading-[0.98] tracking-[-0.02em] text-text"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduceMotion ? 0.3 : 0.6, ease: EASE }}
        >
          Your site is an asset.
          <br />
          Protect it.
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-[500px] font-inter text-base leading-relaxed text-subtle"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
        >
          Most business owners only think about their website when something
          breaks. Care clients don&apos;t have that conversation — because
          we&apos;re already handling it.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : 0.2, ease: EASE }}
        >
          <Button
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
          >
            Start with Standard — $150/mo
          </Button>
          <ArrowLink href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Talk to Gerald first
          </ArrowLink>
        </motion.div>

        <p className="mt-8 font-mono text-[9px] tracking-[0.15em] text-subtle">
          No contracts. No setup fee. Cancel anytime with 30 days notice.
        </p>
      </div>
    </section>
  );
}

/**
 * Fulatelier Care — recurring website maintenance & support landing page.
 * Composed of the six sections above; rendered on /care between the
 * shared site Nav and Footer.
 */
export function Care() {
  return (
    <>
      <CareHero />
      <CareProblem />
      <CareIncludes />
      <CarePricing />
      <CareFAQ />
      <CareContact />
    </>
  );
}
