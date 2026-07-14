"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BrowserWindowIcon,
  LayeredWindowsIcon,
  ServiceCard,
} from "@/components/ui/ServiceCard";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    icon: <BrowserWindowIcon />,
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
  },
  {
    icon: <LayeredWindowsIcon />,
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
  },
] as const;

/**
 * Services — two offerings, one craft standard.
 */
export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="section-fulatelier bg-background"
      aria-labelledby="services-heading"
    >
      <div className="container-fulatelier">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            What We Build
          </p>
          <h2
            id="services-heading"
            className="mt-4 font-playfair text-h2 font-bold tracking-[-0.015em] text-text lg:text-h2-desktop"
          >
            Two Services. One Standard.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              price={service.price}
              features={service.features}
              ctaLabel={service.ctaLabel}
              ctaHref={service.ctaHref}
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
