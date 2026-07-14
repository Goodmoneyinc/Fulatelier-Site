import { ArrowLink } from "@/components/ui/ArrowLink";

export type LogPlatform = "LINKEDIN" | "FACEBOOK";

export type LogEntryCardProps = {
  platform: LogPlatform;
  date: string;
  preview: string;
  href: string;
};

/**
 * Build Log post preview card — platform badge, date, truncated cream copy.
 */
export function LogEntryCard({
  platform,
  date,
  preview,
  href,
}: LogEntryCardProps) {
  return (
    <article className="flex h-full flex-col bg-card p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-light">
          {platform}
        </p>
        <time
          dateTime={date}
          className="font-inter text-xs text-subtle"
        >
          {formatDisplayDate(date)}
        </time>
      </div>

      <p className="mt-4 line-clamp-3 font-inter text-[15px] leading-relaxed text-text">
        {preview}
      </p>

      <div className="mt-auto pt-6">
        <ArrowLink href={href} target="_blank" rel="noopener noreferrer">
          Read more
        </ArrowLink>
      </div>
    </article>
  );
}

function formatDisplayDate(isoDate: string) {
  const parsed = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
