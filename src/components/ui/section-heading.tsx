import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const HEADING_ELEMENTS = {
  2: "h2",
  3: "h3",
  4: "h4",
} as const;

export interface SectionHeadingProps {
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  level?: keyof typeof HEADING_ELEMENTS;
  align?: "left" | "center";
  action?: ReactNode;
  id?: string;
  className?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  level = 2,
  align = "left",
  action,
  id,
  className,
}: SectionHeadingProps) {
  const Heading = HEADING_ELEMENTS[level];
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        centered && "md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "text-center")}>
        {eyebrow ? (
          <p className="eyebrow text-gold">{eyebrow}</p>
        ) : null}
        <Heading
          id={id}
          className="mt-3 text-balance font-display text-3xl leading-tight text-ink md:text-4xl"
        >
          {title}
        </Heading>
        {description ? (
          <p
            className={cn(
              "mt-4 text-sm leading-relaxed text-stone-600 md:text-base",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className="shrink-0">{action}</div>
      ) : null}
    </div>
  );
}
