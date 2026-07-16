"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LiveFeedPanel } from "@/components/ui/LiveFeedPanel";
import { PostCard } from "@/components/ui/PostCard";
import { ProjectLinkCard } from "@/components/ui/ProjectLinkCard";
import { social } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const MAIN_FEED = [
  {
    kind: "post" as const,
    platform: "linkedin" as const,
    author: "Gerald Anderson",
    role: "Founder, Fulatelier LLC",
    date: "Jul 14, 2026",
    content:
      "Building the Fulatelier website in public — every section documented, every decision explained. Dark luxury craftsman aesthetic, Next.js 14, Playfair Display. This is what build-in-public looks like for a boutique web studio.",
    // TODO: replace with the real individual LinkedIn post URL once available
    postUrl: social.linkedin,
  },
  {
    kind: "project" as const,
    status: "live" as const,
    displayUrl: "for-living.it",
    siteUrl: "https://www.for-living.it/",
    projectType: "Reference · Premium Studio",
    projectName: "For Living Milano",
    description:
      "Italian interior design studio — the editorial craft and precision we reference when building premium digital experiences.",
  },
  {
    kind: "post" as const,
    platform: "facebook" as const,
    author: "Fulatelier LLC",
    date: "Jul 10, 2026",
    content:
      "Custom web development for Mississippi small businesses — starting at $500. No templates. No subscriptions. Built specifically for your business and your customers. Follow the page for weekly build updates.",
    // TODO: replace with the real individual Facebook post URL once available
    postUrl: social.facebook,
  },
];

const REFERENCES = [
  {
    status: "live" as const,
    displayUrl: "voxelo.ai",
    siteUrl: "https://www.voxelo.ai/",
    projectType: "Reference · Product Design",
    projectName: "Voxelo",
    description:
      "3D and AI studio — clean product storytelling and motion-forward web design.",
  },
  {
    status: "live" as const,
    displayUrl: "outfit.hellohello.is",
    siteUrl: "https://outfit.hellohello.is/",
    projectType: "Reference · Awwwards SOTD",
    projectName: "Outfit by ++hellohello",
    description:
      "Awwwards Site of the Day — interaction design and animation at the highest level.",
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
          className="font-cormorant text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-text md:text-[64px]"
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

function FadeUp({
  active,
  reduceMotion,
  delay,
  children,
}: {
  active: boolean;
  reduceMotion: boolean;
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="h-full"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={
        active
          ? reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0 }
          : reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 20 }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Build Log — Live Link cards to real posts and reference sites (no embeds).
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

        {/* Main feed */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-3">
          {MAIN_FEED.map((item, index) => (
            <FadeUp
              key={
                item.kind === "post"
                  ? `${item.platform}-${item.date}`
                  : item.displayUrl
              }
              active={inView}
              reduceMotion={reduceMotion}
              delay={index * 0.12}
            >
              {item.kind === "post" ? (
                <PostCard
                  platform={item.platform}
                  author={item.author}
                  role={item.role}
                  date={item.date}
                  content={item.content}
                  postUrl={item.postUrl}
                />
              ) : (
                <ProjectLinkCard
                  status={item.status}
                  displayUrl={item.displayUrl}
                  siteUrl={item.siteUrl}
                  projectType={item.projectType}
                  projectName={item.projectName}
                  description={item.description}
                />
              )}
            </FadeUp>
          ))}
        </div>

        {/* References row — for-living.it already in main feed above */}
        <div className="mx-auto mt-12 max-w-[1100px]">
          <p className="mb-6 text-center font-inter text-sm italic text-subtle">
            The craft we reference. The standard we build toward.
          </p>
          <p className="mb-6 mt-12 text-center font-mono text-[9px] tracking-[0.2em] text-accent/50">
            FUL://REFERENCES — Sites we study
          </p>
          <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-6 md:grid-cols-2">
            {REFERENCES.map((ref, index) => (
              <FadeUp
                key={ref.displayUrl}
                active={inView}
                reduceMotion={reduceMotion}
                delay={0.36 + index * 0.12}
              >
                <ProjectLinkCard
                  status={ref.status}
                  displayUrl={ref.displayUrl}
                  siteUrl={ref.siteUrl}
                  projectType={ref.projectType}
                  projectName={ref.projectName}
                  description={ref.description}
                />
              </FadeUp>
            ))}
          </div>
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
