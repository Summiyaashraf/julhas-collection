import type { HTMLAttributes, ReactNode } from "react";

import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLDetailsElement>, "title"> {
  title: ReactNode;
  open?: boolean;
}

export function Accordion({
  title,
  className,
  open,
  children,
  ...props
}: AccordionProps) {
  return (
    <details
      {...props}
      open={open}
      className={cn("group border-b border-stone-300", className)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-medium text-ink transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDownIcon
          size={16}
          className="shrink-0 transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-stone-600">
        {children}
      </div>
    </details>
  );
}
