import type { AnchorHTMLAttributes, ReactNode } from "react";

export type ArrowLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/**
 * Text link with a gold arrow that slides 4px right on hover.
 * Sharp corners, cream label — secondary CTA companion to Button.
 */
export function ArrowLink({
  children,
  className = "",
  ...props
}: ArrowLinkProps) {
  return (
    <a
      className={[
        "group inline-flex min-h-11 cursor-pointer items-center gap-3",
        "font-inter text-xs font-semibold uppercase tracking-[0.15em] text-text",
        "transition-colors duration-300 ease-out hover:text-gold-light",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="inline-block text-accent transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
      >
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <path
            d="M0 6H14M14 6L9 1M14 6L9 11"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </span>
    </a>
  );
}
