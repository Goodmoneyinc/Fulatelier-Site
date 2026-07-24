import { LogoMark } from "@/components/ui/LogoMark";

/**
 * Minimal closing footer for the Blueprint landing page — brand mark,
 * contact line, and a link home. No secondary navigation.
 */
export function BlueprintFooter() {
  return (
    <footer role="contentinfo" className="border-t border-accent bg-footer">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-6 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
        <a
          href="#top"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
        >
          <LogoMark className="h-9 w-9 shrink-0" />
          <span className="font-cormorant text-[14px] font-semibold uppercase tracking-[0.25em] text-text">
            Fulatelier LLC
          </span>
        </a>

        <p className="font-inter text-[13px] leading-relaxed text-subtle">
          Jackson, Mississippi ·{" "}
          <a
            href="mailto:hello@fulatelier.com"
            className="text-accent-light transition-colors duration-150 hover:text-gold-light hover:underline"
          >
            hello@fulatelier.com
          </a>
        </p>

        <a
          href="/"
          className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-subtle transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
        >
          fulatelier.com →
        </a>
      </div>

      <div className="border-t border-accent/20">
        <div className="mx-auto max-w-[1200px] px-6 py-5 text-center">
          <p className="font-inter text-[11px] text-subtle">
            © {new Date().getFullYear()} Fulatelier LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
