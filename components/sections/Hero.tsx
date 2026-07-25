"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { HeroBrowserMockup } from "@/components/ui/HeroBrowserMockup";
import { LogoMark } from "@/components/ui/LogoMark";

const EASE = [0.16, 1, 0.3, 1] as const;
const RESOLVE_EASE = [0.34, 1.56, 0.64, 1] as const;
const LOGO_RESOLVE_DELAY = 1.25;

const HEADLINE_LINES = ["Precision Built.", "Purpose Driven."] as const;
const HEADLINE_DELAY = 1.7;

const OVERLAY_GRADIENT =
  "linear-gradient(to right, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.85) 45%, rgba(10,22,40,0.55) 65%, rgba(10,22,40,0.25) 100%)";

const MOBILE_BREAKPOINT_PX = 768;
/** Only used if `play()` fails or rejects before duration is known. */
const FINAL_FRAME_FALLBACK_SECONDS = 4.9;
/** Legacy vendor attributes with no typed React prop — old iOS Safari / Tencent X5 WebView. */
const LEGACY_PLAYSINLINE_ATTRS = {
  "webkit-playsinline": "true",
  "x5-playsinline": "true",
} as Record<string, string>;

const MOCKUP_REVEAL_DELAY_MS = 400;

/**
 * Connecting-line endpoints, as % of the hero section's width/height.
 * Calibrated against the compass video's held final frame at a 16:10-ish
 * desktop viewport — the right-hand compass tip to the mockup's bottom-left
 * corner. Approximate: object-cover cropping shifts the compass's on-screen
 * position slightly across very different aspect ratios.
 */
const COMPASS_TIP_ANCHOR = { x: 76, y: 85 };
const MOCKUP_CORNER_ANCHOR = { x: 48, y: 72 };

function RevealedWord({
  word,
  delay,
  reduceMotion,
}: {
  word: string;
  delay: number;
  reduceMotion: boolean | null;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
      <motion.span
        className="inline-block will-change-transform"
        initial={
          reduceMotion ? { opacity: 0 } : { opacity: 0, y: "110%" }
        }
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: "0%" }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {word}
      </motion.span>
    </span>
  );
}

