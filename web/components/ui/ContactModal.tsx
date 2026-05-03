"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/components/blocks/sectionUtils";

type FormState =
  | { _tag: "idle" }
  | { _tag: "submitting" }
  | { _tag: "success" }
  | { _tag: "error"; message: string };

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  subject?: string;
};

export function ContactModal({
  isOpen,
  onClose,
  title = "Stel je vraag",
  description = "Staat jouw vraag er niet bij? Wij beantwoorden hem zo snel mogelijk.",
  subject,
}: ContactModalProps) {
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState<FormState>({ _tag: "idle" });
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Two-step animation: mount first, then trigger transition
  useEffect(() => {
    if (isOpen) {
      setVisible(false);
      const t = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(t);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Focus first field when open
  useEffect(() => {
    if (isOpen) setTimeout(() => firstFieldRef.current?.focus(), 100);
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState({ _tag: "submitting" });

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      subject,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setFormState({ _tag: "success" });
    } else {
      const json = await res.json();
      setFormState({
        _tag: "error",
        message: json.error ?? "Er is iets misgegaan.",
      });
    }
  }

  const isSubmitting = formState._tag === "submitting";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "bg-faect-navy/60 absolute inset-0 backdrop-blur-sm transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Modal card */}
      <div
        className={cn(
          "relative w-full max-w-lg rounded-2xl bg-white shadow-2xl transition-all duration-300",
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      >
        {/* Header */}
        <div className="border-faect-blue flex items-start justify-between border-t-4 px-6 pt-6 pb-4">
          <div>
            <h2 className="font-cairo text-faect-navy text-2xl font-bold">
              {title}
            </h2>
            {description && (
              <p className="text-faect-gray mt-1 text-sm leading-6">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="text-faect-gray hover:text-faect-navy ml-4 shrink-0 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          {formState._tag === "success" ? (
            <div className="py-8 text-center">
              <div className="bg-faect-blue/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <svg
                  className="text-faect-blue h-8 w-8"
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
              <h3 className="text-faect-navy mb-2 text-xl font-bold">
                Vraag ontvangen!
              </h3>
              <p className="text-faect-gray text-sm">
                We nemen zo snel mogelijk contact met je op.
              </p>
              <button
                onClick={onClose}
                className="border-faect-blue text-faect-blue hover:bg-faect-blue mt-6 inline-block rounded-lg border px-8 py-2 text-sm font-medium transition-colors hover:text-white"
              >
                Sluiten
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label
                  htmlFor="modal-name"
                  className="text-faect-navy mb-1 block text-sm font-medium"
                >
                  Naam <span className="text-red-400">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  id="modal-name"
                  name="name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  className="border-faect-blue/20 focus:border-faect-blue focus:ring-faect-blue/20 w-full rounded-lg border px-4 py-2 font-sans font-medium text-gray-700 transition-colors outline-none focus:ring-2 disabled:opacity-50"
                  placeholder="Jouw naam"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-email"
                  className="text-faect-navy mb-1 block text-sm font-medium"
                >
                  E-mail <span className="text-red-400">*</span>
                </label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  className="border-faect-blue/20 focus:border-faect-blue focus:ring-faect-blue/20 w-full rounded-lg border px-4 py-2 font-sans font-medium text-gray-700 transition-colors outline-none focus:ring-2 disabled:opacity-50"
                  placeholder="jouw@email.nl"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-message"
                  className="text-faect-navy mb-1 block text-sm font-medium"
                >
                  Jouw vraag <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  required
                  rows={4}
                  disabled={isSubmitting}
                  className="border-faect-blue/20 focus:border-faect-blue focus:ring-faect-blue/20 w-full rounded-lg border px-4 py-2 font-sans font-medium text-gray-700 transition-colors outline-none focus:ring-2 disabled:opacity-50"
                  placeholder="Stel hier jouw vraag..."
                />
              </div>

              {formState._tag === "error" && (
                <p className="text-sm text-red-500">{formState.message}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-faect-blue hover:bg-faect-navy w-full rounded-lg py-3 text-sm font-semibold text-white transition-colors duration-200 disabled:opacity-60"
              >
                {isSubmitting ? "Versturen..." : "Vraag versturen"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
