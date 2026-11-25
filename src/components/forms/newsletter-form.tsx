"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterStatus = "idle" | "submitting" | "success";

export interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<NewsletterStatus>("idle");

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = email.trim();

    if (!value) {
      setError("Enter your email address.");
      inputRef.current?.focus();
      return;
    }

    if (!EMAIL_PATTERN.test(value)) {
      setError("Enter a valid email address.");
      inputRef.current?.focus();
      return;
    }

    setError(undefined);
    setStatus("submitting");

    timeoutRef.current = setTimeout(() => {
      setStatus("success");
    }, 700);
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className={`flex items-start gap-3 border border-white/15 bg-white/5 p-5 ${className ?? ""}`}
      >
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
          <CheckIcon size={16} />
        </span>
        <div>
          <p className="font-display text-xl text-stone-50">
            You&apos;re on the list.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-stone-300">
            Thank you for joining our journey. This is a demo site, so no
            email was stored.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={className}
      aria-describedby={`${inputId}-consent`}
    >
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <Input
          ref={inputRef}
          id={inputId}
          label="Email address"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) {
              setError(undefined);
            }
          }}
          disabled={status === "submitting"}
          error={error}
          labelClassName="text-stone-300"
          hintClassName="text-stone-400"
          errorClassName="text-red-300"
          className="border-white/30 bg-white/5 text-stone-50 placeholder:text-stone-500 focus-visible:border-gold"
        />
        <Button
          type="submit"
          variant="gold"
          loading={status === "submitting"}
          className="sm:mt-[26px] sm:w-auto"
          fullWidth
        >
          {status === "submitting" ? "Joining" : "Subscribe"}
        </Button>
      </div>
      <p
        id={`${inputId}-consent`}
        className="mt-3 text-xs leading-relaxed text-stone-400"
      >
        By subscribing, you agree to receive occasional collection news from
        Julhas Collection. You can unsubscribe at any time. Demo only — no
        emails are stored.
      </p>
    </form>
  );
}
