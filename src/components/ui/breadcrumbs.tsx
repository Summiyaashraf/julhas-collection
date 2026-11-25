import Link from "next/link";

import { ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-stone-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(isLast && "text-ink")}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRightIcon
                  size={12}
                  className="text-stone-400"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
