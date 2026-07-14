"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { navLinks } from "@/lib/constants";

const SCROLL_THRESHOLD = 80;

/** Navy-tinted elevation — reads as lifted off the page, not a gray drop-shadow */
const SHADOW_REST =
  "shadow-[0_8px_28px_rgba(5,13,26,0.45),0_2px_8px_rgba(5,13,26,0.35)]";
const SHADOW_SCROLLED =
  "shadow-[0_14px_40px_rgba(5,13,26,0.65),0_4px_12px_rgba(5,13,26,0.45)]";

const navLinkClassName =
  "nav-link relative font-inter text-xs font-medium uppercase tracking-[0.15em] text-text transition-colors duration-300 ease-out hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Nav() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Close on Escape; restore focus to hamburger
  useEffect(() => {
    if (!menuOpen) return;

    const openButton = openButtonRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [menuOpen, closeMenu]);

  // Simple focus trap inside overlay
  useEffect(() => {
    if (!menuOpen) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const getFocusable = () =>
      Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    overlay.addEventListener("keydown", onKeyDown);
    return () => overlay.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const overlayMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: "-100%" },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: "-100%" },
      };

  return (
    <header className="pointer-events-none fixed inset-x-4 top-4 z-50 mx-auto w-auto max-w-content lg:inset-x-8 lg:top-6">
      <nav
        className={[
          "pointer-events-auto flex h-16 items-center justify-between gap-6 border border-accent/20 px-6 backdrop-blur-md lg:h-20 lg:px-8",
          "rounded-none transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? `bg-card/95 ${SHADOW_SCROLLED}`
            : `bg-card/85 ${SHADOW_REST}`,
        ].join(" ")}
        aria-label="Primary"
      >
        <a
          href="#main"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <LogoMark animateIn />
          <span className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-text">
            FULATELIER
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={navLinkClassName}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#contact">Get Started</Button>
        </div>

        <button
          ref={openButtonRef}
          type="button"
          className="relative flex h-11 w-11 items-center justify-center text-accent transition-colors duration-200 ease-out hover:text-accent-light lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={[
                "absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ease-out",
                menuOpen ? "translate-y-[7px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current transition-opacity duration-300 ease-out",
                menuOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-300 ease-out",
                menuOpen ? "-translate-y-[7px] -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={overlayRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
            initial={overlayMotion.initial}
            animate={overlayMotion.animate}
            exit={overlayMotion.exit}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-16 items-center justify-between px-6">
              <a
                href="#main"
                className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onClick={closeMenu}
              >
                <LogoMark />
                <span className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-text">
                  FULATELIER
                </span>
              </a>
              <button
                ref={closeButtonRef}
                type="button"
                className="relative flex h-11 w-11 items-center justify-center text-accent transition-colors duration-200 ease-out hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <span className="relative block h-3.5 w-5" aria-hidden="true">
                  <span className="absolute left-0 top-0 block h-px w-full translate-y-[7px] rotate-45 bg-current" />
                  <span className="absolute bottom-0 left-0 block h-px w-full -translate-y-[7px] -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-6 px-6 pb-20">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    onClick={closeMenu}
                    className="font-playfair text-h1 text-text transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -12 }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: reduceMotion ? 0 : 0.05 * index,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
              <li className="pt-4">
                <Button href="#contact" onClick={closeMenu}>
                  Get Started
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
