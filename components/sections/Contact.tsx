"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BorderDraw } from "@/components/ui/BorderDraw";
import { social } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdaqegnk";

const FIELD_CLASS =
  "w-full appearance-none border bg-background px-4 py-3 font-inter text-sm text-text outline-none transition-[border-color,background-color] duration-150 ease-out placeholder:text-subtle focus:border-accent/80 focus:bg-[#0D1E35]";

const LABEL_CLASS =
  "mb-1.5 block font-inter text-[10px] uppercase tracking-[0.15em] text-accent";

type FormErrors = Partial<
  Record<
    "name" | "email" | "phone" | "service" | "budget" | "description",
    string
  >
>;

function SectionHeader({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="text-center">
      <motion.p
        className="mb-6 font-mono text-[10px] tracking-[0.2em] text-accent"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 0.65 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.25, ease: "easeOut" }}
      >
        FUL://CONTACT
      </motion.p>

      <div className="relative mx-auto inline-block w-full">
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
          id="contact-heading"
          className="mb-6 font-cormorant text-[64px] font-bold leading-[0.9] tracking-[-0.03em] text-text md:text-[120px]"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.3,
            delay: reduceMotion ? 0 : 0.15,
            ease: "easeOut",
          }}
        >
          Start Something.
        </motion.h2>
      </div>

      <motion.p
        className="mx-auto mb-14 max-w-[520px] font-inter text-lg leading-[1.7] text-subtle"
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
        Every project starts with a free 20-minute conversation — no pitch deck,
        no proposal until we both know it&apos;s the right fit.
      </motion.p>
    </div>
  );
}

function SpecRow({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  leftHref,
  leftAriaLabel,
}: {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
  leftHref?: string;
  leftAriaLabel?: string;
}) {
  const valueClass = "font-inter text-sm text-text";
  const goldLinkClass =
    "font-inter text-sm text-accent-light transition-colors duration-150 hover:text-gold-light hover:underline";

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
      <div>
        <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-accent/55">
          {leftLabel}
        </p>
        {leftHref ? (
          <a
            href={leftHref}
            aria-label={leftAriaLabel}
            className={goldLinkClass}
          >
            {leftValue}
          </a>
        ) : (
          <p className={valueClass}>{leftValue}</p>
        )}
      </div>
      <div>
        <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-accent/55">
          {rightLabel}
        </p>
        <p className={valueClass}>{rightValue}</p>
      </div>
    </div>
  );
}

function CommissionPanel({
  active,
  reduceMotion,
  children,
}: {
  active: boolean;
  reduceMotion: boolean;
  children: ReactNode;
}) {
  const [showBorder, setShowBorder] = useState(reduceMotion);
  const [reveal, setReveal] = useState(reduceMotion);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setShowBorder(true);
      setReveal(true);
      return;
    }
    const borderTimer = window.setTimeout(() => setShowBorder(true), 420);
    const revealTimer = window.setTimeout(() => setReveal(true), 280);
    return () => {
      window.clearTimeout(borderTimer);
      window.clearTimeout(revealTimer);
    };
  }, [active, reduceMotion]);

  return (
    <div
      className={[
        "relative mx-auto max-w-[600px] bg-footer p-8 md:p-12",
        showBorder ? "border border-accent/60" : "border border-transparent",
      ].join(" ")}
    >
      {!reduceMotion ? (
        <BorderDraw
          active={active}
          color="#A37E2C"
          duration={0.42}
          delay={0}
          ease="linear"
          fadeOutDuration={0.1}
        />
      ) : null}

      <motion.div
        className="relative z-[1]"
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { clipPath: "inset(0 0 100% 0)", opacity: 0.6 }
        }
        animate={
          reveal
            ? reduceMotion
              ? { opacity: 1 }
              : { clipPath: "inset(0 0 0% 0)", opacity: 1 }
            : reduceMotion
              ? { opacity: 0 }
              : { clipPath: "inset(0 0 100% 0)", opacity: 0.6 }
        }
        transition={
          reduceMotion
            ? { duration: 0.2, ease: "easeOut" }
            : { duration: 0.55, ease: EASE }
        }
      >
        <SpecRow
          leftLabel="STUDIO"
          leftValue="Fulatelier LLC"
          rightLabel="LOCATION"
          rightValue="Jackson, Mississippi"
        />

        <div className="my-6 h-px w-full bg-accent/40" aria-hidden="true" />

        <SpecRow
          leftLabel="EMAIL"
          leftValue="hello@fulatelier.com"
          leftHref="mailto:hello@fulatelier.com"
          leftAriaLabel="Email Fulatelier at hello@fulatelier.com"
          rightLabel="RESPONSE TIME"
          rightValue="Within 24 hours"
        />

        <div className="my-6 h-px w-full bg-accent/40" aria-hidden="true" />

        <p className="text-center font-inter text-[13px] leading-relaxed text-subtle">
          Fill out the brief below to get started — or email{" "}
          <a
            href="mailto:hello@fulatelier.com"
            className="text-accent-light transition-colors duration-150 hover:text-gold-light hover:underline"
          >
            hello@fulatelier.com
          </a>{" "}
          directly.
        </p>

        <div className="my-6 h-px w-full bg-accent/40" aria-hidden="true" />

        {children}
      </motion.div>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="mt-1.5 font-inter text-[11px] text-[#E57373] transition-opacity duration-200 ease-out"
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  );
}

