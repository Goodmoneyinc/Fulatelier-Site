import { Button } from "@/components/ui/Button";

export type CarePricingCardProps = {
  name: string;
  price: string;
  description: string;
  includes: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

/**
 * Care plan tier card — static (no scroll-triggered reveal of its own;
 * CarePricing staggers these in as a group). Standard is visually elevated
 * per the Care spec: brighter border, inverted CTA, slight scale on desktop.
 */
export function CarePricingCard({
  name,
  price,
  description,
  includes,
  ctaLabel,
  ctaHref,
  featured = false,
}: CarePricingCardProps) {
  return (
    <div
      className={[
        "group relative flex h-full flex-col p-9 pt-11 transition-[border-color] duration-200 ease-out md:p-9",
        featured
          ? "border border-accent/80 bg-background hover:border-accent lg:z-[1] lg:scale-[1.03]"
          : "border border-accent/35 bg-card hover:border-accent/70",
      ].join(" ")}
    >
      {featured ? (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-accent px-3 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-background">
          Most Popular
        </span>
      ) : null}

      <h3 className="font-cormorant text-2xl font-semibold tracking-[-0.01em] text-text">
        {name}
      </h3>

      <p className="mt-5 font-cormorant text-[48px] font-bold leading-none tracking-[-0.02em] text-accent-light">
        {price}
        <span className="ml-1 font-inter text-xs font-normal tracking-normal text-subtle">
          /month
        </span>
      </p>

      <p className="mt-4 font-inter text-[13px] leading-relaxed text-subtle">
        {description}
      </p>

      <div className="my-6 h-px w-full bg-accent/25" aria-hidden="true" />

      <ul className="flex flex-1 flex-col gap-3">
        {includes.map((item) => (
          <li key={item} className="flex gap-2.5 font-inter text-xs leading-relaxed text-subtle">
            <span className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          variant={featured ? "solid" : "outline"}
          className="w-full"
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
