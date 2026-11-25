"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";

import type { ReactNode, RefObject } from "react";

import { useDialog } from "@/components/ui/use-dialog";
import { cn } from "@/lib/utils/cn";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  id?: string;
  side?: "left" | "right";
  widthClassName?: string;
  panelClassName?: string;
  overlayClassName?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function Drawer({
  open,
  onClose,
  labelledBy,
  children,
  id,
  side = "left",
  widthClassName = "w-full max-w-sm",
  panelClassName,
  overlayClassName,
  initialFocusRef,
  returnFocusRef,
}: DrawerProps) {
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
    <div className={cn("fixed inset-0 z-[80]", overlayClassName)}>
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
          "absolute inset-y-0 z-10 flex flex-col bg-stone-100 shadow-drawer outline-none",
          side === "left"
            ? "left-0 animate-slide-in-left"
            : "right-0 animate-slide-in-right",
          widthClassName,
          panelClassName,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
