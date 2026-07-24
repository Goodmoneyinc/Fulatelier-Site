"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/blueprint/Eyebrow";
import { GlassPanel } from "@/components/blueprint/GlassPanel";
import { Reveal } from "@/components/blueprint/Reveal";
import { SectionHeading } from "@/components/blueprint/SectionHeading";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdaqegnk";

const FIELD_CLASS =
  "w-full appearance-none border bg-background px-4 py-3.5 font-inter text-[15px] text-text outline-none transition-[border-color,background-color] duration-150 ease-out placeholder:text-subtle focus:border-accent/80 focus:bg-[#0D1E35]";

const LABEL_CLASS =
  "mb-2 block font-inter text-[11px] font-semibold uppercase tracking-[0.15em] text-subtle";

type FormErrors = Partial<
  Record<
    | "businessName"
    | "ownerName"
    | "phone"
    | "email"
    | "industry"
    | "goal"
    | "challenge",
    string
  >
>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="mt-1.5 font-inter text-[11px] text-[#E57373]"
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  );
}

function TextField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  error,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
        {!required ? <span className="ml-1 normal-case text-subtle/50">(optional)</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-required={required ? true : undefined}
        aria-invalid={error ? true : undefined}
        value={value}
        onChange={onChange}
        className={[
          FIELD_CLASS,
          error ? "border-accent" : "border-accent/35",
        ].join(" ")}
      />
      {hint ? <p className="mt-1.5 font-inter text-[11px] text-subtle/70">{hint}</p> : null}
      <FieldError message={error} />
    </div>
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
        {!required ? <span className="ml-1 normal-case text-subtle/50">(optional)</span> : null}
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
            "appearance-none pr-10",
            error ? "border-accent" : "border-accent/35",
          ].join(" ")}
        >
          {children}
        </select>
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-accent"
          aria-hidden="true"
        >
          ▾
        </span>
      </div>
      <FieldError message={error} />
    </div>
  );
}

function TextAreaField({
  id,
  name,
  label,
  placeholder,
  required,
  value,
  onChange,
  error,
  maxLength = 500,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        aria-required={required ? true : undefined}
        aria-invalid={error ? true : undefined}
        value={value}
        onChange={onChange}
        className={[
          FIELD_CLASS,
          "resize-y",
          error ? "border-accent" : "border-accent/35",
        ].join(" ")}
      />
      <p className="mt-1.5 text-right font-inter text-[11px] text-subtle/60">
        {value.length} / {maxLength}
      </p>
      <FieldError message={error} />
    </div>
  );
}

function SuccessPanel() {
  return (
    <div role="status" aria-live="polite" className="py-6 text-center">
      <svg
        width="36"
        height="36"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto text-accent"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M9 16.5L14 21L23 10.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="mt-6 font-cormorant text-[30px] font-semibold tracking-[-0.01em] text-text">
        Application Received.
      </h3>
      <p className="mx-auto mt-4 max-w-md font-inter text-[15px] leading-[1.75] text-subtle">
        We review every application personally. If your business is a fit for
        this month&apos;s five Blueprint spots, Gerald will reach out within
        24 hours to schedule your design walkthrough.
      </p>
      <p className="mt-6 font-mono text-xs text-accent">
        Remember — you never pay until you see and approve the design.
      </p>
    </div>
  );
}

export function ApplicationForm() {
  const reduceMotion = Boolean(useReducedMotion());

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [industry, setIndustry] = useState("");
  const [goal, setGoal] = useState("");
  const [challenge, setChallenge] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!businessName.trim()) next.businessName = "Business name is required.";
    if (!ownerName.trim()) next.ownerName = "Owner name is required.";

    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (digits.length !== 10) {
      next.phone = "Enter a 10-digit phone number.";
    }

    if (!email.trim()) {
      next.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!industry) next.industry = "Please select an industry.";

    if (!goal.trim()) {
      next.goal = "Tell us your biggest business goal.";
    }

    if (!challenge.trim()) {
      next.challenge = "Tell us your biggest website challenge.";
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

  return (
    <section
      id="apply"
      className="relative w-full border-t border-accent/30 bg-background py-24 md:py-32"
      aria-labelledby="apply-heading"
    >
      <div className="mx-auto max-w-[840px] px-6 sm:px-8">
        <SectionHeading
          eyebrow="FUL://APPLY"
          id="apply-heading"
          title="Apply for the Blueprint."
          description="Two minutes to complete. We personally review every application — no bots, no auto-replies deciding your fit."
        />

        <Reveal delay={0.2} className="mt-14">
          <GlassPanel className="p-6 sm:p-10 md:p-12">
            {success ? (
              <SuccessPanel />
            ) : (
              <form
                aria-label="Digital Storefront Blueprint application"
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-7"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New Blueprint Application — Fulatelier"
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <TextField
                    id="apply-business-name"
                    name="businessName"
                    label="Business Name"
                    placeholder="Your business name"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    error={errors.businessName}
                  />
                  <TextField
                    id="apply-owner-name"
                    name="ownerName"
                    label="Owner Name"
                    placeholder="Your full name"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    error={errors.ownerName}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <TextField
                    id="apply-phone"
                    name="phone"
                    type="tel"
                    label="Phone"
                    placeholder="(601) 000-0000"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone}
                  />
                  <TextField
                    id="apply-email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@business.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <TextField
                    id="apply-website"
                    name="website"
                    type="url"
                    label="Business Website"
                    placeholder="If you have one"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    hint="No website yet? That's exactly who this is for."
                  />
                  <TextField
                    id="apply-facebook"
                    name="facebook"
                    type="text"
                    label="Facebook Page"
                    placeholder="facebook.com/yourbusiness"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <SelectField
                    id="apply-industry"
                    name="industry"
                    label="Industry"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    error={errors.industry}
                  >
                    <option value="" disabled>
                      Select your industry...
                    </option>
                    <option value="Restaurant / Food & Beverage">Restaurant / Food &amp; Beverage</option>
                    <option value="Retail / E-Commerce">Retail / E-Commerce</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Health & Wellness">Health &amp; Wellness</option>
                    <option value="Home Services / Trades">Home Services / Trades</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Nonprofit">Nonprofit</option>
                    <option value="Other">Other</option>
                  </SelectField>

                  <SelectField
                    id="apply-launch"
                    name="launchDate"
                    label="Desired Launch Date"
                    value={launchDate}
                    onChange={(e) => setLaunchDate(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a timeframe...
                    </option>
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="Within 30 days">Within 30 days</option>
                    <option value="1–3 months">1–3 months</option>
                    <option value="Just exploring for now">Just exploring for now</option>
                  </SelectField>
                </div>

                <TextAreaField
                  id="apply-goal"
                  name="goal"
                  label="Biggest Business Goal"
                  placeholder="What are you trying to achieve in the next 6–12 months?"
                  required
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  error={errors.goal}
                />

                <TextAreaField
                  id="apply-challenge"
                  name="challenge"
                  label="Biggest Website Challenge"
                  placeholder="What's not working about your current site — or the fact that you don't have one?"
                  required
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  error={errors.challenge}
                />

                <motion.div
                  initial={reduceMotion ? undefined : { opacity: 0.9 }}
                  whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                  className="mt-3"
                >
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full"
                    aria-label="Apply for the Blueprint"
                  >
                    {submitting ? "Submitting..." : "Apply for the Blueprint"}
                  </Button>
                </motion.div>

                <p className="text-center font-inter text-[12px] leading-relaxed text-subtle/70">
                  Protected by the Fulatelier Zero-Risk Guarantee™ — you review
                  the design before any payment is discussed.
                </p>

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
            )}
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
