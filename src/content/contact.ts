import { siteConfig } from "@/lib/constants/site";

export interface ContactMethod {
  label: string;
  value: string;
  href: string;
  description: string;
  external?: boolean;
}

export interface ContactStoreDetail {
  label: string;
  value: string;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  intro: string;
  methods: readonly ContactMethod[];
  workingHours: string;
  responseNote: string;
  store: {
    title: string;
    description: string;
    details: readonly ContactStoreDetail[];
  };
  form: {
    title: string;
    description: string;
    note: string;
  };
}

export const CONTACT_CONTENT: ContactContent = {
  eyebrow: "Contact",
  title: "We would love to hear from you.",
  intro:
    "Questions about an order, a fabric, or finding the right size? Our team is here to help.",
  methods: [
    {
      label: "WhatsApp",
      value: siteConfig.phone,
      href: siteConfig.whatsapp,
      description:
        "The quickest way to reach us for order updates and product questions.",
      external: true,
    },
    {
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      description:
        "For detailed enquiries, collaborations, and anything that needs a little more context.",
    },
    {
      label: "Call",
      value: siteConfig.phone,
      href: siteConfig.phoneHref,
      description:
        "Speak with our team during working hours for immediate assistance.",
    },
  ],
  workingHours: siteConfig.workingHours,
  responseNote:
    "We aim to respond within one working day. Messages sent outside working hours will be answered on the next working day.",
  store: {
    title: "The Studio",
    description:
      "Our studio welcomes order collections and fittings by appointment. Message us on WhatsApp before you visit so we can set aside time for you.",
    details: [
      { label: "Location", value: "Pakistan" },
      { label: "Visits", value: "By appointment" },
      { label: "Delivery", value: "Nationwide" },
    ],
  },
  form: {
    title: "Send us a message",
    description:
      "Share a few details and we will get back to you as soon as we can.",
    note: "This form is a demo in the current build and does not submit to a live inbox.",
  },
};
