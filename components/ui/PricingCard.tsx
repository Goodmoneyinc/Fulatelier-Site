import { Button } from "@/components/ui/Button";

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 7.5L5.5 11L12 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export type PricingCardProps = {
  name: string;
  price: string;
  subtitle: string;
  features: readonly string[];
  delivery: string;
  ctaLabel: string;
  ctaHref?: string;
  popular?: boolean;
};

/**
 * Website pricing tier card.
 * Popular tier: full-opacity gold border + desktop elevation.
 */
export function PricingCard({
  name,
  price,
  subtitle,
  features,
  delivery,
  ctaLabel,
  ctaHref = "#contact",
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={[
        "relative flex h-full flex-col bg-card p-8 lg:p-9",
        popular
          ? "border border-accent lg:-translate-y-4 motion-reduce:lg:translate-y-0"
          : "border border-accent/30",
      ].join(" ")}
    >
      {popular ? (
        <p className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 bg-accent px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-background">
          Most Popular
        </p>
      ) : null}

      <h3 className="font-playfair text-2xl font-semibold tracking-[-0.01em] text-text">
        {name}
      </h3>

      <p className="mt-4 font-playfair text-[36px] font-bold leading-none tracking-[-0.02em] text-accent">
        {price}
      </p>

      <p className="mt-3 font-inter text-[13px] leading-relaxed text-subtle">
        {subtitle}
      </p>

      <div
        className="my-6 h-px w-full bg-accent/40"
        aria-hidden="true"
      />

      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex gap-3 font-inter text-sm leading-snug text-text"
          >
            <span className="mt-0.5 shrink-0 text-accent">
              <CheckIcon />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">
        {delivery}
      </p>

      <div className="mt-auto pt-8">
        <Button href={ctaHref} variant={popular ? "solid" : "outline"} className="w-full">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
