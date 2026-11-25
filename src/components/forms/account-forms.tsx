"use client";

import { useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { buttonStyles } from "@/components/ui/button-styles";
import { Input } from "@/components/ui/input";
import {
  MailIcon,
  UserIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { ACCOUNT_CONTENT } from "@/content/account";
import { siteConfig } from "@/lib/constants/site";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "@/lib/validation/forms";
import { cn } from "@/lib/utils/cn";

type AccountTab = "sign-in" | "create";

const TABS: readonly { id: AccountTab; label: string }[] = [
  { id: "sign-in", label: "Sign In" },
  { id: "create", label: "Create Account" },
];

const TAB_ORDER = TABS.map((tab) => tab.id);

interface SignInForm {
  email: string;
  password: string;
}

interface CreateForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const EMPTY_SIGN_IN: SignInForm = {
  email: "",
  password: "",
};

const EMPTY_CREATE: CreateForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

export function AccountForms() {
  const [activeTab, setActiveTab] = useState<AccountTab>("sign-in");
  const [signIn, setSignIn] = useState<SignInForm>(EMPTY_SIGN_IN);
  const [create, setCreate] = useState<CreateForm>(EMPTY_CREATE);
  const [signInErrors, setSignInErrors] = useState<
    Partial<SignInForm>
  >({});
  const [createErrors, setCreateErrors] = useState<
    Partial<CreateForm>
  >({});
  const [submitted, setSubmitted] = useState<AccountTab | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectTab = (tab: AccountTab) => {
    setActiveTab(tab);
    setSubmitted(null);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const lastIndex = TAB_ORDER.length - 1;
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex === undefined) {
      return;
    }

    event.preventDefault();
    const nextTab = TAB_ORDER[nextIndex];
    selectTab(nextTab);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<SignInForm> = {
      email: validateEmail(signIn.email).error,
      password: signIn.password
        ? undefined
        : "Enter your password.",
    };

    setSignInErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setSubmitted("sign-in");
  };

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<CreateForm> = {
      firstName: validateName(create.firstName).error,
      lastName: validateName(create.lastName).error,
      email: validateEmail(create.email).error,
      phone: validatePhone(create.phone).error,
      password: validatePassword(create.password).error,
    };

    setCreateErrors(nextErrors);

    if (
      nextErrors.firstName ||
      nextErrors.lastName ||
      nextErrors.email ||
      nextErrors.phone ||
      nextErrors.password
    ) {
      return;
    }

    setSubmitted("create");
  };

  if (submitted) {
    return (
      <div className="border border-stone-300 bg-stone-50 p-6 md:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-gold">
          <UserIcon size={18} />
        </span>
        <p className="mt-6 eyebrow text-gold">Demo preview</p>
        <h2 className="mt-3 font-display text-2xl leading-tight text-ink md:text-3xl">
          Account access is coming soon.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Accounts are not connected in this preview, so{" "}
          {submitted === "create"
            ? "nothing was created"
            : "you have not been signed in"}
          . For an order update, a fit question, or help finding a
          piece, our team is happy to assist directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles({ variant: "gold" })}
          >
            <WhatsAppIcon size={16} />
            Message Us on WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className={buttonStyles({ variant: "secondary" })}
          >
            <MailIcon size={16} />
            Email Us
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone-200 pt-5">
          <button
            type="button"
            onClick={() => setSubmitted(null)}
            className={buttonStyles({ variant: "ghost", size: "sm" })}
          >
            Return to Form
          </button>
          <Link
            href="/collections"
            className="text-xs font-medium uppercase tracking-[0.14em] text-stone-600 underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-stone-300 bg-white">
      <div
        role="tablist"
        aria-label="Account access"
        className="grid grid-cols-2 border-b border-stone-200"
      >
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`account-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`account-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={cn(
                "min-h-14 border-b-2 px-4 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold",
                isActive
                  ? "border-gold text-ink"
                  : "border-transparent text-stone-500 hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="account-panel-sign-in"
        aria-labelledby="account-tab-sign-in"
        hidden={activeTab !== "sign-in"}
        className="p-6 md:p-8"
      >
        <h2 className="font-display text-2xl text-ink">
          Welcome back.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Sign in to revisit your orders and saved details.
        </p>
        <form
          onSubmit={handleSignIn}
          noValidate
          className="mt-7 space-y-5"
        >
          <Input
            id="account-signin-email"
            label="Email address"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={signIn.email}
            onChange={(event) => {
              setSignIn((current) => ({
                ...current,
                email: event.target.value,
              }));
              setSignInErrors((current) => ({
                ...current,
                email: undefined,
              }));
            }}
            error={signInErrors.email}
          />
          <Input
            id="account-signin-password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            value={signIn.password}
            onChange={(event) => {
              setSignIn((current) => ({
                ...current,
                password: event.target.value,
              }));
              setSignInErrors((current) => ({
                ...current,
                password: undefined,
              }));
            }}
            error={signInErrors.password}
          />
          <Button type="submit" size="lg" fullWidth>
            Sign In
          </Button>
        </form>
        <p className="mt-5 text-xs leading-relaxed text-stone-500">
          Trouble signing in?{" "}
          <Link
            href="/contact"
            className="font-medium text-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Contact our team
          </Link>
          .
        </p>
      </div>

      <div
        role="tabpanel"
        id="account-panel-create"
        aria-labelledby="account-tab-create"
        hidden={activeTab !== "create"}
        className="p-6 md:p-8"
      >
        <h2 className="font-display text-2xl text-ink">
          Create your account.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          A few details now make every future visit simpler.
        </p>
        <form
          onSubmit={handleCreate}
          noValidate
          className="mt-7 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              id="account-first-name"
              label="First name"
              autoComplete="given-name"
              value={create.firstName}
              onChange={(event) => {
                setCreate((current) => ({
                  ...current,
                  firstName: event.target.value,
                }));
                setCreateErrors((current) => ({
                  ...current,
                  firstName: undefined,
                }));
              }}
              error={createErrors.firstName}
            />
            <Input
              id="account-last-name"
              label="Last name"
              autoComplete="family-name"
              value={create.lastName}
              onChange={(event) => {
                setCreate((current) => ({
                  ...current,
                  lastName: event.target.value,
                }));
                setCreateErrors((current) => ({
                  ...current,
                  lastName: undefined,
                }));
              }}
              error={createErrors.lastName}
            />
          </div>
          <Input
            id="account-create-email"
            label="Email address"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={create.email}
            onChange={(event) => {
              setCreate((current) => ({
                ...current,
                email: event.target.value,
              }));
              setCreateErrors((current) => ({
                ...current,
                email: undefined,
              }));
            }}
            error={createErrors.email}
          />
          <Input
            id="account-create-phone"
            label="Phone number"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+92 300 0000000"
            value={create.phone}
            onChange={(event) => {
              setCreate((current) => ({
                ...current,
                phone: event.target.value,
              }));
              setCreateErrors((current) => ({
                ...current,
                phone: undefined,
              }));
            }}
            error={createErrors.phone}
          />
          <Input
            id="account-create-password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            hint="Use 8 characters or more."
            value={create.password}
            onChange={(event) => {
              setCreate((current) => ({
                ...current,
                password: event.target.value,
              }));
              setCreateErrors((current) => ({
                ...current,
                password: undefined,
              }));
            }}
            error={createErrors.password}
          />
          <Button type="submit" size="lg" fullWidth>
            Create Account
          </Button>
        </form>
        <p className="mt-5 text-xs leading-relaxed text-stone-500">
          By creating an account you agree to our{" "}
          <Link
            href="/policies/terms-conditions"
            className="font-medium text-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/policies/privacy-policy"
            className="font-medium text-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <div className="border-t border-stone-200 bg-stone-50 px-6 py-5 md:px-8">
        <p className="text-xs leading-relaxed text-stone-500">
          {ACCOUNT_CONTENT.support.description}{" "}
          <Link
            href="/contact"
            className="font-medium text-gold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
