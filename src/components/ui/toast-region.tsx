"use client";

import { createPortal } from "react-dom";

import type { ComponentType } from "react";

import {
  CheckIcon,
  CloseIcon,
  UndoIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

export const TOAST_VARIANTS = ["success", "error", "undo"] as const;

export type ToastVariant = (typeof TOAST_VARIANTS)[number];

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
  action?: ToastAction;
}

const VARIANT_ICONS: Record<
  ToastVariant,
  ComponentType<{ size?: number; className?: string }>
> = {
  success: CheckIcon,
  error: CloseIcon,
  undo: UndoIcon,
};

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  success: "text-success",
  error: "text-sale",
  undo: "text-gold",
};

export interface ToastRegionProps {
  toast: ToastItem | null;
  onDismiss: () => void;
  onPauseChange: (paused: boolean) => void;
}

export function ToastRegion({
  toast,
  onDismiss,
  onPauseChange,
}: ToastRegionProps) {
  if (typeof document === "undefined") {
    return null;
  }

  const Icon = toast ? VARIANT_ICONS[toast.variant] : null;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[95] flex justify-center sm:inset-x-auto sm:bottom-6 sm:right-6 sm:justify-end">
      <div
        aria-live="polite"
        aria-atomic="true"
        className="w-full max-w-sm"
      >
        {toast ? (
          <div
            role="status"
            onMouseEnter={() => onPauseChange(true)}
            onMouseLeave={() => onPauseChange(false)}
            onFocus={() => onPauseChange(true)}
            onBlur={() => onPauseChange(false)}
            className="pointer-events-auto flex items-start gap-3 border border-stone-300 bg-stone-50 p-4 shadow-menu"
          >
            {Icon ? (
              <span
                className={cn("mt-0.5 shrink-0", VARIANT_CLASSES[toast.variant])}
              >
                <Icon size={18} />
              </span>
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  {toast.description}
                </p>
              ) : null}
              {toast.action ? (
                <button
                  type="button"
                  onClick={() => {
                    onDismiss();
                    toast.action?.onClick();
                  }}
                  className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gold underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {toast.action.label}
                </button>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center text-stone-500 transition-colors hover:text-ink"
            >
              <CloseIcon size={16} />
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
