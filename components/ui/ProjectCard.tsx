import { BrowserFrame } from "@/components/ui/BrowserFrame";

export type ProjectCardProps = {
  title: string;
  badge: string;
  description: string;
  url: string;
  href?: string;
  featured?: boolean;
  className?: string;
};

/**
 * Portfolio project card — BrowserFrame with Cormorant initial placeholder,
 * overlapping pill type-badge, gold hover overlay, and meta below the frame.
 */
export function ProjectCard({
  title,
  badge,
  description,
  url,
  href = "#work",
  featured = false,
  className = "",
}: ProjectCardProps) {
  const initial = title.trim().charAt(0).toUpperCase();

  return (
    <a
      href={href}
      className={[
        "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative">
        <BrowserFrame url={url} featured={featured}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              aria-hidden="true"
              className={[
                "select-none font-cormorant font-bold leading-none text-text opacity-[0.08]",
                featured
                  ? "text-[clamp(8rem,22vw,14rem)]"
                  : "text-[clamp(6rem,18vw,10rem)]",
              ].join(" ")}
            >
              {initial}
            </span>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-accent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-[0.08] group-focus-visible:opacity-[0.08]"
          />

          <p
            className={[
              "pointer-events-none absolute inset-x-0 bottom-0 px-5 py-4",
              "font-inter text-xs font-semibold uppercase tracking-[0.15em] text-text",
              "opacity-0 transition-opacity duration-200 ease-out",
              "group-hover:opacity-100 group-focus-visible:opacity-100",
            ].join(" ")}
          >
            View Project →
          </p>
        </BrowserFrame>

        <span className="absolute bottom-0 left-4 z-10 -translate-y-1/2 border border-accent bg-card px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-text">
          {badge}
        </span>
      </div>

      <div className="mt-8">
        <h3 className="font-cormorant text-[26px] font-semibold leading-snug tracking-[-0.01em] text-text transition-colors duration-200 ease-out group-hover:text-accent group-focus-visible:text-accent">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 font-inter text-sm leading-relaxed text-subtle">
          {description}
        </p>
      </div>
    </a>
  );
}
