"use client";

import { useState } from "react";

interface BlockContactFormProps {
  heading?: string;
  subheading?: string;
  formType?: "contact" | "demo" | "support" | "newsletter";
  submitButtonText?: string;
  successMessage?: string;
  recipientEmail?: string;
}

export function BlockContactForm({
  heading,
  subheading,
  formType = "contact",
  submitButtonText = "Verzenden",
  successMessage = "Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.",
}: BlockContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || data.error) {
        setError(data.error || "Er is iets misgegaan. Probeer het opnieuw.");
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError("Verbinding mislukt. Controleer uw internetverbinding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="block-background-overlay bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg text-gray-600">{successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="block-background-overlay bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl">
          {(heading || subheading) && (
            <div className="mb-8 text-center">
              {heading && (
                <h2 className="text-faect-navy mb-4 text-3xl font-bold">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="text-lg text-gray-600">{subheading}</p>
              )}
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Naam *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="focus:ring-faect-blue w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="focus:ring-faect-blue w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2"
                />
              </div>
            </div>

            {formType !== "newsletter" && (
              <>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Onderwerp
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="focus:ring-faect-blue w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="focus:ring-faect-blue w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-faect-blue w-full rounded-lg px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Bezig met verzenden..." : submitButtonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
