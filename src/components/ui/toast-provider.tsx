"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ReactNode } from "react";

import {
  ToastRegion,
  type ToastAction,
  type ToastItem,
  type ToastVariant,
} from "@/components/ui/toast-region";

const DEFAULT_DURATION = 4500;

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
}

export interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
  dismissToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const counterRef = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);

    return () => window.clearTimeout(timer);
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
    setPaused(false);
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    counterRef.current += 1;
    setToast({
      id: String(counterRef.current),
      title: options.title,
      description: options.description,
      variant: options.variant ?? "success",
      duration: options.duration ?? DEFAULT_DURATION,
      action: options.action,
    });
    setPaused(false);
  }, []);

  useEffect(() => {
    if (!toast || paused || toast.duration <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
      setPaused(false);
    }, toast.duration);

    return () => window.clearTimeout(timer);
  }, [toast, paused]);

  const value = useMemo(
    () => ({ showToast, dismissToast }),
    [showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted ? (
        <ToastRegion
          toast={toast}
          onDismiss={dismissToast}
          onPauseChange={setPaused}
        />
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