function Headline({ alignLeft }: { alignLeft?: boolean }) {
  const reduceMotion = useReducedMotion();
  let wordIndex = 0;

  return (
    <h1
      id="hero-heading"
      className={[
        "max-w-[18ch] font-cormorant text-[56px] font-bold leading-[0.95] tracking-[-0.02em] text-accent-light md:text-[104px]",
        alignLeft ? "text-left" : "text-center",
      ].join(" ")}
      style={{
        textShadow:
          "0 0 8px rgba(10, 22, 40, 1), 0 2px 40px rgba(10, 22, 40, 1), 0 4px 80px rgba(10, 22, 40, 0.95)",
      }}
    >
      {HEADLINE_LINES.map((line) => {
        const words = line.split(" ");
        return (
          <span key={line} className="block">
            {words.map((word, i) => {
              const delay = HEADLINE_DELAY + wordIndex * 0.06;
              wordIndex += 1;
              return (
                <span key={`${line}-${word}-${i}`}>
                  <RevealedWord
                    word={word}
                    delay={delay}
                    reduceMotion={reduceMotion}
                  />
                  {i < words.length - 1 ? " " : null}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

/**
 * Fulatelier hero — compass video plays once and holds its final frame;
 * copy sits over the dark-left side of the gradient.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Browser mockup + connecting line are desktop-only — tracked via
  // matchMedia (not just a mount-time width check) so the mockup's
  // screenshot image is never fetched on mobile, and so it responds to
  // resize/orientation changes.
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT_PX}px)`);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile gets the compressed, smaller-dimension source — swapping
    // `src` directly on <video> (rather than the child <source>) takes
    // precedence per spec, so this is safe before the browser has
    // started loading the default source.
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT_PX;
    if (isMobile) {
      video.src = "/hero-compass-mobile.mp4";
      video.load();
    }

    const holdFinalFrame = () => {
      video.currentTime = Number.isFinite(video.duration)
        ? video.duration
        : FINAL_FRAME_FALLBACK_SECONDS;
      video.pause();
    };

    // "The compass just finished building this" — reveal the mockup
    // instantly when there's no real end-of-playback moment to pace
    // against (reduced motion, or autoplay blocked outright); otherwise
    // hold a beat after the video settles before it appears.
    const revealMockup = (delayMs: number) => {
      if (delayMs <= 0) {
        setVideoEnded(true);
        return;
      }
      window.setTimeout(() => setVideoEnded(true), delayMs);
    };

    if (reduceMotion) {
      // Skip the animation — show the final frame as a still immediately.
      if (video.readyState >= 1) {
        holdFinalFrame();
      } else {
        video.addEventListener("loadedmetadata", holdFinalFrame, { once: true });
      }
      revealMockup(0);
      return;
    }

    // Belt-and-suspenders: some mobile browsers ignore the autoPlay
    // attribute until play() is called explicitly. If it's rejected
    // (autoplay blocked), fall back to the held final frame rather
    // than leaving a blank/frozen first frame.
    video.play().catch(() => {
      holdFinalFrame();
      revealMockup(0);
    });

    const handleEnded = () => {
      holdFinalFrame();
      revealMockup(MOCKUP_REVEAL_DELAY_MS);
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [reduceMotion]);

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop={false}
        playsInline
        preload="auto"
        poster="/hero-compass-poster.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        style={{ filter: "brightness(0.85)" }}
        {...LEGACY_PLAYSINLINE_ATTRS}
      >
        <source src="/hero-compass.mp4" type="video/mp4" />
      </video>

      {/* Flat overlay — mobile only, hidden from md up */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[rgba(10,22,40,0.82)] md:hidden"
        aria-hidden="true"
      />
      {/* Dark-left / light-right gradient — desktop only */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{ background: OVERLAY_GRADIENT }}
        aria-hidden="true"
      />

      <BlueprintGrid className="z-[2]" />

      {isDesktop ? (
        <>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-[6] h-full w-full"
            aria-hidden="true"
          >
            <motion.line
              x1={COMPASS_TIP_ANCHOR.x}
              y1={COMPASS_TIP_ANCHOR.y}
              x2={MOCKUP_CORNER_ANCHOR.x}
              y2={MOCKUP_CORNER_ANCHOR.y}
              stroke="#A37E2C"
              strokeWidth={0.8}
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                videoEnded
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              // `pathLength`/`opacity` above only ever depend on `videoEnded`
              // (deterministically false pre-hydration on both server and
              // client) — reduceMotion only adjusts timing below, so this
              // can't hydration-mismatch the way reduceMotion-branched
              // `initial` values elsewhere in this file do.
              transition={
                reduceMotion
                  ? { duration: 0.2 }
                  : { duration: 0.6, delay: 0.4, ease: "linear" }
              }
            />
          </svg>
          <HeroBrowserMockup show={videoEnded} reduceMotion={Boolean(reduceMotion)} />
        </>
      ) : null}

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center px-6 py-section-mobile text-center md:items-start md:px-8 md:text-left lg:py-section-desktop">
        {/* Capped independently of the outer centered wrapper — on desktop
            this keeps copy clear of the browser mockup on the right rather
            than being centered by the outer div's own mx-auto. */}
        <div className="flex w-full flex-col items-center text-center md:items-start md:max-w-[560px] md:text-left">
          <motion.div
            className="mb-5 origin-center md:mb-6"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }
            }
            animate={
              reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
            }
            transition={{
              duration: 0.3,
              delay: LOGO_RESOLVE_DELAY,
              ease: reduceMotion ? EASE : RESOLVE_EASE,
            }}
          >
            <LogoMark className="h-20 w-20 md:h-28 md:w-28" />
          </motion.div>

          <motion.p
            className="mb-4 font-mono text-[10px] tracking-[0.2em] text-text"
            {...fadeUp(1.5)}
          >
            FUL://ATELIER
          </motion.p>

          <Headline alignLeft />

          <motion.p
            className="mt-6 max-w-[480px] font-inter text-lg font-normal leading-relaxed text-subtle"
            {...fadeUp(2.0)}
          >
            Custom websites and web applications built to perform — not just
            to exist.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-8 md:items-start"
            {...fadeUp(2.2)}
          >
            <Button href="#contact" variant="solid">
              Start Your Project
            </Button>
            <ArrowLink href="#work">View Our Work</ArrowLink>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 h-px origin-left bg-accent"
        initial={reduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 1 }}
        whileInView={
          reduceMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }
        }
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE }}
        aria-hidden="true"
      />
    </section>
  );
}
