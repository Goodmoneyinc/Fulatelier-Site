import { LogoMark } from "@/components/ui/LogoMark";

/**
 * Minimal closing footer for the Blueprint landing page — brand mark,
 * contact line, and a link home. No secondary navigation.
 */
export function BlueprintFooter() {
  return (
    <footer role="contentinfo" className="border-t border-white/[0.08] bg-[#060607]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-6 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
        <a
          href="#top"
          className="flex items-center gap-3 rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B872] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060607]"
        >
          <LogoMark className="h-8 w-8 shrink-0" />
          <span className="font-cormorant text-[14px] font-semibold uppercase tracking-[0.25em] text-text">
            Fulatelier LLC
          </span>
        </a>

        <p className="font-inter text-[13px] leading-relaxed text-subtle">
          Jackson, Mississippi ·{" "}
          <a
            href="mailto:hello@fulatelier.com"
            className="text-accent-light transition-colors duration-150 hover:text-[#D9B872] hover:underline"
          >
            hello@fulatelier.com
          </a>
        </p>

        <a
          href="/"
          className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-subtle transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B872] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060607]"
        >
          fulatelier.com →
        </a>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1200px] px-6 py-5 text-center">
          <p className="font-inter text-[11px] text-subtle/70">
            © {new Date().getFullYear()} Fulatelier LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
