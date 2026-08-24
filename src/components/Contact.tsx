"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projectTypes, teamContacts, studioAddress } from "@/lib/data";
import PaperPlaneSuccess from "./ui/PaperPlaneSuccess";

type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof ContactFormPayload, string>>;

const NAME_RE = /^[A-Za-z\s.'-]{2,60}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts an optional leading "+" then 7-15 digits, ignoring spaces/dashes/parens as typed.
const PHONE_RE = /^\+?[0-9]{7,15}$/;

function validateContactForm(payload: ContactFormPayload): FieldErrors {
  const errors: FieldErrors = {};

  const name = payload.name.trim();
  if (!name) errors.name = "Please enter your name.";
  else if (!NAME_RE.test(name)) errors.name = "Name should only contain letters (2-60 characters).";

  const email = payload.email.trim();
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  const phoneDigits = payload.phone.trim().replace(/[\s\-()]/g, "");
  if (!phoneDigits) errors.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(phoneDigits)) errors.phone = "Enter a valid phone number (7-15 digits).";

  if (!payload.projectType.trim()) errors.projectType = "Please select a project type.";

  const message = payload.message.trim();
  if (!message) errors.message = "Please tell us a bit about your project.";
  else if (message.length < 10) errors.message = "Please add a few more details (min 10 characters).";
  else if (message.length > 3000) errors.message = "Message is too long (max 3000 characters).";

  return errors;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPlane, setShowPlane] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState<string | null>(null);

  const clearFieldError = (field: keyof ContactFormPayload) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: ContactFormPayload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      projectType: String(fd.get("projectType") || ""),
      message: String(fd.get("message") || ""),
    };

    const errors = validateContactForm(payload);
    if (Object.keys(errors).length > 0) {
      // Each invalid field already shows its own inline error message right
      // below it (see the Field component) — a second, generic summary
      // message squeezed in next to the submit button was wrapping oddly
      // and breaking the button's layout on narrow screens, so it's gone;
      // the per-field messages are sufficient on their own.
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setLoading(true);

    try {
      // Email + WhatsApp are both sent server-side here — no tab or window
      // opens on the visitor's end, this just waits for confirmation.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setLoading(false);
      setFieldErrors({});
      setWhatsappFallbackUrl(data.whatsappFallbackUrl || null);
      setShowPlane(true);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="relative bg-hc-bg py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bp-grid opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="font-serif-label italic text-hc-gold-light text-sm tracking-[0.25em] uppercase">
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-hc-ivory">
            Contact
          </h2>
          <p className="mt-4 text-hc-concrete leading-relaxed">
            Tell us about your interior, exterior, construction, or planning
            requirement.
          </p>
          <div className="divider-line w-24 mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 rounded-2xl border border-hc-gold/15 bg-hc-surface/40 p-8"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-hc-gold-light text-hc-gold-light text-2xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-semibold text-hc-ivory">
                    Thank you — we&apos;ve received your request.
                  </h3>
                  <p className="mt-2 text-sm text-hc-concrete max-w-sm">
                    A Heaven Craft consultant will reach out within one
                    business day to discuss your project.
                  </p>
                  {whatsappFallbackUrl && (
                    <a
                      href={whatsappFallbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-hc-gold/40 px-5 py-2.5 text-sm text-hc-gold-light transition-all duration-300 hover:border-hc-gold hover:bg-hc-gold/10"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.19 0 4.25.85 5.79 2.4a8.2 8.2 0 0 1 2.41 5.84c0 4.55-3.71 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.55 3.71-8.24 8.29-8.24Zm-4.5 4.53c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.7 2.71 4.24 3.69 2.1.82 2.53.66 2.98.62.45-.04 1.46-.6 1.66-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.46-.28-.24-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.56.12-.16.24-.64.8-.79.97-.14.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48Z" />
                      </svg>
                      Message us on WhatsApp
                    </a>
                  )}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-hc-gold-light underline underline-offset-4"
                    suppressHydrationWarning
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" required error={fieldErrors.name}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className={`hc-input ${fieldErrors.name ? "hc-input-error" : ""}`}
                        onChange={() => clearFieldError("name")}
                        aria-invalid={!!fieldErrors.name}
                        suppressHydrationWarning
                      />
                    </Field>
                    <Field label="Email" required error={fieldErrors.email}>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className={`hc-input ${fieldErrors.email ? "hc-input-error" : ""}`}
                        onChange={() => clearFieldError("email")}
                        aria-invalid={!!fieldErrors.email}
                        suppressHydrationWarning
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Phone" required error={fieldErrors.phone}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 00000 00000"
                        className={`hc-input ${fieldErrors.phone ? "hc-input-error" : ""}`}
                        onChange={() => clearFieldError("phone")}
                        aria-invalid={!!fieldErrors.phone}
                        suppressHydrationWarning
                      />
                    </Field>
                    <Field label="Project Type" required error={fieldErrors.projectType}>
                      <select
                        name="projectType"
                        defaultValue=""
                        className={`hc-input ${fieldErrors.projectType ? "hc-input-error" : ""}`}
                        onChange={() => clearFieldError("projectType")}
                        aria-invalid={!!fieldErrors.projectType}
                        suppressHydrationWarning
                      >
                        <option value="" disabled>
                          Select project type
                        </option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Message" required error={fieldErrors.message}>
                    <textarea
                      rows={5}
                      name="message"
                      placeholder="Tell us about your project — scope, timeline, location…"
                      className={`hc-input resize-none ${fieldErrors.message ? "hc-input-error" : ""}`}
                      onChange={() => clearFieldError("message")}
                      aria-invalid={!!fieldErrors.message}
                      suppressHydrationWarning
                    />
                  </Field>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-hc-gold-light to-hc-copper px-8 py-3.5 text-sm font-medium text-hc-bg transition-transform duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                      suppressHydrationWarning
                    >
                      {loading && (
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-hc-bg/30 border-t-hc-bg" />
                      )}
                      {loading ? "Sending…" : "Submit Enquiry"}
                    </button>
                    {errorMsg && (
                      <p className="text-xs text-hc-copper">{errorMsg}</p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-2xl border border-hc-gold/15 bg-hc-surface/40 p-6">
              <h4 className="text-sm uppercase tracking-[0.2em] text-hc-gold-light mb-4">
                Studio Details
              </h4>
              <div className="space-y-2 text-sm text-hc-ivory/85">
                <p>{studioAddress}</p>
                <p>heavencraftinfrastructures@gmail.com</p>
              </div>
              <a
                href="https://www.google.com/maps?cid=15412685536990962454"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Heaven Craft studio location in Google Maps"
                className="group relative mt-5 block h-44 overflow-hidden rounded-xl border border-hc-gold/25"
              >
                <iframe
                  title="Heaven Craft Studio location"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3887.146946595489!2d76.1037195!3d13.0263128!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5491d2f86a6d5%3A0xd5e4dbd60325a316!2sHEAVEN%20CRAFT%20INFRASTRUCTURE%20%26%20INTERIORS!5e0!3m2!1sen!2sin!4v1787493377746!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none h-full w-full border-0"
                  style={{ filter: "grayscale(1) invert(92%) contrast(83%)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-hc-bg/0 opacity-0 transition-all duration-300 group-hover:bg-hc-bg/50 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-hc-gold/40 bg-hc-bg/70 px-3.5 py-1.5 text-xs tracking-wide text-hc-gold-light backdrop-blur-sm">
                    Open in Maps
                    <span aria-hidden>↗</span>
                  </span>
                </div>
              </a>
            </div>

            <div className="luxury-glow-card rounded-2xl border border-hc-gold/15 bg-hc-surface/40 p-6 space-y-5">
              <h4 className="text-sm uppercase tracking-[0.2em] text-hc-gold-light">
                Speak With Our Team
              </h4>
              {teamContacts.map((c) => (
                <div key={c.name} className="flex items-start gap-3">
                  {c.image ? (
                    <div className="relative mt-0.5 h-12 w-12 shrink-0 overflow-hidden rounded-full border border-hc-gold/30">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hc-gold/10 text-hc-gold-light text-sm font-semibold">
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-hc-ivory">{c.name}</p>
                    <p className="text-xs text-hc-concrete">{c.role}</p>
                    <p className="text-xs text-hc-gold-light mt-0.5">
                      {c.phone}
                      {c.phone2 && (
                        <span className="text-hc-concrete"> · {c.phone2}</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <PaperPlaneSuccess show={showPlane} onComplete={() => setShowPlane(false)} />
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wide text-hc-concrete">
        {label}
        {required && <span className="text-hc-gold-light"> *</span>}
      </span>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 block text-xs text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
