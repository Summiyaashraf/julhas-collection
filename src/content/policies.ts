import {
  POLICY_SLUGS,
  type PolicySlug,
} from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site";

export interface PolicySection {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
}

export interface PolicyContent {
  slug: PolicySlug;
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  isPlaceholder: boolean;
  disclaimer: string;
  sections: readonly PolicySection[];
}

export const POLICY_CONTENT: Record<PolicySlug, PolicyContent> = {
  "privacy-policy": {
    slug: "privacy-policy",
    eyebrow: "Customer Care",
    title: "Privacy Policy",
    description:
      "How Julhas Collection collects, uses, and protects your personal information.",
    lastUpdated: "30 October 2026",
    isPlaceholder: true,
    disclaimer:
      "This policy is placeholder copy for the prototype and should be reviewed by the business before launch.",
    sections: [
      {
        heading: "Information We Collect",
        paragraphs: [
          "We collect the information you choose to share with us when you place an order, contact our team, or sign up for updates. This may include your name, email address, phone number, delivery address, and order details.",
          "We may also collect basic technical information such as your browser type, device, and pages visited, so we can understand how the site is used and improve the experience.",
        ],
      },
      {
        heading: "How We Use Your Information",
        bullets: [
          "To process and deliver your orders.",
          "To respond to enquiries and provide customer support.",
          "To send order updates and, where you have opted in, occasional collection news.",
          "To improve our website, products, and services.",
          "To meet legal and accounting obligations.",
        ],
      },
      {
        heading: "Sharing Your Information",
        paragraphs: [
          "We only share information where it is needed to run our business — for example, with delivery partners, payment providers, and service providers who help us operate the website. We do not sell your personal information.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Our website may use cookies and similar technologies to keep your bag working, remember preferences, and understand site usage. You can control cookies through your browser settings, though some parts of the site may not work as intended if you disable them.",
        ],
      },
      {
        heading: "Data Retention & Security",
        paragraphs: [
          "We keep personal information only for as long as needed for the purposes described in this policy, or as required by law. We take reasonable steps to protect the information we hold, but no method of transmission or storage is completely secure.",
        ],
      },
      {
        heading: "Your Rights",
        bullets: [
          "Request access to the personal information we hold about you.",
          "Ask us to correct information that is inaccurate or incomplete.",
          "Ask us to delete information we no longer need to keep.",
          "Opt out of marketing messages at any time.",
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          `For privacy-related questions, contact us at ${siteConfig.email}. We will do our best to respond within a reasonable timeframe.`,
        ],
      },
    ],
  },
  "refund-policy": {
    slug: "refund-policy",
    eyebrow: "Customer Care",
    title: "Return & Refund Policy",
    description:
      "Returns, exchanges, refunds, delivery, and lost-parcel support for Julhas Collection orders.",
    lastUpdated: "12 November 2026",
    isPlaceholder: false,
    disclaimer: "",
    sections: [
      {
        heading: "Returns & Exchanges",
        paragraphs: [
          "We want you to feel confident in every Julhas Collection purchase. If an item is not right, please contact us within 7 days of delivery so we can help arrange a return or exchange.",
          `To be eligible, items must be unworn, unwashed, unaltered, and returned with their original tags, packaging, and proof of purchase. Contact us at ${siteConfig.email} or message us on WhatsApp at ${siteConfig.phone} with your order number and reason for return.`,
        ],
        bullets: [
          "Return and exchange requests must be made within 7 days of delivery.",
          "Items must be in their original condition with tags and packaging intact.",
          "Exchanges are subject to stock availability; any price difference will be confirmed before dispatch.",
          "Return delivery charges are the customer's responsibility unless the item is faulty or incorrect.",
          "Opened fragrances, cut or washed unstitched fabric, final-sale items, and hygiene-sensitive accessories cannot be returned.",
        ],
      },
      {
        heading: "Refunds",
        paragraphs: [
          "Once your return is received and inspected, we will notify you whether it has been approved. Approved refunds are issued to the original payment method where possible, or as store credit if you prefer.",
          "Refunds are normally processed within 7–10 business days after approval. Your bank or payment provider may take additional time to post the amount to your account. Original delivery charges are non-refundable unless the return is due to an error on our part.",
          "If an order is cancelled before dispatch, we will refund the full amount paid. Made-to-order or personalised items may not be cancellable once production has begun.",
        ],
      },
      {
        heading: "Shipping",
        paragraphs: [
          "Orders are prepared within 1–2 business days and delivered across Pakistan, usually within 3–5 business days. Deliveries to remote areas may take longer. Tracking details are shared once your order is dispatched.",
          "Delivery timelines are estimates and may be affected by courier delays, weather, public holidays, or incomplete address details. Please ensure your contact number and delivery address are accurate. Orders over PKR 5,000 qualify for free standard delivery; any applicable charges are shown at checkout.",
        ],
      },
      {
        heading: "Lost Shipping",
        paragraphs: [
          "If your tracking shows no movement for an extended period, or your parcel is marked as delivered but has not arrived, please contact us within 48 hours of the expected or marked delivery date.",
          `We will open an investigation with the courier and keep you updated. Where a parcel is confirmed lost in transit, we will arrange a replacement or refund in accordance with the courier's investigation outcome. Contact us at ${siteConfig.email} or WhatsApp ${siteConfig.phone} with your order number so we can assist promptly.`,
        ],
      },
    ],
  },
  "terms-conditions": {
    slug: "terms-conditions",
    eyebrow: "Customer Care",
    title: "Terms & Conditions",
    description:
      "The terms that apply when you browse or shop with Julhas Collection.",
    lastUpdated: "12 November 2026",
    isPlaceholder: false,
    disclaimer: "",
    sections: [
      {
        heading: "Use of This Website",
        paragraphs: [
          "By browsing or shopping with Julhas Collection, you agree to these terms. Please read them carefully. If you do not agree, please do not use the website.",
        ],
      },
      {
        heading: "Products & Pricing",
        paragraphs: [
          "We aim to describe our products accurately, including colours, fabrics, and measurements. Slight variations may occur due to photography, screens, or the nature of the fabric.",
          "Prices are listed in Pakistani Rupees (PKR).",
        ],
      },
      {
        heading: "Prices & Availability",
        paragraphs: [
          "Prices and product availability may change without notice. Julhas Collection reserves the right to cancel orders in case of stock issues or pricing errors.",
        ],
      },
      {
        heading: "Orders & Acceptance",
        paragraphs: [
          "Placing an order does not guarantee acceptance. We may cancel or decline an order if we suspect fraudulent activity or if the order cannot be fulfilled. If an order is cancelled after payment, we will arrange a refund.",
        ],
      },
      {
        heading: "Delivery",
        paragraphs: [
          "We deliver across Pakistan. Estimated delivery timelines are shared for guidance and may vary due to location, weather, public holidays, or courier delays. Please ensure your delivery details are accurate and complete.",
        ],
      },
      {
        heading: "Intellectual Property",
        paragraphs: [
          "All content on this website — including text, images, branding, and designs — belongs to Julhas Collection or is used with permission. It may not be copied, reproduced, or used for commercial purposes without written permission.",
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          "To the extent permitted by law, Julhas Collection is not liable for indirect or consequential losses arising from the use of this website. Nothing in these terms limits rights that cannot be excluded under applicable law.",
        ],
      },
      {
        heading: "Changes to These Terms",
        paragraphs: [
          "We may update these terms from time to time. The latest version will always be published on this page, and continued use of the website means you accept the updated terms.",
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          `For questions about these terms, contact us at ${siteConfig.email}.`,
        ],
      },
    ],
  },
};

export function isPolicySlug(value: string): value is PolicySlug {
  return (POLICY_SLUGS as readonly string[]).includes(value);
}

export function getPolicy(slug: string): PolicyContent | undefined {
  return isPolicySlug(slug) ? POLICY_CONTENT[slug] : undefined;
}
