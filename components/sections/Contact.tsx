"use client";

import { Button } from "@/components/ui/Button";

/**
 * Contact — destination for primary CTAs and nav Contact link.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="section-fulatelier bg-card"
      aria-labelledby="contact-heading"
    >
      <div className="container-fulatelier">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-light">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-4 font-playfair text-h2 font-bold tracking-[-0.015em] text-text lg:text-h2-desktop"
          >
            Let&apos;s Build Yours.
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-subtle lg:text-lg">
            Every project starts with a free 20-minute consultation — no pitch
            deck, no pressure. Tell us what you need built.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="mailto:hello@fulatelier.com" variant="solid">
              Email the Studio
            </Button>
            <Button href="#pricing" variant="outline">
              Review Pricing
            </Button>
          </div>
          <p className="mt-6 font-inter text-sm text-subtle">
            Jackson, MS · hello@fulatelier.com
          </p>
        </div>
      </div>
    </section>
  );
}
