import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from "react";

type Variant = "primary" | "ghost";
type Size = "lg" | "md";

type SharedProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: undefined;
  };

type AsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string;
  };

export type CTAButtonProps = AsButton | AsLink;

const sizeClasses: Record<Size, string> = {
  lg: "px-9 py-5 text-sm",
  md: "px-7 py-4 text-[13px]",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "border border-[#D9B872]/40 bg-gradient-to-b from-[#D9B872] to-[#A37E2C] text-[#0A0A0B] shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_12px_32px_-8px_rgba(163,126,44,0.55)] hover:shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_16px_40px_-6px_rgba(217,184,114,0.65)] hover:-translate-y-0.5",
  ghost:
    "border border-white/15 bg-white/[0.03] text-text backdrop-blur-md hover:border-accent-light/50 hover:bg-white/[0.06]",
};

function buildClassName(variant: Variant, size: Size, className: string) {
  return [
    "group relative inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5",
    "rounded-[9999px] font-inter font-semibold uppercase tracking-[0.1em]",
    "transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B872] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]",
    "disabled:pointer-events-none disabled:opacity-50",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Blueprint page CTA — brass pill, distinct chrome from the sitewide
 * sharp-cornered Button. Scoped to /blueprint only.
 */
export const CTAButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CTAButtonProps
>(function CTAButton(props, ref) {
  const { variant = "primary", size = "lg", children, className = "" } = props;
  const classes = buildClassName(variant, size, className);

  if (props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      children: _c,
      className: _cn,
      href,
      ...anchorRest
    } = props;
    return (
      <a ref={ref as Ref<HTMLAnchorElement>} href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const {
    variant: _v,
    size: _s,
    children: _c,
    className: _cn,
    href: _h,
    ...buttonRest
  } = props;
  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={buttonRest.type ?? "button"}
      className={classes}
      {...buttonRest}
    >
      {children}
    </button>
  );
});
