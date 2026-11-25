"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";

import type { ReactNode, RefObject } from "react";

import { useDialog } from "@/components/ui/use-dialog";
import { cn } from "@/lib/utils/cn";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  id?: string;
  align?: "center" | "top";
  panelClassName?: string;
  overlayClassName?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function Modal({
  open,
  onClose,
  labelledBy,
  children,
  id,
  align = "center",
  panelClassName,
  overlayClassName,
  initialFocusRef,
  returnFocusRef,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useDialog({
    open,
    onClose,
    panelRef,
    initialFocusRef,
    returnFocusRef,
  });

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[90] flex justify-center",
        align === "center" ? "items-center p-4" : "items-start",
        overlayClassName,
      )}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 h-full w-full animate-fade-in cursor-default bg-ink/50"
      />
      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full bg-stone-100 shadow-menu outline-none",
          align === "center"
            ? "max-h-[85dvh] max-w-lg overflow-y-auto"
            : "max-h-[100dvh] overflow-y-auto",
          panelClassName,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
