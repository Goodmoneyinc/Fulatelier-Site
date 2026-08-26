import Image from "next/image";

export type BlueprintProjectCardProps = {
  href: string;
  screenshot: string;
  badge: string;
  name: string;
  description: string;
  /** Cosmetic domain shown in the browser chrome URL bar */
  displayUrl: string;
  /** Brighter treatment for the one real live SaaS product in the set */
  emphasized?: boolean;
};

/**
 * Work showcase card — browser-chrome frame around a live-site screenshot,
 * linking straight out to the real project. Distinct from the main site's
 * ProjectCard (components/ui/ProjectCard.tsx), which frames concept work.
 */
export function ProjectCard({
  href,
  screenshot,
  badge,
  name,
  description,
  displayUrl,
  emphasized = false,
}: BlueprintProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group block overflow-hidden bg-card transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "hover:-translate-y-1",
        emphasized
          ? "border border-gold-light/80 hover:border-gold-light"
          : "border border-accent/35 hover:border-accent/75",
      ].join(" ")}
    >
      {/* Browser chrome */}
      <div className="flex h-7 items-center justify-between gap-3 border-b border-accent/20 bg-footer px-3">
        <div className="flex items-center gap-[5px]" aria-hidden="true">
          <span className="h-[5px] w-[5px] bg-[#2A3A52]" />
          <span className="h-[5px] w-[5px] bg-[#2A3A52]" />
          <span className="h-[5px] w-[5px] bg-[#2A3A52]" />
        </div>
        <div className="min-w-0 flex-1 border border-accent/15 bg-card px-2.5 py-[3px]">
          <p className="truncate text-center font-mono text-[9px] text-subtle">
            {displayUrl}
          </p>
        </div>
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-accent/50"
        >
          <path
            d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6M14 4h6v6M10 14 20 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </div>

      {/* Screenshot */}
      <div className="relative h-40 overflow-hidden bg-background md:h-[200px]">
        <Image
          src={screenshot}
          alt={`${name} — live site screenshot`}
          fill
          className="object-cover object-top transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-4">
        <p
          className={[
            "mb-2 font-mono text-[9px] uppercase tracking-[0.15em]",
            emphasized ? "text-gold-light" : "text-accent",
          ].join(" ")}
        >
          {badge}
        </p>
        <h3 className="mb-1.5 font-cormorant text-xl font-semibold tracking-[-0.01em] text-text">
          {name}
        </h3>
        <p className="line-clamp-2 font-inter text-[13px] leading-[1.6] text-subtle">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center font-inter text-[11px] tracking-[0.05em] text-accent">
            View Live
            <span
              aria-hidden="true"
              className="ml-1 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </span>
          <span
            className={[
              "border bg-background px-2 py-[3px] font-mono text-[8px]",
              emphasized
                ? "border-[#22C55E] text-[#22C55E]"
                : "border-[#22C55E]/60 text-[#22C55E]",
            ].join(" ")}
          >
            LIVE
          </span>
        </div>
      </div>
    </a>
  );
}
