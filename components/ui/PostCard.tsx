"use client";

export type PostPlatform = "linkedin" | "facebook";

export type PostCardProps = {
  platform: PostPlatform;
  author: string;
  role?: string;
  date: string;
  content: string;
  postUrl: string;
};

const PLATFORM = {
  linkedin: {
    name: "LinkedIn",
    badgeBg: "#0A66C2",
    badgeLabel: "in",
    viewColor: "#70B5F9",
    viewLabel: "View on LinkedIn →",
  },
  facebook: {
    name: "Facebook",
    badgeBg: "#1877F2",
    badgeLabel: "f",
    viewColor: "#5B9FFF",
    viewLabel: "View on Facebook →",
  },
} as const;

/**
 * Static social post card — links out to the real post (no embeds).
 */
export function PostCard({
  platform,
  author,
  role,
  date,
  content,
  postUrl,
}: PostCardProps) {
  const meta = PLATFORM[platform];

  return (
    <a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${meta.viewLabel.replace(" →", "")} by ${author}`}
      className="group flex h-full flex-col overflow-hidden border border-accent/40 bg-card transition-colors duration-150 hover:border-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Top bar */}
      <div className="flex h-9 shrink-0 items-center justify-between gap-3 border-b border-accent/20 bg-footer px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex h-[18px] w-[18px] shrink-0 items-center justify-center font-inter text-[10px] font-bold text-text"
            style={{ backgroundColor: meta.badgeBg, borderRadius: "3px" }}
            aria-hidden="true"
          >
            {meta.badgeLabel}
          </span>
          <span className="truncate font-inter text-[11px] text-subtle">
            {meta.name}
          </span>
        </div>
        <time className="shrink-0 font-inter text-[10px] text-subtle">
          {date}
        </time>
      </div>

      {/* Media band — matches ProjectLinkCard image height for equal row cards */}
      <div
        className="relative flex h-[180px] shrink-0 items-center justify-center border-b border-accent/20 bg-background"
        aria-hidden="true"
      >
        <span
          className="flex h-14 w-14 items-center justify-center font-inter text-xl font-bold text-text"
          style={{ backgroundColor: meta.badgeBg, borderRadius: "3px" }}
        >
          {meta.badgeLabel}
        </span>
      </div>

      {/* Body — consistent text block height */}
      <div className="flex flex-1 flex-col px-5 py-5">
        <div className="min-h-[2.75rem]">
          <p className="font-inter text-xs font-semibold text-text">{author}</p>
          {role ? (
            <p className="mt-0.5 font-inter text-[11px] text-subtle">{role}</p>
          ) : null}
        </div>
        <p className="mt-4 min-h-[5.6rem] line-clamp-4 font-inter text-sm leading-[1.6] text-[#E0D8CE]">
          {content}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-accent/20 px-5 py-3">
        <span
          className="font-inter text-[11px]"
          style={{ color: meta.viewColor }}
        >
          {meta.viewLabel}
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
