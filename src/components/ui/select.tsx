import type { SelectHTMLAttributes } from "react";

import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export function Select({
  id,
  label,
  hint,
  error,
  className,
  containerClassName,
  "aria-describedby": ariaDescribedBy,
  children,
  ...props
}: SelectProps) {
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
        className="block text-[11px] font-medium uppercase tracking-[0.14em] text-stone-600"
      >
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={descriptionIds || undefined}
          className={cn(
            "min-h-12 w-full appearance-none rounded-control border border-stone-300 bg-stone-50 px-4 pr-10 text-sm text-ink outline-none transition-colors focus-visible:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500",
            error && "border-sale focus-visible:border-sale focus-visible:outline-sale",
            className,
          )}
        >
          {children}
        </select>
        <ChevronDownIcon
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
        />
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-stone-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-sale"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
