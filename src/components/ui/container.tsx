import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const ELEMENTS = {
  div: "div",
  section: "section",
  article: "article",
  aside: "aside",
  header: "header",
  footer: "footer",
  main: "main",
  nav: "nav",
} as const;

const SIZE_CLASSES = {
  page: "container-page",
  content: "container-content px-5 md:px-8 lg:px-12",
} as const;

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: keyof typeof ELEMENTS;
  size?: keyof typeof SIZE_CLASSES;
}

export function Container({
  as = "div",
  size = "page",
  className,
  ...props
}: ContainerProps) {
  const Component = ELEMENTS[as];

  return (
    <Component
      className={cn(SIZE_CLASSES[size], className)}
      {...props}
    />
  );
}
