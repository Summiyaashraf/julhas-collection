"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@/components/ui/icons";
import { TRACK_ORDER_CONTENT } from "@/content/track-order";
import {
  validateEmail,
  validateOrderNumber,
  validatePhone,
} from "@/lib/validation/forms";
import { cn } from "@/lib/utils/cn";

type LookupStatus = "idle" | "loading" | "success";

interface LookupErrors {
  orderId?: string;
  contact?: string;
}

const CURRENT_STAGE_INDEX = 2;

function validateContact(value: string): string | undefined {
  const contact = value.trim();

  if (!contact) {
    return "Enter the email or phone number used at checkout.";
  }

  return contact.includes("@")
    ? validateEmail(contact).error
    : validatePhone(contact).error;
}

export function TrackOrderForm() {
  const { lookup, success, stages } = TRACK_ORDER_CONTENT;
  const [orderId, setOrderId] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<LookupErrors>({});
  const [status, setStatus] = useState<LookupStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoading = status === "loading";

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: LookupErrors = {
      orderId: validateOrderNumber(orderId).error,
      contact: validateContact(contact),
    };

    setErrors(nextErrors);

    if (nextErrors.orderId || nextErrors.contact) {
      return;
    }

    setStatus("loading");
    timerRef.current = setTimeout(() => {
      setStatus("success");
      timerRef.current = null;
    }, 1200);
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setOrderId("");
    setContact("");
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    const normalizedOrderId = orderId
      .trim()
      .replace(/^#/, "")
      .toUpperCase();

    return (
      <div className="border border-sand bg-cream p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-sand/70 pb-6">
          <div>
            <p className="eyebrow text-gold">{success.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal md:text-4xl">
              Order #{normalizedOrderId}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {success.description}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-stone-100 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-gold">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold"
            />
            {success.statusLabel}
          </span>
        </div>

        <div className="mt-6 border-b border-sand/70 pb-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500">
            Current Status
          </p>
          <p className="mt-2 font-display text-2xl text-charcoal">
            {stages[CURRENT_STAGE_INDEX].title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-stone-500">
            {success.estimate}
          </p>
        </div>

        <ol className="mt-8" aria-label="Order status timeline">
          {stages.map((stage, index) => {
            const isComplete = index < CURRENT_STAGE_INDEX;
            const isCurrent = index === CURRENT_STAGE_INDEX;

            return (
              <li
                key={stage.title}
                aria-current={isCurrent ? "step" : undefined}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {index < stages.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-4 top-8 w-px bg-sand"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                    isComplete && "border-gold bg-gold text-charcoal",
                    isCurrent && "border-gold bg-cream text-gold",
                    !isComplete &&
                      !isCurrent &&
                      "border-sand bg-cream text-stone-400",
                  )}
                >
                  {isComplete ? (
                    <CheckIcon size={14} />
                  ) : (
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isCurrent ? "bg-gold" : "bg-stone-300",
                      )}
                    />
                  )}
                </span>
                <div className="pt-0.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isComplete || isCurrent
                          ? "text-charcoal"
                          : "text-stone-500",
                      )}
                    >
                      {stage.title}
                    </p>
                    {isCurrent ? (
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold">
                        Current
                      </span>
                    ) : isComplete ? (
                      <span className="text-[10px] uppercase tracking-[0.14em] text-stone-500">
                        Completed
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-[0.14em] text-stone-400">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-stone-600">
                    {stage.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 border-t border-sand/70 pt-4 text-xs leading-relaxed text-stone-500">
          {lookup.note}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" onClick={handleReset}>
            {lookup.resetLabel}
          </Button>
          <Link
            href="/contact"
            className="text-xs font-medium uppercase tracking-[0.14em] text-stone-600 underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-sand bg-cream p-6 md:p-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow text-gold">{lookup.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal md:text-4xl">
            {lookup.title}
          </h2>
        </div>
        <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-stone-100 text-gold sm:flex">
          <TruckIcon size={20} />
        </span>
      </div>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
        {lookup.description}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <Input
          id="track-order-id"
          label="Order ID"
          autoComplete="off"
          placeholder="#JC-1042"
          hint="You will find this in your order confirmation."
          value={orderId}
          onChange={(event) => {
            setOrderId(event.target.value);
            setErrors((current) => ({ ...current, orderId: undefined }));
          }}
          error={errors.orderId}
          disabled={isLoading}
        />
        <Input
          id="track-order-contact"
          label="Email or Phone Number"
          autoComplete="off"
          placeholder="you@example.com or +92 300 0000000"
          value={contact}
          onChange={(event) => {
            setContact(event.target.value);
            setErrors((current) => ({ ...current, contact: undefined }));
          }}
          error={errors.contact}
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={isLoading}
          className="mt-2"
        >
          {isLoading ? lookup.loadingLabel : lookup.submitLabel}
        </Button>
      </form>

      <div className="mt-6 flex items-start gap-3 border-t border-sand/70 pt-4">
        <span className="mt-0.5 text-gold">
          <ShieldCheckIcon size={14} />
        </span>
        <p className="text-xs leading-relaxed text-stone-500">
          {lookup.note}
        </p>
      </div>
    </div>
  );
}
