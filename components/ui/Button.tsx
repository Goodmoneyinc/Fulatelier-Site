import { forwardRef } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from "react";

type ButtonVariant = "outline" | "solid";

type SharedProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  outline:
    "border border-accent bg-transparent text-text hover:border-gold-light hover:bg-gold-light hover:text-background",
  solid:
    "border border-accent bg-accent text-text hover:border-gold-light hover:bg-gold-light hover:text-background",
};

function buildClassName(variant: ButtonVariant, className: string) {
  return [
    "inline-flex min-h-11 cursor-pointer items-center justify-center px-5 py-3",
    "font-inter text-xs font-semibold uppercase tracking-[0.15em]",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Fulatelier button — sharp corners, gold accent system.
 * Outline variant is the primary CTA chrome (e.g. "Get Started").
 */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const { variant = "outline", children, className = "" } = props;
  const classes = buildClassName(variant, className);

  if (props.href !== undefined) {
    const { variant: _v, children: _c, className: _cn, href, ...anchorRest } =
      props;
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  const { variant: _v, children: _c, className: _cn, href: _h, ...buttonRest } =
    props;
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
