"use client";

import { useEffect } from "react";

import type { RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => element.getClientRects().length > 0);
}

export interface UseDialogOptions {
  open: boolean;
  onClose: () => void;
  panelRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function useDialog({
  open,
  onClose,
  panelRef,
  initialFocusRef,
  returnFocusRef,
}: UseDialogOptions) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const returnFocusElement =
      returnFocusRef?.current ?? previouslyFocused;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      const panel = panelRef.current;

      if (!panel) {
        return;
      }

      const target =
        initialFocusRef?.current ?? getFocusableElements(panel)[0] ?? panel;
      target.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;

      if (!panel) {
        return;
      }

      const focusable = getFocusableElements(panel);

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !panel.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (activeElement === last || !panel.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      returnFocusElement?.focus();
    };
  }, [open, onClose, panelRef, initialFocusRef, returnFocusRef]);
}
