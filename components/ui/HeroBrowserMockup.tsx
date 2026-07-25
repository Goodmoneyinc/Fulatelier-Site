"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export type HeroBrowserMockupProps = {
  /** True once the compass video has settled on its final frame. */
  show: boolean;
  reduceMotion: boolean;
};

/**
 * Browser-chrome preview of the finished site, revealed in the hero once
 * the compass video holds its final frame — "the compass just built this."
 * Desktop only; the parent gates rendering below the md breakpoint.
 */
export function HeroBrowserMockup({ show, reduceMotion }: HeroBrowserMockupProps) {
  return (
    <div className="absolute right-[4%] top-1/2 z-[6] w-[48%] max-w-[640px] -translate-y-1/2">
      <motion.div
        // `initial` stays constant regardless of reduceMotion — it's only
        // ever visible pre-hydration as opacity:0, and varying it by a
        // value framer-motion can't know server-side (useReducedMotion()
        // is always null during SSR) causes a hydration mismatch.
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={
          show
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 20, scale: 0.96 }
        }
        transition={
          reduceMotion
            ? { duration: 0.3, ease: "easeOut" }
            : { duration: 0.8, delay: 0.2, ease: EASE }
        }
      >
        <div className="border border-accent/60 bg-footer">
          <div className="flex h-8 items-center gap-2 border-b border-accent/30 bg-background px-3">
            <span className="h-1.5 w-1.5 shrink-0 bg-[#2A3A52]" aria-hidden="true" />
            <span className="h-1.5 w-1.5 shrink-0 bg-[#2A3A52]" aria-hidden="true" />
            <span className="h-1.5 w-1.5 shrink-0 bg-[#2A3A52]" aria-hidden="true" />
            <span className="mx-auto flex w-3/5 items-center justify-center border border-accent/20 bg-card px-3 py-1">
              <span className="truncate font-mono text-[10px] text-subtle">
                fulatelier.com
              </span>
            </span>
          </div>

          <div className="relative h-[340px] w-full overflow-hidden bg-background">
            <Image
              src="/site-screenshot.jpg"
              alt=""
              fill
              className="object-cover object-top"
              aria-hidden="true"
            />
          </div>
        </div>

        <div
          className="h-10 w-full blur-[8px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(163, 126, 44, 0.08), transparent)",
          }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
