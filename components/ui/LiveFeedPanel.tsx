"use client";

import { social } from "@/lib/constants";

function LinkedInMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.5 0h-13A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 14.5 0zM4.75 13H2.5V5.75h2.25V13zM3.625 4.75a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zM13.5 13h-2.25V9.2c0-.95-.34-1.6-1.2-1.6-.65 0-1.04.44-1.21.86-.06.15-.08.36-.08.57V13H6.5s.03-6.5 0-7.25h2.25v1.03c.3-.46.83-1.12 2.03-1.12 1.48 0 2.72.97 2.72 3.05V13z" />
    </svg>
  );
}

function FacebookMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8.05C16 3.6 12.42 0 8 0S0 3.6 0 8.05C0 12.07 2.92 15.4 6.75 16v-5.62H4.72V8.05h2.03V6.28c0-2.02 1.2-3.14 3.03-3.14.88 0 1.8.16 1.8.16v1.99h-1.02c-1 0-1.31.63-1.31 1.27v1.49h2.23l-.36 2.33H9.25V16C13.08 15.4 16 12.07 16 8.05z" />
    </svg>
  );
}

function LiveDot() {
  return (
    <span
      className="inline-block h-1.5 w-1.5 shrink-0 bg-[#2ECC71]"
      style={{ borderRadius: "50%" }}
      aria-hidden="true"
    />
  );
}

/**
 * Live Feed identity panel — Fulatelier chrome around real social destinations.
 * Icons are nominative identifying marks only, not platform UI recreations.
 */
export function LiveFeedPanel() {
  return (
    <div className="mx-auto mb-16 w-full max-w-[480px] border border-accent/40 bg-footer">
      {/* LinkedIn row */}
      <div className="flex h-[52px] items-center justify-between gap-3 border-b border-accent/20 px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden text-text"
            style={{ borderRadius: "3px" }}
          >
            <LinkedInMark />
          </span>
          <LiveDot />
          <p className="truncate font-inter text-[13px] text-text">
            Gerald Anderson on LinkedIn
          </p>
        </div>
        <span className="shrink-0 border border-accent/50 px-2.5 py-1 font-inter text-[11px] text-accent">
          Following
        </span>
      </div>

      {/* Facebook row */}
      <div className="flex h-[52px] items-center justify-between gap-3 px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden text-text"
            style={{ borderRadius: "3px" }}
          >
            <FacebookMark />
          </span>
          <LiveDot />
          <p className="truncate font-inter text-[13px] text-text">
            Fulatelier LLC on Facebook
          </p>
        </div>
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 border border-accent/50 px-2.5 py-1 font-inter text-[11px] text-accent transition-colors duration-150 ease-out hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
        >
          Follow Page →
        </a>
      </div>
    </div>
  );
}
