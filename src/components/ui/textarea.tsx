import type { Ref, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  hintClassName?: string;
  errorClassName?: string;
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({
  id,
  label,
  hint,
  error,
  className,
  containerClassName,
  labelClassName,
  hintClassName,
  errorClassName,
  ref,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextareaProps) {
  const descriptionIds = [
    ariaDescribedBy,
    hint ? `${id}-hint` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <label
        htmlFor={id}
        className={cn(
          "block text-[11px] font-medium uppercase tracking-[0.14em] text-stone-600",
          labelClassName,
        )}
      >
        {label}
      </label>
      <textarea
        {...props}
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionIds || undefined}
        className={cn(
          "min-h-32 w-full resize-y rounded-control border border-stone-300 bg-stone-50 px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-stone-400 focus-visible:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500",
          error &&
            "border-sale focus-visible:border-sale focus-visible:outline-sale",
          className,
        )}
      />
      {hint ? (
        <p
          id={`${id}-hint`}
          className={cn("text-xs text-stone-500", hintClassName)}
        >
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn("text-xs font-medium text-sale", errorClassName)}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
