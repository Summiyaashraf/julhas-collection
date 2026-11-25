import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export function Checkbox({
  id,
  label,
  hint,
  error,
  className,
  containerClassName,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CheckboxProps) {
  const descriptionIds = [
    ariaDescribedBy,
    hint ? `${id}-hint` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      <div className="flex items-start gap-3">
        <input
          {...props}
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={descriptionIds || undefined}
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        />
        <label
          htmlFor={id}
          className="cursor-pointer text-sm leading-relaxed text-stone-700"
        >
          {label}
        </label>
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="pl-7 text-xs text-stone-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="pl-7 text-xs font-medium text-sale"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
