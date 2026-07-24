"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/LogoMark";
import { CTAButton } from "@/components/blueprint/CTAButton";

const SCROLL_THRESHOLD = 40;

/**
 * Minimal single-purpose header for the Blueprint landing page.
 * No site navigation — logo and one CTA only, so nothing competes
 * with the application form for attention.
 */
export function BlueprintHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 transition-[padding,background-color] duration-300 ease-out sm:px-8",
          scrolled ? "py-3" : "py-6",
        ].join(" ")}
      >
        <a
          href="#top"
          className="flex items-center gap-3 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B872] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]"
          aria-label="Fulatelier — back to top"
        >
          <LogoMark className="h-9 w-9 shrink-0" />
          <span className="hidden font-cormorant text-[15px] font-semibold uppercase tracking-[0.25em] text-text sm:inline">
            Fulatelier
          </span>
        </a>

        <CTAButton href="#apply" size="md" aria-label="Apply for Your Digital Storefront Blueprint">
          Apply Now
        </CTAButton>
      </div>

      <div
        className={[
          "pointer-events-none absolute inset-0 -z-10 border-b transition-[opacity,border-color] duration-300 ease-out",
          scrolled
            ? "border-white/[0.08] bg-[#0A0A0B]/80 opacity-100 backdrop-blur-xl"
            : "border-transparent opacity-0",
        ].join(" ")}
        aria-hidden="true"
      />
    </header>
  );
}
