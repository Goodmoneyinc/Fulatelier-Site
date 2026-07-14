"use client";

import { PricingCard } from "@/components/ui/PricingCard";

const TIERS = [
  {
    name: "The Launchpad",
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

/**
 * Pricing — transparent website tiers, SaaS scoped separately.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      className="section-fulatelier bg-background"
      aria-labelledby="pricing-heading"
    >
      <div className="container-fulatelier">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Investment
          </p>
          <h2
            id="pricing-heading"
            className="mt-4 font-playfair text-h2 font-bold tracking-[-0.015em] text-text lg:text-h2-desktop"
          >
            Transparent Pricing. No Surprises.
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-subtle lg:text-lg">
            What agencies charge $10,000 for — starting at $500.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-6 lg:pt-4">
          {TIERS.map((tier) => (
            <PricingCard
              key={tier.name}
              name={tier.name}
              price={tier.price}
              subtitle={tier.subtitle}
              features={tier.features}
              delivery={tier.delivery}
              ctaLabel={tier.ctaLabel}
              popular={"popular" in tier ? tier.popular : false}
            />
          ))}
        </div>

        <div className="mt-12 border border-accent bg-card px-6 py-6 text-center lg:mt-16 lg:px-10 lg:py-8">
          <p className="font-inter text-base leading-relaxed text-text lg:text-lg">
            <span className="font-semibold text-accent-light">
              SaaS &amp; Web Application Development
            </span>
            {" — "}
            Pricing upon request.{" "}
            <a
              href="#contact"
              className="font-medium text-accent underline decoration-accent underline-offset-4 transition-colors duration-200 hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              DM to discuss your project.
            </a>
          </p>
        </div>

        <p className="mt-6 text-center font-inter text-sm leading-relaxed text-subtle lg:text-base">
          All projects include a free 20-minute consultation before any
          commitment.
        </p>
      </div>
    </section>
  );
}
