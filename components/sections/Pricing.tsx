"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BorderDraw } from "@/components/ui/BorderDraw";
import { PricingBaseline } from "@/components/ui/PricingBaseline";
import { PricingCard } from "@/components/ui/PricingCard";

/** Per-tier unfold start — by identity, not visual/array index. */
const TIER_START_MS = {
  Launchpad: 0,
  Empire: 120,
  Authority: 280,
} as const;

function tierStartMs(name: string): number {
  if (name.includes("Launchpad")) return TIER_START_MS.Launchpad;
  if (name.includes("Empire")) return TIER_START_MS.Empire;
  if (name.includes("Authority")) return TIER_START_MS.Authority;
  return 0;
}

const TIERS = [
  {
    name: "The Launchpad",
    systemLabel: "FUL://01",
    price: "$500–$800",
    subtitle: "A focused marketing site that looks intentional and ships fast.",
    delivery: "Delivered in 5–10 days",
    ctaLabel: "Start with Launchpad",
    features: [
      "Up to 5 pages on Next.js + TypeScript",
      "Mobile-first layout across phone, tablet, desktop",
      "SEO foundation — titles, meta, sitemap, robots",
      "Contact form with delivery to your inbox",
      "14 days of post-launch bug fixes",
    ],
  },
  {
    name: "The Authority",
    systemLabel: "FUL://02",
    price: "$900–$1,500",
    subtitle: "A brand-forward site with room to grow content and leads.",
    delivery: "Delivered in 10–18 days",
    ctaLabel: "Build Authority",
    popular: true,
    features: [
      "Up to 10 pages with CMS-ready content structure",
      "Custom section layouts matched to your brand",
      "Advanced SEO, Open Graph, and analytics setup",
      "Lead capture with confirmation messaging",
      "30 days of post-launch support",
    ],
  },
  {
    name: "The Empire",
    systemLabel: "FUL://03",
    price: "$1,600–$2,500",
    subtitle: "A high-craft presence with integrations and motion polish.",
    delivery: "Delivered in 18–30 days",
    ctaLabel: "Commission Empire",
    features: [
      "Expanded page scope plus third-party integrations",
      "Custom motion and interaction design (Framer Motion)",
      "Full SEO package with performance pass",
      "Booking, commerce, or CRM handoff wiring",
      "60 days of support plus a handoff training call",
    ],
  },
] as const;

function SectionHeader({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.p
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-accent"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.25, ease: "easeOut" }}
      >
        FUL://INVESTMENT
      </motion.p>

      <div className="relative mt-4 inline-block w-full">
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
          id="pricing-heading"
          className="font-playfair text-h2 font-bold tracking-[-0.015em] text-text lg:text-h2-desktop"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.3,
            delay: reduceMotion ? 0 : 0.15,
            ease: "easeOut",
          }}
        >
          Transparent Pricing. No Surprises.
        </motion.h2>
      </div>

      <motion.p
        className="mt-4 font-inter text-base leading-relaxed text-subtle lg:text-lg"
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
        What agencies charge $10,000 for — starting at $500.
      </motion.p>
    </div>
  );
}

function SaasBanner({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const [showCssBorder, setShowCssBorder] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (reduceMotion) {
      setShowCssBorder(true);
      setShowContent(true);
      return;
    }

    const borderTimer = window.setTimeout(() => setShowCssBorder(true), 350);
    const contentTimer = window.setTimeout(
      () => setShowContent(true),
      350 + 200,
    );

    return () => {
      window.clearTimeout(borderTimer);
      window.clearTimeout(contentTimer);
    };
  }, [active, reduceMotion]);

  return (
    <div
      className={[
        "relative mt-12 px-6 py-6 text-center lg:mt-16 lg:px-10 lg:py-8",
        showCssBorder
          ? "border border-accent bg-card"
          : "border border-transparent bg-transparent",
      ].join(" ")}
    >
      {!reduceMotion ? (
        <BorderDraw
          active={active}
          color="#A37E2C"
          duration={0.35}
          delay={0}
          ease="linear"
          fadeOutDuration={0.1}
        />
      ) : null}
      <motion.p
        className="font-inter text-base leading-relaxed text-text lg:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.3, ease: "easeOut" }}
      >
        <span className="font-semibold text-accent-light">
          SaaS &amp; Web Application Development
        </span>
        {" — "}
        Pricing upon request.{" "}
        <a
          href="#contact"
          className="font-medium text-accent-light underline decoration-accent-light underline-offset-4 transition-colors duration-200 hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          DM to discuss your project.
        </a>
      </motion.p>
    </div>
  );
}

/**
 * Pricing — blueprint unfold across three tiers.
 * Order: Launchpad → Empire → Authority (most important last).
 */
export function Pricing() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 });

  const [baselineActive, setBaselineActive] = useState(false);
  const [saasActive, setSaasActive] = useState(false);

  const handleSettled = useCallback(
    (name: string) => {
      if (!name.includes("Authority")) return;
      if (reduceMotion) {
        setBaselineActive(true);
        setSaasActive(true);
        return;
      }
      setBaselineActive(true);
    },
    [reduceMotion],
  );

  const handleBaselineLineComplete = useCallback(() => {
    window.setTimeout(() => setSaasActive(true), 300);
  }, []);

  // Safety net: fire baseline ≈1800ms after cards enter if Authority settle is late
  useEffect(() => {
    if (!cardsInView || reduceMotion) return;
    const timer = window.setTimeout(() => {
      setBaselineActive(true);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [cardsInView, reduceMotion]);

  useEffect(() => {
    if (!cardsInView || !reduceMotion) return;
    setBaselineActive(true);
    setSaasActive(true);
  }, [cardsInView, reduceMotion]);

  return (
    <section
      id="pricing"
      className="section-fulatelier bg-background"
      aria-labelledby="pricing-heading"
    >
      <div className="container-fulatelier">
        <div ref={headerRef}>
          <SectionHeader active={headerInView} reduceMotion={reduceMotion} />
        </div>

        <div ref={cardsRef} className="relative mt-12 lg:mt-16 lg:pt-4">
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-6">
            {TIERS.map((tier) => (
              <PricingCard
                key={tier.name}
                name={tier.name}
                systemLabel={tier.systemLabel}
                price={tier.price}
                subtitle={tier.subtitle}
                features={tier.features}
                delivery={tier.delivery}
                ctaLabel={tier.ctaLabel}
                popular={"popular" in tier ? tier.popular : false}
                active={cardsInView}
                startDelayMs={tierStartMs(tier.name)}
                reduceMotion={reduceMotion}
                onSettled={() => handleSettled(tier.name)}
              />
            ))}
          </div>

          <PricingBaseline
            active={baselineActive}
            reduceMotion={reduceMotion}
            onLineComplete={handleBaselineLineComplete}
          />
        </div>

        <SaasBanner active={saasActive} reduceMotion={reduceMotion} />

        <p className="mt-6 text-center font-inter text-sm leading-relaxed text-subtle lg:text-base">
          All projects include a free 20-minute consultation before any
          commitment.
        </p>
      </div>
    </section>
  );
}
