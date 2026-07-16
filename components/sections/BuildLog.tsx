"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LiveFeedPanel } from "@/components/ui/LiveFeedPanel";
import { SocialEmbed } from "@/components/ui/SocialEmbed";
import { social } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const POSTS = [
  {
    platform: "linkedin" as const,
    // TODO: paste real LinkedIn "Embed this post" iframe code here
    embedHtml: "",
    fallbackUrl: social.linkedin,
    ariaLabel: "LinkedIn post by Gerald Anderson",
  },
  {
    platform: "facebook" as const,
    // TODO: paste real Facebook embedded-post iframe code here
    embedHtml: "",
    fallbackUrl: social.facebook,
    ariaLabel: "Facebook post from Fulatelier LLC",
  },
  {
    platform: "linkedin" as const,
    // TODO: paste real LinkedIn "Embed this post" iframe code here
    embedHtml: "",
    fallbackUrl: social.linkedin,
    ariaLabel: "LinkedIn post by Gerald Anderson",
  },
];

function SectionHeader({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <motion.p
        className="font-mono text-[10px] tracking-[0.2em] text-accent"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 0.65 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.25, ease: "easeOut" }}
      >
        FUL://BUILD-LOG
      </motion.p>

      <div className="relative mt-4 inline-block w-full">
        {!reduceMotion ? (
          <motion.span
            className="pointer-events-none absolute left-0 top-1/2 z-10 h-px w-full origin-left bg-accent"
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={
              active
                ? { scaleX: [0, 1, 1], opacity: [1, 1, 0] }
                : { scaleX: 0, opacity: 1 }
            }
            transition={{
              duration: 0.45,
              delay: 0.15,
              times: [0, 300 / 450, 1],
              ease: "linear",
            }}
          />
        ) : null}

        <motion.h2
          id="build-log-heading"
          className="font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.015em] text-text md:text-[52px]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.3,
            delay: reduceMotion ? 0 : 0.15,
            ease: "easeOut",
          }}
        >
          Watch It Get Built.
        </motion.h2>
      </div>

      <motion.p
        className="mt-4 font-inter text-[17px] leading-relaxed text-subtle"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
        animate={
          active
            ? reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
            : reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 6 }
        }
        transition={{
          duration: reduceMotion ? 0.2 : 0.3,
          delay: reduceMotion ? 0 : 0.45,
          ease: "easeOut",
        }}
      >
        Every decision, every project — documented in public across both
        platforms.
      </motion.p>
    </div>
  );
}

/**
 * Build Log — Live Feed of official LinkedIn & Facebook embeds.
 */
export function BuildLog() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="build-log"
      role="region"
      aria-label="Build Log — recent posts"
      aria-labelledby="build-log-heading"
      className="w-full border-y border-accent/30 bg-background py-section-mobile md:py-section-desktop"
    >
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeader active={inView} reduceMotion={reduceMotion} />

        <LiveFeedPanel />

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-3">
          {POSTS.map((post, index) => (
            <motion.div
              key={`${post.platform}-${index}`}
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
              }
              animate={
                inView
                  ? reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0 }
                  : reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 20 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.12,
                ease: EASE,
              }}
            >
              <SocialEmbed
                platform={post.platform}
                embedHtml={post.embedHtml}
                fallbackUrl={post.fallbackUrl}
                ariaLabel={post.ariaLabel}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="font-inter text-[15px] leading-relaxed text-subtle">
            More posts every week across both platforms.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Follow on LinkedIn →
            </Button>
            <Button
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
            >
              Follow on Facebook →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
