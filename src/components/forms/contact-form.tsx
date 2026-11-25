"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast-provider";
import { WhatsAppIcon } from "@/components/ui/icons";
import { CONTACT_CONTENT } from "@/content/contact";
import {
  validateEmail,
  validateName,
  validatePhone,
} from "@/lib/validation/forms";
import { siteConfig } from "@/lib/constants/site";
import { buttonStyles } from "@/components/ui/button-styles";

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 1000;

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function validateMessage(value: string): string | null {
  const message = value.trim();

  if (!message) {
    return "Enter your message.";
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return `Enter a message of at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return `Keep your message under ${MAX_MESSAGE_LENGTH} characters.`;
  }

  return null;
}

export function ContactForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameError = validateName(form.name).error;
    const emailError = validateEmail(form.email).error;
    const phoneError = form.phone.trim()
      ? validatePhone(form.phone).error
      : undefined;
    const messageError = validateMessage(form.message);

    const nextErrors = {
      name: nameError,
      email: emailError,
      phone: phoneError,
      message: messageError ?? undefined,
    };

    setErrors(nextErrors);

    if (nameError || emailError || phoneError || messageError) {
      showToast({
        title: "Please check the highlighted fields",
        variant: "error",
      });
      return;
    }

    setSubmitted(true);
    showToast({
      title: "Message ready",
      description:
        "This demo form does not send to a live inbox yet.",
      variant: "success",
    });
  };

  if (submitted) {
    return (
      <div className="border border-stone-300 bg-stone-50 p-6 md:p-8">
        <h3 className="font-display text-2xl text-ink">
          Thanks, {form.name.trim().split(/\s+/)[0]}.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Your message passed validation, but this form is a demo
          in the current build and does not submit to a live inbox.
          For a real response, reach us on WhatsApp — we usually
          reply the same working day.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles({ variant: "gold" })}
          >
            <WhatsAppIcon size={16} />
            Message Us on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY_FORM);
              setSubmitted(false);
            }}
            className={buttonStyles({ variant: "secondary" })}
          >
            Write Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input
        id="contact-name"
        label="Your name"
        autoComplete="name"
        value={form.name}
        onChange={(event) => setField("name", event.target.value)}
        error={errors.name}
        containerClassName="sm:col-span-2"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="contact-email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(event) => setField("email", event.target.value)}
          error={errors.email}
        />
        <Input
          id="contact-phone"
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          placeholder="+92 300 0000000"
          value={form.phone}
          onChange={(event) => setField("phone", event.target.value)}
          error={errors.phone}
        />
      </div>
      <Textarea
        id="contact-message"
        label="Your message"
        rows={6}
        placeholder="How can we help?"
        value={form.message}
        onChange={(event) => setField("message", event.target.value)}
        error={errors.message}
        hint={`${form.message.length}/${MAX_MESSAGE_LENGTH} characters`}
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xs text-xs leading-relaxed text-stone-500">
          {CONTACT_CONTENT.form.note}
        </p>
        <Button type="submit" size="lg">
          Send Message
        </Button>
      </div>
    </form>
  );
}
