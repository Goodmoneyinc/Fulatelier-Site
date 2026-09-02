"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { LogoMark } from "@/components/ui/LogoMark";
import { navLinks, social } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;
const HEADLINE_WORDS = "Ready to build something that lasts?".split(" ");

/**
 * Footer CTA headline — word-by-word clip reveal on scroll-in.
 * Reduced motion swaps the clip animation for a single fade.
 */
function CinematicHeadline({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <p
      ref={ref}
      className="font-cormorant text-[clamp(40px,5vw,68px)] font-semibold leading-[1.05] tracking-[-0.02em] text-text"
    >
      {HEADLINE_WORDS.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block">
          <motion.span
            className="inline-block"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { clipPath: "inset(100% 0 0 0)", y: "0.15em" }
            }
            animate={
              inView
                ? reduceMotion
                  ? { opacity: 1 }
                  : { clipPath: "inset(0% 0 0 0)", y: "0em" }
                : undefined
            }
            transition={{
              duration: reduceMotion ? 0.4 : 0.38,
              delay: reduceMotion ? 0 : i * 0.045,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
          {i < HEADLINE_WORDS.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}

/**
 * Site footer — tonal navy close, strongest gold rules on the page.
 * Opens with the cinematic CTA headline; the CTA arrow turning gold on
 * hover is primary gold use #3 of 3.
 */
export function Footer() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  return (
    <footer role="contentinfo" className="bg-footer text-subtle">
      {/* Strongest gold separator — flush to the top edge */}
      <div className="h-px w-full bg-accent" aria-hidden="true" />

      <div className="mx-auto max-w-[1100px] px-6 pb-10 pt-16 lg:px-8">
        {/* Cinematic CTA — headline, subtext, arrow */}
        <div className="border-b border-accent/30 pb-14 md:pb-16">
          <CinematicHeadline reduceMotion={reduceMotion} />
          <p className="mt-5 font-inter text-base text-subtle">
            Five Mississippi businesses selected each month.
          </p>
          <a
            href="#contact"
            className="group mt-8 inline-flex items-baseline gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
          >
            <span className="font-cormorant text-[22px] font-bold text-text transition-colors duration-200 ease-out group-hover:text-accent-light">
              START YOUR PROJECT
            </span>
            <span
              aria-hidden="true"
              className="font-cormorant text-[22px] text-text transition-[transform,color] duration-200 ease-out group-hover:translate-x-1.5 group-hover:text-accent"
            >
              →
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-0 pt-14 md:grid-cols-3 md:gap-12 md:pt-16">
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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block font-inter text-xs uppercase leading-[2.4] tracking-[0.15em] text-subtle transition-colors duration-150 ease-out hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
                  >
                    {link.href === "/care" ? "Fulatelier Care" : link.label}
                  </a>
                  <div
                    className="h-px w-full bg-accent/30"
                    aria-hidden="true"
                  />
                </li>
              ))}
              <li>
                <a
                  href="/playbook"
                  className="block font-inter text-xs uppercase leading-[2.4] tracking-[0.15em] text-subtle transition-colors duration-150 ease-out hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
                >
                  Free Ebook
                </a>
              </li>
            </ul>
          </nav>

          {/* RIGHT — connect (mobile order 1) */}
          <div className="order-1 border-b border-accent/30 pb-10 md:order-3 md:border-b-0 md:pb-0">
            <p className="mb-5 font-mono text-[9px] tracking-[0.2em] text-accent/55">
              CONNECT
            </p>
            <div className="flex items-center gap-2.5">
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
