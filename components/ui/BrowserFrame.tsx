import type { ReactNode } from "react";

export type BrowserFrameProps = {
  /** Cosmetic domain shown in the address bar */
  url: string;
  children: ReactNode;
  className?: string;
  /** Taller content area for featured / full-width projects */
  featured?: boolean;
  /**
   * Stretch to fill a flex parent instead of using aspect-ratio.
   * Used by full-viewport Work panels.
   */
  fill?: boolean;
};

/**
 * Clean CSS browser chrome — slate window dots (not macOS traffic lights),
 * address bar with cosmetic domain, sharp corners throughout.
 */
export function BrowserFrame({
  url,
  children,
  className = "",
  featured = false,
  fill = false,
}: BrowserFrameProps) {
  return (
    <div
      className={[
        "overflow-hidden border border-subtle/30 bg-card",
        fill ? "flex min-h-0 flex-col" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex shrink-0 items-center gap-3 border-b border-subtle/25 bg-background px-3 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 bg-subtle" />
          <span className="h-2 w-2 bg-subtle" />
          <span className="h-2 w-2 bg-subtle" />
        </div>
        <div className="min-w-0 flex-1 bg-card px-3 py-1">
          <p className="truncate font-inter text-[11px] tracking-wide text-subtle">
            {url}
          </p>
        </div>
      </div>
      <div
        className={[
          "relative overflow-hidden bg-background",
          fill
            ? "min-h-0 flex-1"
            : featured
              ? "aspect-[16/9] min-h-[280px] lg:min-h-[420px]"
              : "aspect-[16/10] min-h-[220px]",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
