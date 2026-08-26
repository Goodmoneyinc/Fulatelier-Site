"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdaqegnk";

type Answer = "yes" | "no";

type Question = {
  question: string;
  failMessage: string;
};

const QUESTIONS: Question[] = [
  {
    question: "Does your website load in under 3 seconds on a phone?",
    failMessage:
      "Over 3 seconds and most mobile visitors bounce before the page even finishes loading.",
  },
  {
    question: "Is your phone number visible without scrolling on mobile?",
    failMessage:
      "Customers ready to call right now can't find the number — they leave and call a competitor instead.",
  },
  {
    question: "Does your business appear when you Google your own name?",
    failMessage:
      "If you can't find your own business by name, new customers searching for you won't either.",
  },
  {
    question: "Have you updated your website in the last 12 months?",
    failMessage:
      "An untouched site quietly tells visitors you might not still be in business.",
  },
  {
    question:
      "Is there a clear contact or quote button visible immediately?",
    failMessage:
      "Visitors who don't know what to do next just leave — the next step has to be obvious, not buried.",
  },
  {
    question: "Does your site have https:// (the padlock icon)?",
    failMessage:
      "Browsers flag sites without HTTPS as “Not Secure” — that warning alone drives visitors away.",
  },
  {
    question: "Can customers book or contact you directly from the site?",
    failMessage:
      "Every extra step between interest and contact loses another customer.",
  },
  {
    question: "Do you have real photos of your actual business or work?",
    failMessage:
      "Stock photos read as generic — customers trust businesses that show their real work.",
  },
  {
    question:
      "Is your Google Business Profile up to date with correct hours?",
    failMessage:
      "Wrong hours send customers to your door when you're closed — and they don't come back.",
  },
  {
    question:
      "Does your site work properly on an iPhone without zooming?",
    failMessage:
      "A site that needs zooming to read gets abandoned in seconds on the phone most customers use.",
  },
];

type Tier = {
  label: string;
  description: string;
  colorClass: string;
  borderClass: string;
};

function getTier(score: number): Tier {
  if (score >= 8) {
    return {
      label: "Strong Foundation",
      description:
        "Your website is doing its job. A few refinements could push it further.",
      colorClass: "text-accent-light",
      borderClass: "border-accent-light/60",
    };
  }
  if (score >= 5) {
    return {
      label: "Gaps Costing You Customers",
      description:
        "Real gaps are quietly costing you leads every week — worth fixing soon.",
      colorClass: "text-text",
      borderClass: "border-accent/40",
    };
  }
  return {
    label: "Urgent — Action Needed",
    description:
      "Your website is actively working against you right now.",
    colorClass: "text-[#E57373]",
    borderClass: "border-[#E57373]/60",
  };
}

function PassIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-accent-light"
    >
      <path
        d="M3 8.5L6.2 12L13 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function FailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-[#E57373]"
    >
      <path
        d="M3 3L13 13M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

function QuizPanel({
  answers,
  currentIndex,
  onAnswer,
  reduceMotion,
}: {
  answers: Answer[];
  currentIndex: number;
  onAnswer: (answer: Answer) => void;
  reduceMotion: boolean;
}) {
  const question = QUESTIONS[currentIndex];
  const progress = (currentIndex / QUESTIONS.length) * 100;

  return (
    <motion.div
      key={currentIndex}
      className="border border-accent/35 bg-card p-8 md:p-12"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.4, ease: EASE }}
    >
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-subtle">
          {answers.length} answered
        </p>
      </div>

      <div className="mb-10 h-px w-full bg-accent/20" aria-hidden="true">
        <motion.div
          className="h-px bg-accent"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
        />
      </div>

      <h2 className="mb-10 font-inter text-xl font-semibold leading-snug text-text md:text-2xl">
        {question.question}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          data-cursor-hover
          onClick={() => onAnswer("yes")}
          className="border border-accent/40 bg-transparent py-5 font-inter text-sm font-semibold uppercase tracking-[0.15em] text-text transition-colors duration-150 ease-out hover:border-accent hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Yes
        </button>
        <button
          type="button"
          data-cursor-hover
          onClick={() => onAnswer("no")}
          className="border border-accent/40 bg-transparent py-5 font-inter text-sm font-semibold uppercase tracking-[0.15em] text-text transition-colors duration-150 ease-out hover:border-accent hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          No
        </button>
      </div>
    </motion.div>
  );
}