function SelectField({
  id,
  name,
  label,
  required,
  value,
  onChange,
  error,
  children,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required ? true : undefined}
          aria-invalid={error ? true : undefined}
          className={[
            FIELD_CLASS,
            "pr-10",
            error ? "border-accent" : "border-accent/35",
          ].join(" ")}
        >
          {children}
        </select>
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-inter text-xs text-accent"
          aria-hidden="true"
        >
          ▾
        </span>
      </div>
      <FieldError message={error} />
    </div>
  );
}

function SuccessPanel() {
  return (
    <div role="status" aria-live="polite" className="py-4 text-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto text-accent"
        aria-hidden="true"
      >
        <path
          d="M6 17L13 24L26 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <h3 className="mt-6 font-cormorant text-[32px] font-semibold tracking-[-0.01em] text-text">
        Brief Received.
      </h3>
      <p className="mx-auto mt-4 max-w-md font-inter text-[15px] leading-[1.7] text-subtle">
        Gerald will review your project brief and be in touch within 24 hours to
        schedule your free consultation.
      </p>
      <p className="mt-6 font-mono text-xs text-accent">
        Check your email for a confirmation — hello@fulatelier.com
      </p>
    </div>
  );
}

function ProjectBriefForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!name.trim()) next.name = "Full name is required.";

    if (!email.trim()) {
      next.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (digits.length !== 10) {
      next.phone = "Enter a 10-digit phone number.";
    }

    if (!service) next.service = "Please select a service.";
    if (!budget) next.budget = "Please select a budget range.";

    if (!description.trim()) {
      next.description = "Project description is required.";
    } else if (description.trim().length < 20) {
      next.description =
        "Please describe your project in at least a few sentences.";
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(false);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const body = new FormData(event.currentTarget);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
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

  if (success) return <SuccessPanel />;

  return (
    <div>
      <p className="mb-5 font-mono text-[10px] tracking-[0.2em] text-accent opacity-65">
        FUL://PROJECT-BRIEF
      </p>
      <h3 className="mb-2 font-cormorant text-[28px] font-semibold tracking-[-0.01em] text-text">
        Submit Your Project Brief
      </h3>
      <p className="mb-8 font-inter text-sm leading-[1.6] text-subtle">
        Fill out the brief below — Gerald will be in touch within 24 hours to
        schedule your free consultation.
      </p>

      <form
        aria-label="Project intake form"
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5"
      >
        <input
          type="hidden"
          name="_subject"
          value="New Project Brief — Fulatelier"
        />

        <div>
          <label htmlFor="brief-name" className={LABEL_CLASS}>
            Full Name
          </label>
          <input
            id="brief-name"
            name="name"
            type="text"
            placeholder="Your full name"
            required
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={[
              FIELD_CLASS,
              errors.name ? "border-accent" : "border-accent/35",
            ].join(" ")}
          />
          <FieldError message={errors.name} />
        </div>

        <div>
          <label htmlFor="brief-email" className={LABEL_CLASS}>
            Email Address
          </label>
          <input
            id="brief-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={[
              FIELD_CLASS,
              errors.email ? "border-accent" : "border-accent/35",
            ].join(" ")}
          />
          <FieldError message={errors.email} />
        </div>

        <div>
          <label htmlFor="brief-phone" className={LABEL_CLASS}>
            Phone Number
          </label>
          <input
            id="brief-phone"
            name="phone"
            type="tel"
            placeholder="(601) 000-0000"
            required
            aria-required="true"
            aria-invalid={errors.phone ? true : undefined}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={[
              FIELD_CLASS,
              errors.phone ? "border-accent" : "border-accent/35",
            ].join(" ")}
          />
          <p className="mt-1 font-inter text-[11px] text-subtle">
            We&apos;ll use this to schedule your free consultation call.
          </p>
          <FieldError message={errors.phone} />
        </div>

        <SelectField
          id="brief-service"
          name="service"
          label="Service Needed"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          error={errors.service}
        >
          <option value="" disabled>
            Select a service...
          </option>
          <option value="Custom Website — $500 to $2,500">
            Custom Website — $500 to $2,500
          </option>
          <option value="SaaS / Web Application — Custom Scope">
            SaaS / Web Application — Custom Scope
          </option>
          <option value="Not sure yet — let's talk">
            Not sure yet — let&apos;s talk
          </option>
        </SelectField>

        <SelectField
          id="brief-budget"
          name="budget"
          label="Budget Range"
          required
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          error={errors.budget}
        >
          <option value="" disabled>
            Select your budget...
          </option>
          <option value="Under $500">Under $500</option>
          <option value="$500 — $800 (The Launchpad)">
            $500 — $800 (The Launchpad)
          </option>
          <option value="$900 — $1,500 (The Authority)">
            $900 — $1,500 (The Authority)
          </option>
          <option value="$1,600 — $2,500 (The Empire)">
            $1,600 — $2,500 (The Empire)
          </option>
          <option value="$2,500+ (SaaS / Custom Scope)">
            $2,500+ (SaaS / Custom Scope)
          </option>
          <option value="Not sure yet">Not sure yet</option>
        </SelectField>

        <div>
          <label htmlFor="brief-description" className={LABEL_CLASS}>
            Project Description
          </label>
          <textarea
            id="brief-description"
            name="description"
            rows={5}
            maxLength={1000}
            placeholder="Tell me about your business, what you need built, and what success looks like for this project..."
            required
            aria-required="true"
            aria-invalid={errors.description ? true : undefined}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={[
              FIELD_CLASS,
              "resize-y",
              errors.description ? "border-accent" : "border-accent/35",
            ].join(" ")}
          />
          <p className="mt-1 text-right font-inter text-[11px] text-subtle">
            {description.length} / 1000
          </p>
          <FieldError message={errors.description} />
        </div>

        <SelectField
          id="brief-timeline"
          name="timeline"
          label="Desired Timeline"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        >
          <option value="" disabled>
            Select timeline...
          </option>
          <option value="As soon as possible">As soon as possible</option>
          <option value="Within 2 weeks">Within 2 weeks</option>
          <option value="Within 1 month">Within 1 month</option>
          <option value="1-3 months">1-3 months</option>
          <option value="Flexible">Flexible</option>
        </SelectField>

        <button
          type="submit"
          disabled={submitting}
          className={[
            "mt-8 w-full border border-accent bg-transparent py-4 font-inter text-xs uppercase tracking-[0.15em] text-text transition-[background-color,color,opacity] duration-150 ease-out",
            "hover:bg-accent hover:text-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-footer",
            submitting
              ? "cursor-not-allowed pointer-events-none opacity-70"
              : "",
          ].join(" ")}
        >
          {submitting ? "SENDING..." : "SUBMIT PROJECT BRIEF →"}
        </button>

        {submitError ? (
          <p
            className="text-center font-inter text-[13px] text-[#E57373]"
            role="alert"
            aria-live="polite"
          >
            Something went wrong. Please email hello@fulatelier.com directly.
          </p>
        ) : null}
      </form>
    </div>
  );
}

/**
 * Contact — single commission panel with embedded project brief form.
 */
export function Contact() {
  const reduceMotionPref = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPref);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section
      ref={sectionRef}
      id="contact"
      role="region"
      aria-label="Contact"
      aria-labelledby="contact-heading"
      className="w-full border-t border-accent/30 bg-background py-section-mobile md:py-section-desktop"
    >
      <div className="relative mx-auto max-w-[720px] px-6 lg:px-8">
        <SectionHeader active={inView} reduceMotion={reduceMotion} />

        <CommissionPanel active={inView} reduceMotion={reduceMotion}>
          <ProjectBriefForm />
        </CommissionPanel>

        <div className="mt-8 text-center">
          <p className="mb-3 font-inter text-sm text-subtle">
            Prefer to talk it through first?
          </p>
          <ArrowLink
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send a message on Facebook (opens in new tab)"
          >
            Send a message on Facebook
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
