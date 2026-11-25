export interface AccountBenefit {
  title: string;
  description: string;
}

export interface AccountContent {
  eyebrow: string;
  title: string;
  intro: string;
  asideEyebrow: string;
  asideTitle: string;
  asideDescription: string;
  benefits: readonly AccountBenefit[];
  support: {
    title: string;
    description: string;
  };
}

export const ACCOUNT_CONTENT: AccountContent = {
  eyebrow: "Your Account",
  title: "A quieter way to shop.",
  intro:
    "Sign in to keep your details close, revisit past orders, and move through checkout with less effort.",
  asideEyebrow: "Membership",
  asideTitle: "Considered from the first visit.",
  asideDescription:
    "An account keeps the details that matter in one place, so every return feels familiar.",
  benefits: [
    {
      title: "Order history",
      description:
        "Return to past orders, check what you bought, and reorder the pieces you love.",
    },
    {
      title: "Saved details",
      description:
        "Keep delivery information on hand so future orders take only a moment.",
    },
    {
      title: "Faster checkout",
      description:
        "Move through the bag with your details already in place.",
    },
    {
      title: "Private notes",
      description:
        "Occasional collection previews and private offers, shared with care.",
    },
  ],
  support: {
    title: "Need a hand?",
    description:
      "Our team can help with an order, a fit, or a fragrance question — no account needed.",
  },
};
