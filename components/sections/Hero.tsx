"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";

const EASE = [0.16, 1, 0.3, 1] as const;
const RESOLVE_EASE = [0.34, 1.56, 0.64, 1] as const;
const LOGO_RESOLVE_DELAY = 1.25;

const HEADLINE_LINES = ["Precision Built.", "Purpose Driven."] as const;
const HEADLINE_DELAY = 1.7;

/** Final-frame hold point for the 8s compass video */
const FINAL_FRAME = 7.8;
const DESKTOP_QUERY = "(min-width: 768px)";

const OVERLAY_GRADIENT =
  "linear-gradient(to right, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.88) 40%, rgba(10,22,40,0.45) 65%, rgba(10,22,40,0.15) 100%)";

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
        "max-w-[18ch] font-cormorant text-[clamp(56px,8vw,104px)] font-bold leading-[0.92] tracking-[-0.03em] text-accent-light",
        alignLeft ? "text-left" : "text-center",
      ].join(" ")}
      style={{
        WebkitTextStroke: "1.5px #0A1628",
        paintOrder: "stroke fill",
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
                  {i < words.length - 1 ? " " : null}
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
 * Fulatelier hero — scroll-scrubbed compass video. The 200vh section pins its
 * content while scroll position drives the video's currentTime, so the compass
 * draws forward as you scroll and rewinds when you scroll back.
 * Mobile shows the static poster; reduced motion holds the final frame.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      // Skip the scrub — hold the finished drawing as a still.
      const holdFinalFrame = () => {
        video.currentTime = FINAL_FRAME;
        video.pause();
      };
      if (video.readyState >= 1) {
        holdFinalFrame();
      } else {
        video.addEventListener("loadedmetadata", holdFinalFrame, {
          once: true,
        });
        return () =>
          video.removeEventListener("loadedmetadata", holdFinalFrame);
      }
      return;
    }

    video.pause();
    video.currentTime = 0;

    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero || !video.duration) return;
      // Scrub only runs against the 200vh desktop layout.
      if (!window.matchMedia(DESKTOP_QUERY).matches) return;

      const rect = hero.getBoundingClientRect();
      const scrolled = -rect.top;
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      video.currentTime = progress * video.duration;
    };

    const handleLoaded = () => handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    video.addEventListener("loadedmetadata", handleLoaded);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [reduceMotion]);

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-background md:h-[200vh] motion-reduce:md:h-auto"
      aria-labelledby="hero-heading"
    >
      <div className="relative flex min-h-screen w-full items-center overflow-hidden md:sticky md:top-0 md:h-screen md:min-h-0 motion-reduce:md:static motion-reduce:md:h-auto motion-reduce:md:min-h-screen">
        {/* Static poster — mobile only; the scrub video is a desktop treatment */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-compass-v2-poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center md:hidden"
          style={{ filter: "brightness(0.85)" }}
        />
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/hero-compass-v2-poster.jpg"
          className="absolute inset-0 z-0 hidden h-full w-full object-cover object-center md:block"
          style={{ filter: "brightness(0.85)" }}
        >
          <source src="/hero-compass-v2.mp4" type="video/mp4" />
        </video>

        {/* Flat overlay — mobile only, hidden from md up */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[rgba(10,22,40,0.82)] md:hidden"
          aria-hidden="true"
        />
        {/* Dark-left / light-right gradient — desktop only. The compass
            breathes through on the right while copy stays readable. */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
          style={{ background: OVERLAY_GRADIENT }}
          aria-hidden="true"
        />

        <BlueprintGrid className="z-[2]" />

        <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center px-6 py-section-mobile text-center md:items-start md:px-8 md:text-left lg:py-section-desktop">
          {/* Left column — 52% on desktop; the right 48% lets the video bleed through */}
          <div className="flex w-full flex-col items-center md:w-[52%] md:items-start">
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
      </div>
    </section>
  );
}
