"use client";

import { useState, useCallback } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { formatDutchPhone } from "./sectionUtils";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface BlockContactSplitProps {
  heading?: string;
  intro?: string;
  address?: string;
  phone?: string;
  email?: string;
  linkedIn?: string;
  linkedInLabel?: string;
  submitButtonText?: string;
  successMessage?: string;
}

type FormState =
  | { _tag: "idle" }
  | { _tag: "submitting" }
  | { _tag: "success" }
  | { _tag: "error"; message: string };

// ── Inner form — consumes the reCAPTCHA context ───────────────────────────

function ContactForm({
  heading,
  intro,
  address,
  phone,
  email,
  linkedIn,
  linkedInLabel,
  submitButtonText,
  successMessage,
}: Required<BlockContactSplitProps>) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formState, setFormState] = useState<FormState>({ _tag: "idle" });

  const handleSubmit = useCallback(
    async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
      e.preventDefault();
      if (!executeRecaptcha) return;

      setFormState({ _tag: "submitting" });

      const recaptchaToken = await executeRecaptcha("contact_form");
      const data = Object.fromEntries(new FormData(e.currentTarget));

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, recaptchaToken }),
        });

        if (!res.ok) {
          const body = (await res.json()) as { error?: string };
          setFormState({
            _tag: "error",
            message: body.error ?? "Versturen mislukt. Probeer het opnieuw.",
          });
          return;
        }

        setFormState({ _tag: "success" });
      } catch {
        setFormState({
          _tag: "error",
          message: "Er is een fout opgetreden. Probeer het opnieuw.",
        });
      }
    },
    [executeRecaptcha],
  );

  return (
    <section className="section-dither py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-20">
          {/* ── Left: identity + contact details ── */}
          <div className="lg:col-span-2">
            <p className="hover:text-faect-blue relative mb-3 inline-block border-b-3 border-gray-400 pr-[20px] pb-1 text-center text-2xl font-medium text-gray-500 transition-all duration-200 lg:text-left">
              Contact
            </p>
            <h1 className="font-cairo text-faect-blue mb-5 text-4xl leading-tight font-bold md:text-[2.6rem]">
              {heading}
            </h1>
            {intro && (
              <p className="mb-10 text-xl/8 font-medium text-gray-600">
                {intro}
              </p>
            )}
            <ul className="space-y-6">
              {address && (
                <li className="flex items-start gap-4">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4"
                  >
                    <div className="bg-faect-blue/10 group-hover:bg-faect-blue mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors">
                      <MapPin className="text-faect-blue size-5 transition-colors group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-faect-navy text-xs font-semibold tracking-widest uppercase">
                        Adres
                      </p>
                      <div className="text-faect-blue group-hover:text-faect-navy text-[1.05rem]/6 font-medium transition-colors">
                        {address.split(",").map((part, i, arr) => (
                          <span key={i}>
                            {part.trim()}
                            {i < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </li>
              )}

              {phone && (
                <li className="flex items-start gap-4">
                  <a
                    href={`tel:${phone.replace(/[\s\-\.\(\)]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4"
                  >
                    <div className="bg-faect-blue/10 group-hover:bg-faect-blue mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors">
                      <Phone className="text-faect-blue size-5 transition-colors group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-faect-navy text-xs font-semibold tracking-widest uppercase">
                        Telefoon
                      </p>
                      <span className="text-faect-blue group-hover:text-faect-navy text-[1.05rem]/6 font-medium transition-colors">
                        {formatDutchPhone(phone)}
                      </span>
                    </div>
                  </a>
                </li>
              )}

              {email && (
                <li className="group flex items-start gap-4">
                  <a
                    href={`mailto:${email}, ?subject=${encodeURIComponent("Contact via faect.nl")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4"
                  >
                    <div className="bg-faect-blue/10 group-hover:bg-faect-blue trans mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                      <Mail className="text-faect-blue size-5 transition-colors group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-faect-navy text-xs font-semibold tracking-widest uppercase">
                        E-mail
                      </p>
                      <span className="text-faect-blue group-hover:text-faect-navy text-[1.05rem]/6 font-medium transition-colors">
                        {email}
                      </span>
                    </div>
                  </a>
                </li>
              )}

              {linkedIn && (
                <li className="flex items-start gap-4">
                  <a
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4"
                  >
                    <div className="bg-faect-blue/10 group-hover:bg-faect-blue mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors">
                      <LinkedInIcon className="text-faect-blue size-5 transition-colors group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-faect-navy text-xs font-semibold tracking-widest uppercase">
                        LinkedIn
                      </p>
                      <span className="text-faect-blue group-hover:text-faect-navy text-[1.05rem]/6 font-medium transition-colors">
                        {linkedInLabel}
                      </span>
                    </div>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* ── Right: form ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 md:p-10">
              {formState._tag === "success" ? (
                <div className="flex flex-col items-center py-14 text-center">
                  <CheckCircle2 className="text-faect-blue mb-5 size-14" />
                  <p className="text-faect-navy text-lg font-semibold">
                    {successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="font-ui mb-1.5 block text-[0.9rem] font-semibold text-gray-700"
                      >
                        Naam <span className="text-faect-blue">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="focus:border-faect-blue focus:ring-faect-blue/20 border-faect-blue/40 w-full rounded-lg border px-4 py-2 text-lg transition-all focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="font-ui mb-1.5 block text-[0.9rem] font-semibold text-gray-700"
                      >
                        Bedrijf
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="focus:border-faect-blue focus:ring-faect-blue/20 border-faect-blue/40 w-full rounded-lg border px-4 py-2 text-lg transition-all focus:ring-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="font-ui mb-1.5 block text-[0.9rem] font-semibold text-gray-700"
                      >
                        E-mail <span className="text-faect-blue">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="focus:border-faect-blue focus:ring-faect-blue/20 border-faect-blue/40 w-full rounded-lg border px-4 py-2 text-lg transition-all focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="formPhone"
                        className="font-ui mb-1.5 block text-[0.9rem] font-semibold text-gray-700"
                      >
                        Telefoon
                      </label>
                      <input
                        type="tel"
                        id="formPhone"
                        name="formPhone"
                        className="focus:border-faect-blue focus:ring-faect-blue/20 border-faect-blue/40 w-full rounded-lg border px-4 py-2 text-lg transition-all focus:ring-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="font-ui mb-1.5 block text-[0.9rem] font-semibold text-gray-700"
                    >
                      Onderwerp
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="focus:border-faect-blue focus:ring-faect-blue/20 border-faect-blue/40 w-full rounded-lg border px-4 py-2 text-lg transition-all focus:ring-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-ui mb-1.5 block text-[0.9rem] font-semibold text-gray-700"
                    >
                      Bericht <span className="text-faect-blue">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="focus:border-faect-blue focus:ring-faect-blue/20 border-faect-blue/40 ont-medium w-full resize-none rounded-lg border px-4 py-2 transition-all focus:ring-2 focus:outline-none"
                    />
                  </div>

                  {formState._tag === "error" && (
                    <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                      {formState.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={
                      formState._tag === "submitting" || !executeRecaptcha
                    }
                    className="bg-faect-blue hover:bg-faect-navy inline-flex w-full items-center justify-center gap-2.5 rounded-lg px-8 py-3 font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {formState._tag === "submitting" ? (
                      "Bezig met verzenden…"
                    ) : (
                      <>
                        {submitButtonText}
                        <Send className="size-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="mt-22 mb-12 overflow-hidden rounded-xl shadow-sm ring-1 ring-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2439.429769308914!2d5.137354512863269!3d52.30820357188962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c615bad6dde5a1%3A0xbdcccbf69c1db2bb!2sFaect!5e0!3m2!1sen!2snl!4v1778830823871!5m2!1sen!2snl"
            width="100%"
            height="420"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block border-0"
            title="Faect – Google Maps"
          />
        </div>
      </div>
    </section>
  );
}

// ── Public export — wraps with reCAPTCHA provider ─────────────────────────
export function BlockContactSplit({
  heading = "Hoe kunnen we je helpen?",
  intro,
  address = "Gooimeer 12, Naarden 1411 DE, Nederland",
  phone = "+31887077000",
  email = "info@faect.nl",
  linkedIn = "https://www.linkedin.com/company/faect/?viewAsMember=true",
  linkedInLabel = "Faect op LinkedIn",
  submitButtonText = "Verstuur bericht",
  successMessage = "Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.",
}: BlockContactSplitProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <ContactForm
        heading={heading}
        intro={intro ?? ""}
        address={address}
        phone={phone}
        email={email}
        linkedIn={linkedIn}
        linkedInLabel={linkedInLabel}
        submitButtonText={submitButtonText}
        successMessage={successMessage}
      />
    </GoogleReCaptchaProvider>
  );
}
