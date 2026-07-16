"use client";

import Image from "next/image";

export type ProjectLinkStatus = "live" | "concept";

export type ProjectLinkCardProps = {
  status: ProjectLinkStatus;
  displayUrl: string;
  siteUrl: string;
  projectType: string;
  projectName: string;
  description: string;
  imageSrc?: string;
};

/**
 * External project / reference site card — links out (no embeds).
 */
export function ProjectLinkCard({
  status,
  displayUrl,
  siteUrl,
  projectType,
  projectName,
  description,
  imageSrc,
}: ProjectLinkCardProps) {
  const statusLabel = status === "live" ? "LIVE SITE" : "CONCEPT BUILD";
  const initial = projectName.trim().charAt(0).toUpperCase() || "F";

  return (
    <a
      href={siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View project ${projectName} at ${displayUrl}`}
      className="group flex h-full flex-col overflow-hidden border border-accent/40 bg-card transition-colors duration-150 hover:border-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Top bar */}
      <div className="flex h-9 items-center justify-between gap-3 border-b border-accent/20 bg-footer px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="inline-block h-2 w-2 shrink-0 bg-[#22C55E]"
            style={{ borderRadius: "50%" }}
            aria-hidden="true"
          />
          <span className="truncate font-inter text-[10px] tracking-[0.1em] text-subtle">
            {statusLabel}
          </span>
        </div>
        <span className="shrink-0 font-inter text-[10px] text-accent/70">
          {displayUrl}
        </span>
      </div>

      {/* Image / initial */}
      <div className="relative h-[180px] overflow-hidden border-b border-accent/20 bg-background">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-top transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 360px"
          />
        ) : (
          <div className="flex h-full items-center justify-center" aria-hidden="true">
            <span className="select-none font-cormorant text-[64px] font-bold text-accent opacity-25">
              {initial}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 py-5">
        <p className="mb-2 font-mono text-[9px] tracking-[0.15em] text-accent">
          {projectType}
        </p>
        <h3 className="mb-2 font-cormorant text-[22px] font-semibold tracking-[-0.01em] text-text">
          {projectName}
        </h3>
        <p className="line-clamp-2 font-inter text-[13px] leading-[1.6] text-subtle">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-accent/20 px-5 py-3">
        <span className="font-inter text-[11px] text-accent">
          View Project →
        </span>
        <span
          className="text-accent transition-transform duration-200 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </a>
  );
}
