"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export type SocialPlatform = "linkedin" | "facebook";

export type SocialEmbedProps = {
  platform: SocialPlatform;
  /** Raw platform "Embed this post" iframe HTML. Empty = show fallback. */
  embedHtml: string;
  /** Direct link to the real post / profile when embed is unavailable. */
  fallbackUrl: string;
  /** Accessible name for the article wrapper. */
  ariaLabel?: string;
  className?: string;
};

const EMBED_TIMEOUT_MS = 8000;

const PLATFORM_HEIGHT: Record<SocialPlatform, number> = {
  linkedin: 520,
  facebook: 560,
};

const PLATFORM_LABEL: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
};

function extractIframeSrc(html: string): string | null {
  const match = html.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function extractIframeHeight(html: string, fallback: number): number {
  const match = html.match(/\bheight\s*=\s*["']?(\d+)/i);
  if (!match?.[1]) return fallback;
  const n = Number.parseInt(match[1], 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/**
 * Lazy-mounted social post embed with branded skeleton + link fallback.
 * Renders real LinkedIn/Facebook iframes only — never recreates their chrome.
 */
export function SocialEmbed({
  platform,
  embedHtml,
  fallbackUrl,
  ariaLabel,
  className = "",
}: SocialEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  const src = extractIframeSrc(embedHtml);
  const height = extractIframeHeight(embedHtml, PLATFORM_HEIGHT[platform]);
  const hasEmbed = Boolean(src);

  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!hasEmbed);

  useEffect(() => {
    if (!inView || !hasEmbed) return;
    setMounted(true);
  }, [inView, hasEmbed]);

  useEffect(() => {
    if (!mounted || !hasEmbed || loaded || failed) return;

    const timer = window.setTimeout(() => {
      setFailed(true);
    }, EMBED_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [mounted, hasEmbed, loaded, failed]);

  const platformName = PLATFORM_LABEL[platform];
  const label =
    ariaLabel ??
    `${platformName} post${platform === "linkedin" ? " by Gerald Anderson" : ""}`;
  const iframeTitle =
    platform === "linkedin"
      ? "LinkedIn post by Gerald Anderson"
      : "Facebook post from Fulatelier LLC";

  const showFallback = failed || (!hasEmbed && inView);
  const showSkeleton = hasEmbed && mounted && !loaded && !failed;
  const showIframe = hasEmbed && mounted && !failed;

  return (
    <div
      ref={containerRef}
      role="article"
      aria-label={label}
      className={[
        "relative flex h-full min-h-[280px] flex-col overflow-hidden border border-accent/40 bg-card",
        className,
      ].join(" ")}
      style={{ minHeight: hasEmbed && !failed ? height : undefined }}
    >
      {showSkeleton ? (
        <div
          className="absolute inset-0 z-[1] flex flex-col justify-center bg-card px-6"
          aria-hidden="true"
        >
          <motion.div
            className="h-px w-full origin-left bg-accent/60"
            animate={{ opacity: [0.25, 0.85, 0.25], scaleX: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-accent/50">
            LOADING EMBED
          </p>
        </div>
      ) : null}

      {showIframe ? (
        <iframe
          src={src!}
          title={iframeTitle}
          loading="lazy"
          className="relative z-0 w-full border-0 bg-card"
          style={{ height, opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          allowFullScreen
        />
      ) : null}

      {showFallback ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-card px-6 py-12 text-center">
          <p className="font-inter text-sm leading-relaxed text-subtle">
            This embed couldn&apos;t load here.
          </p>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View this post on ${platformName}`}
            className="font-inter text-sm font-medium text-accent-light underline decoration-accent-light underline-offset-4 transition-colors duration-200 hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View this post on {platformName} →
          </a>
        </div>
      ) : null}

      {/* Pre-mount placeholder so layout holds before scroll-into-view */}
      {!mounted && hasEmbed && !failed ? (
        <div
          className="flex flex-1 items-center justify-center bg-card"
          style={{ minHeight: height }}
          aria-hidden="true"
        >
          <div className="h-px w-2/3 bg-accent/30" />
        </div>
      ) : null}
    </div>
  );
}
