"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  BrowserWindowIcon,
  LayeredWindowsIcon,
  ServiceCard,
} from "@/components/ui/ServiceCard";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    icon: <BrowserWindowIcon />,
    systemLabel: "FUL://01",
    title: "Custom Web Development",
    description:
      "Marketing sites and brochure experiences engineered in Next.js — fast, accessible, and ready to convert from day one.",
    price: "Starting at $500",
    features: [
      "Next.js App Router build with TypeScript and Tailwind",
      "Technical SEO foundation — meta, sitemap, Core Web Vitals",
      "Two rounds of design and content revisions included",
      "Mobile-first layouts with separate phone breakpoints",
      "30 days of post-launch fixes and support",
    ],
    ctaLabel: "Discuss Your Site",
    ctaHref: "#contact",
    startDelayMs: 0,
    unrollDurationMs: 600,
    borderColor: "#A37E2C",
    investmentBorderColor: "#A37E2C",
  },
  {
    icon: <LayeredWindowsIcon />,
    systemLabel: "FUL://02",
    title: "SaaS & Web Application Development",
    description:
      "Product-grade applications with auth, data, and billing — built like an in-house team, priced for founders who move fast.",
    price: "Pricing Upon Request",
    features: [
      "Database architecture on Postgres with Supabase",
      "Secure authentication and role-based access control",
      "Stripe Checkout, subscriptions, and webhook handling",
      "Admin dashboard for operations and content",
      "API routes, background jobs, and Vercel deployment",
    ],
    ctaLabel: "Scope Your App",
    ctaHref: "#contact",
    startDelayMs: 180,
    unrollDurationMs: 720,
    borderColor: "#C9A84C",
    investmentBorderColor: "#C9A84C",
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
        FUL://SERVICES
      </motion.p>

      <div className="relative mt-4 inline-block w-full">
        {/* Sweep line — reveals headline like a drafting rule */}
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
          id="services-heading"
          className="font-cormorant text-h2 font-semibold tracking-[-0.02em] text-text md:text-h2-desktop"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.3,
            delay: reduceMotion ? 0 : 0.15,
            ease: "easeOut",
          }}
        >
          Two Services. One Standard.
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
          delay: reduceMotion ? 0 : 0.5,
          ease: "easeOut",
        }}
      >
        Marketing sites and product-grade applications — engineered with the
        same craft.
      </motion.p>
    </div>
  );
}

/**
 * Services — blueprint unfold. Cards reveal like drawings unrolled on a table.
 */
export function Services() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <section
      id="services"
      className="section-fulatelier bg-background"
      aria-labelledby="services-heading"
    >
      <div className="container-fulatelier">
        <div ref={headerRef}>
          <SectionHeader active={headerInView} reduceMotion={reduceMotion} />
        </div>

        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8"
        >
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              systemLabel={service.systemLabel}
              title={service.title}
              description={service.description}
              price={service.price}
              features={service.features}
              ctaLabel={service.ctaLabel}
              ctaHref={service.ctaHref}
              active={cardsInView}
              startDelayMs={service.startDelayMs}
              unrollDurationMs={service.unrollDurationMs}
              borderColor={service.borderColor}
              investmentBorderColor={service.investmentBorderColor}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <motion.div
          className="mx-auto mt-14 h-px w-full max-w-content origin-center bg-accent lg:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: EASE }}
          aria-hidden="true"
        />

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-center font-inter text-base leading-relaxed text-subtle lg:mt-10 lg:text-lg"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          whileInView={
            reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Not sure which you need? Every project starts with a free 20-minute
          consultation.{" "}
          <a
            href="#contact"
            className="font-medium text-accent underline decoration-accent underline-offset-4 transition-colors duration-200 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book yours here →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
