"use client";

import { Button } from "@/components/ui/Button";
import { LogEntryCard } from "@/components/ui/LogEntryCard";
import { social } from "@/lib/constants";

const ENTRIES = [
  {
    platform: "LINKEDIN" as const,
    date: "2026-06-18",
    preview:
      "Checkout redesign for a Gulf Coast retailer: we cut the path from cart to confirmation down to three screens, surfaced shipping estimates earlier, and tested the flow on a phone first — because that’s where most of their buyers finish.",
    href: social.linkedin,
  },
  {
    platform: "FACEBOOK" as const,
    date: "2026-05-29",
    preview:
      "Information architecture workshop for a Jackson professional services firm. Mapped every page against the questions clients actually ask on discovery calls, then rebuilt the nav so the answer is never more than two clicks away.",
    href: social.facebook,
  },
  {
    platform: "LINKEDIN" as const,
    date: "2026-04-12",
    preview:
      "Launch day for a Mississippi contractor site. Soft-opened the estimate form Friday afternoon, watched the first three requests come in before Monday, and spent the weekend tightening mobile form labels based on that real traffic.",
    href: social.linkedin,
  },
] as const;

/**
 * Build Log — public process posts from Facebook and LinkedIn.
 */
export function BuildLog() {
  return (
    <section
      id="build-log"
      className="section-fulatelier bg-background"
      aria-labelledby="build-log-heading"
    >
      <div className="container-fulatelier">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            The Build Log
          </p>
          <h2
            id="build-log-heading"
            className="mt-4 font-playfair text-h2 font-bold tracking-[-0.015em] text-text lg:text-h2-desktop"
          >
            Watch It Get Built.
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-subtle lg:text-lg">
            Every tool, every decision, every project — documented in public.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {ENTRIES.map((entry) => (
            <LogEntryCard
              key={`${entry.platform}-${entry.date}`}
              platform={entry.platform}
              date={entry.date}
              preview={entry.preview}
              href={entry.href}
            />
          ))}
        </div>

        <div className="mt-12 border border-accent bg-card px-6 py-8 text-center lg:mt-16 lg:px-10 lg:py-10">
          <p className="font-inter text-base leading-relaxed text-text lg:text-lg">
            Follow the Build Log on Facebook and LinkedIn for weekly updates.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
            >
              Facebook
            </Button>
            <Button
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
