"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/blueprint/Reveal";
import { SectionHeading } from "@/components/blueprint/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    question: "Why is it free?",
    answer:
      "Because a decision this size deserves proof, not a pitch. We'd rather show you exactly what we'd build for your business than ask you to imagine it from a proposal.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "We personally review your application. If your business is a fit for one of this month's five spots, we schedule a short call to understand your goals before any design work begins.",
  },
  {
    question: "Do I have to buy?",
    answer:
      "No. If the homepage design isn't right for your business, you walk away — no invoice, no pressure, and no hard feelings. That's the Fulatelier Zero-Risk Guarantee™.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most homepage concepts are ready to review within about a week of your discovery call. From there, a full build typically takes an additional 1–3 weeks.",
  },
  {
    question: "What businesses qualify?",
    answer:
      "We work best with established Mississippi businesses — restaurants, retail, professional services, and similar — that are ready to invest in how they're perceived online.",
  },
] as const;

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className="border border-accent/30 bg-card transition-colors duration-200 ease-out data-[open=true]:border-accent-light" data-open={isOpen}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-inter text-[16px] font-medium text-text transition-colors duration-200 ease-out hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-8 sm:py-6 sm:text-[17px]"
        >
          <span>{question}</span>
          <motion.span
            aria-hidden="true"
            className="shrink-0 text-accent-light"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 font-inter text-[15px] leading-[1.75] text-subtle sm:px-8 sm:pb-7">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="relative w-full border-t border-accent/30 bg-background py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[760px] px-6 sm:px-8">
        <SectionHeading eyebrow="FUL://FAQ" id="faq-heading" title="Frequently Asked." />

        <div className="mt-14 flex flex-col gap-4">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={0.05 * index}>
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