function EmailGate({ score, answers }: { score: number; answers: Answer[] }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(false);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email address is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(undefined);
    setSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Website Score Card lead — Fulatelier",
          email: trimmed,
          score: `${score} / ${QUESTIONS.length}`,
          answers: QUESTIONS.map((q, i) => `${q.question} — ${answers[i]}`),
        }),
      });

      if (!response.ok) {
        setSubmitError(true);
        return;
      }
      setSuccess(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-accent-light/50 bg-card p-8 text-center md:p-10"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="mx-auto text-accent-light"
        >
          <path
            d="M6 17L13 24L26 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
        <h3 className="mt-5 font-cormorant text-[26px] font-semibold tracking-[-0.01em] text-text">
          Your Action Plan Is On Its Way.
        </h3>
        <p className="mx-auto mt-3 max-w-md font-inter text-sm leading-relaxed text-subtle">
          Check {email} for your personalized breakdown. In the meantime, see
          how Fulatelier fixes exactly what your score revealed.
        </p>
        <div className="mt-7">
          <Button href="/blueprint" variant="solid">
            View The Digital Storefront Blueprint →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-accent/35 bg-card p-8 md:p-10">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70">
        FUL://ACTION-PLAN
      </p>
      <h3 className="mb-2 font-cormorant text-2xl font-semibold text-text">
        Get your full personalized action plan
      </h3>
      <p className="mb-6 font-inter text-sm leading-relaxed text-subtle">
        Enter your email to get your full personalized action plan — what to
        fix first, and what it&apos;s likely costing you.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor="scorecard-email" className="sr-only">
            Email address
          </label>
          <input
            id="scorecard-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            aria-required="true"
            aria-invalid={error ? true : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={[
              "w-full appearance-none border bg-background px-4 py-3.5 font-inter text-[15px] text-text outline-none transition-[border-color,background-color] duration-150 ease-out placeholder:text-subtle focus:border-accent/80 focus:bg-[#0D1E35]",
              error ? "border-accent" : "border-accent/35",
            ].join(" ")}
          />
          {error ? (
            <p
              className="mt-1.5 font-inter text-[11px] text-[#E57373]"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={submitting}
          data-cursor-hover
          className={[
            "shrink-0 border border-accent bg-accent px-6 py-3.5 font-inter text-xs font-semibold uppercase tracking-[0.15em] text-background transition-[opacity,background-color] duration-150 ease-out hover:bg-gold-light hover:border-gold-light",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-card",
            submitting ? "cursor-not-allowed pointer-events-none opacity-70" : "",
          ].join(" ")}
        >
          {submitting ? "Sending..." : "Get My Action Plan"}
        </button>
      </form>

      {submitError ? (
        <p className="mt-4 font-inter text-[13px] text-[#E57373]" role="alert" aria-live="polite">
          Something went wrong. Please email hello@fulatelier.com directly.
        </p>
      ) : null}
    </div>
  );
}

function ResultsPanel({
  answers,
  reduceMotion,
  onRetake,
}: {
  answers: Answer[];
  reduceMotion: boolean;
  onRetake: () => void;
}) {
  const score = answers.filter((a) => a === "yes").length;
  const tier = getTier(score);

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.4, ease: EASE }}
    >
      <div
        className={[
          "border bg-card p-8 text-center md:p-12",
          tier.borderClass,
        ].join(" ")}
      >
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70">
          Your Score
        </p>
        <p className="font-cormorant text-[72px] font-bold leading-none text-text md:text-[96px]">
          {score}
          <span className="text-subtle">/{QUESTIONS.length}</span>
        </p>
        <p
          className={[
            "mt-4 font-cormorant text-2xl font-semibold md:text-[28px]",
            tier.colorClass,
          ].join(" ")}
        >
          {tier.label}
        </p>
        <p className="mx-auto mt-3 max-w-md font-inter text-sm leading-relaxed text-subtle">
          {tier.description}
        </p>
      </div>

      <div className="mt-8 border border-accent/25 bg-card">
        <p className="border-b border-accent/25 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70 md:px-8">
          Full Breakdown
        </p>
        <ul className="divide-y divide-accent/15">
          {QUESTIONS.map((q, i) => {
            const passed = answers[i] === "yes";
            return (
              <li key={q.question} className="px-6 py-5 md:px-8">
                <div className="flex items-start gap-3">
                  {passed ? <PassIcon /> : <FailIcon />}
                  <div className="flex-1">
                    <p className="font-inter text-sm text-text">{q.question}</p>
                    {!passed ? (
                      <p className="mt-2 border-l-2 border-[#E57373]/50 pl-3 font-inter text-[13px] leading-relaxed text-subtle">
                        {q.failMessage}
                      </p>
                    ) : null}
                  </div>
                  <span
                    className={[
                      "shrink-0 font-mono text-[9px] uppercase tracking-[0.15em]",
                      passed ? "text-accent-light" : "text-[#E57373]",
                    ].join(" ")}
                  >
                    {passed ? "Pass" : "Fail"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8">
        <EmailGate score={score} answers={answers} />
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          data-cursor-hover
          onClick={onRetake}
          className="font-inter text-xs uppercase tracking-[0.15em] text-subtle underline decoration-subtle/40 underline-offset-4 transition-colors duration-150 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Retake the Score Card
        </button>
      </div>
    </motion.div>
  );
}

/**
 * Fulatelier Website Score Card — 10-question yes/no diagnostic with
 * instant scoring, a full pass/fail breakdown, and an email-gated
 * personalized action plan.
 */
export function WebsiteScoreCard() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const complete = answers.length === QUESTIONS.length;

  function handleAnswer(answer: Answer) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = answer;
      return next;
    });
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleRetake() {
    setAnswers([]);
    setCurrentIndex(0);
  }

  return (
    <section className="w-full bg-background py-section-mobile md:py-section-desktop">
      <div className="mx-auto max-w-[720px] px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70">
            FUL://SCORECARD
          </p>
          <h1 className="font-cormorant text-[40px] font-bold tracking-[-0.02em] text-text md:text-[56px]">
            Website Score Card
          </h1>
          <p className="mx-auto mt-4 max-w-md font-inter text-base leading-relaxed text-subtle">
            10 questions. Two minutes. Find out exactly what your website is
            costing you.
          </p>
        </div>

        {complete ? (
          <ResultsPanel
            answers={answers}
            reduceMotion={reduceMotion}
            onRetake={handleRetake}
          />
        ) : (
          <QuizPanel
            answers={answers}
            currentIndex={currentIndex}
            onAnswer={handleAnswer}
            reduceMotion={reduceMotion}
          />
        )}
      </div>
    </section>
  );
}
