import type { ReactNode } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";

export type ServiceCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  price: string;
  features: readonly string[];
  ctaLabel: string;
  ctaHref: string;
};

/**
 * Service offering card — card surface, gold top rule, sharp corners.
 * Hover: top border brightens and the card lifts 4px (motion-safe).
 */
export function ServiceCard({
  icon,
  title,
  description,
  price,
  features,
  ctaLabel,
  ctaHref,
}: ServiceCardProps) {
  return (
    <article
      className={[
        "group flex h-full flex-col border-t-[3px] border-accent/60 bg-card p-8 lg:p-10",
        "transition-[transform,border-color] duration-200 ease-out",
        "motion-safe:hover:-translate-y-1 hover:border-accent",
        "focus-within:border-accent motion-safe:focus-within:-translate-y-1",
      ].join(" ")}
    >
      <div className="mb-6 text-accent" aria-hidden="true">
        {icon}
      </div>

      <h3 className="font-playfair text-[28px] font-semibold leading-tight tracking-[-0.01em] text-text">
        {title}
      </h3>

      <p className="mt-3 font-inter text-base leading-relaxed text-subtle">
        {description}
      </p>

      <p className="mt-6 font-playfair text-[32px] font-bold leading-none tracking-[-0.02em] text-accent">
        {price}
      </p>

      <ul className="mt-8 flex flex-col gap-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex gap-3 font-inter text-sm leading-snug text-text"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent"
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <ArrowLink href={ctaHref}>{ctaLabel}</ArrowLink>
      </div>
    </article>
  );
}

/** Hand-drawn browser / window frame — line art, no fill. */
export function BrowserWindowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="48"
      height="40"
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="37"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M1.5 11H46.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="6.25" r="1.25" fill="currentColor" />
      <circle cx="13" cy="6.25" r="1.25" fill="currentColor" />
      <circle cx="18" cy="6.25" r="1.25" fill="currentColor" />
      <path
        d="M10 20H28M10 26H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Hand-drawn stacked / layered windows — line art, no fill. */
export function LayeredWindowsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="48"
      height="44"
      viewBox="0 0 48 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Back window */}
      <rect
        x="10"
        y="1.5"
        width="36.5"
        height="27"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10 8H46.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Front window */}
      <rect
        x="1.5"
        y="12.5"
        width="36.5"
        height="30"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M1.5 19.5H38" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 27H26M9 32.5H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
