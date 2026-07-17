"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "@/components/ui/LogoMark";
import { navLinks, social } from "@/lib/constants";

/**
 * Site footer — tonal navy close, strongest gold rules on the page.
 * Static on arrival; only the CTA arrow pulses (unless reduced motion).
 */
export function Footer() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  return (
    <footer role="contentinfo" className="bg-footer text-subtle">
      {/* Strongest gold separator — flush to the top edge */}
      <div className="h-px w-full bg-accent" aria-hidden="true" />

      <div className="mx-auto max-w-[1100px] px-6 pb-10 pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-12">
          {/* LEFT — brand (mobile order 2) */}
          <div className="order-2 border-b border-accent/30 pb-10 md:order-1 md:border-b-0 md:pb-0">
            <LogoMark className="mb-4 h-9 w-9" />
            <p className="mb-2 font-cormorant text-[15px] font-semibold uppercase tracking-[0.25em] text-text">
              FULATELIER LLC
            </p>
            <p className="mb-6 font-cormorant text-base font-normal italic tracking-[0.02em] text-subtle">
              Precision Crafted. Purpose Built.
            </p>
            <div
              className="mb-6 h-px w-12 bg-accent/40"
              aria-hidden="true"
            />
            <p className="font-mono text-[9px] tracking-[0.2em] text-accent/50">
              EST. 2026 · JACKSON, MS
            </p>
          </div>

          {/* CENTER — navigate (mobile order 3) */}
          <nav
            aria-label="Footer navigation"
            className="order-3 border-b border-accent/30 pb-10 md:order-2 md:border-b-0 md:pb-0"
          >
            <p className="mb-5 font-mono text-[9px] tracking-[0.2em] text-accent/55">
              NAVIGATE
            </p>
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block font-inter text-xs uppercase leading-[2.4] tracking-[0.15em] text-subtle transition-colors duration-150 ease-out hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
                  >
                    {link.label}
                  </a>
                  {index < navLinks.length - 1 ? (
                    <div
                      className="h-px w-full bg-accent/30"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT — CTA (mobile order 1) */}
          <div className="order-1 border-b border-accent/30 pb-10 md:order-3 md:border-b-0 md:pb-0">
            <a
              href="#contact"
              className="group inline-block transition-colors duration-200 ease-out hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
            >
              <span className="mb-2 block font-cormorant text-[22px] font-bold text-text transition-colors duration-200 ease-out group-hover:text-accent-light">
                START YOUR PROJECT
              </span>
              <motion.span
                aria-hidden="true"
                className="mb-6 block font-cormorant text-[22px] text-accent transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                animate={
                  reduceMotion ? { opacity: 1 } : { opacity: [1, 0.4, 1] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                →
              </motion.span>
            </a>

            <div className="mt-8 flex items-center gap-2.5">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-[18px] w-[18px] items-center justify-center border border-accent/40 bg-transparent font-inter text-[10px] font-bold text-accent transition-[border-color,background-color] duration-150 ease-out hover:border-accent hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
              >
                in
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-[18px] w-[18px] items-center justify-center border border-accent/40 bg-transparent font-inter text-[11px] font-bold text-accent transition-[border-color,background-color] duration-150 ease-out hover:border-accent hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
              >
                f
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-accent/20">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-2 px-6 py-5 text-center md:flex-row md:justify-between md:text-left lg:px-8">
          <small className="font-inter text-[11px] text-subtle">
            © 2026 Fulatelier LLC
          </small>
          <p className="hidden font-mono text-[9px] tracking-[0.2em] text-accent/40 md:block">
            PRECISION CRAFTED. PURPOSE BUILT.
          </p>
          <p className="font-inter text-[11px] text-subtle">Jackson, MS</p>
        </div>
      </div>

      {/* Closing mark — echoes the nav gold bar */}
      <div className="h-2 w-full bg-footer" aria-hidden="true" />
      <div className="h-px w-full bg-accent" aria-hidden="true" />
    </footer>
  );
}
