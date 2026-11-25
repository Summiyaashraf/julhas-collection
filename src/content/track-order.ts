export interface TrackingStage {
  title: string;
  description: string;
}

export interface TrackOrderContent {
  eyebrow: string;
  title: string;
  intro: string;
  lookup: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    submitLabel: string;
    loadingLabel: string;
    resetLabel: string;
  };
  success: {
    eyebrow: string;
    description: string;
    statusLabel: string;
    estimate: string;
  };
  stages: readonly TrackingStage[];
  help: {
    orderId: {
      eyebrow: string;
      title: string;
      description: string;
    };
    delivery: {
      eyebrow: string;
      title: string;
      description: string;
    };
    support: {
      eyebrow: string;
      title: string;
      description: string;
      label: string;
    };
  };
}

export const TRACK_ORDER_CONTENT: TrackOrderContent = {
  eyebrow: "Order Concierge",
  title: "TRACK YOUR ORDER",
  intro:
    "Follow your Julhas piece from our atelier to your doorstep. Enter your order details below for the latest status.",
  lookup: {
    eyebrow: "Order Lookup",
    title: "Find your order",
    description:
      "Enter your order ID and the email or phone number used at checkout.",
    note: "Preview experience — live courier tracking is not connected yet. For a confirmed update, our team is available on WhatsApp.",
    submitLabel: "TRACK ORDER",
    loadingLabel: "Tracking Order",
    resetLabel: "Track Another Order",
  },
  success: {
    eyebrow: "Order Located",
    description:
      "Here is the latest update for your Julhas order.",
    statusLabel: "In Transit",
    estimate: "Estimated delivery in 2–3 working days",
  },
  stages: [
    {
      title: "Order Placed",
      description: "Your order has been confirmed and received by our team.",
    },
    {
      title: "Processing",
      description:
        "Your pieces are being prepared and checked at our studio.",
    },
    {
      title: "Dispatched",
      description:
        "Your parcel has left our studio and is with the courier.",
    },
    {
      title: "Delivered",
      description: "Your order will arrive at your doorstep.",
    },
  ],
  help: {
    orderId: {
      eyebrow: "Order ID",
      title: "Finding your order ID",
      description:
        "Your order ID is included in the confirmation message sent at checkout. It begins with JC- and usually looks like #JC-1042.",
    },
    delivery: {
      eyebrow: "Delivery",
      title: "A note on delivery",
      description:
        "Orders are dispatched within 1–2 working days and delivered nationwide across Pakistan. Our team shares updates throughout.",
    },
    support: {
      eyebrow: "Concierge",
      title: "Prefer to speak with us?",
      description:
        "Send us a message on WhatsApp and we will look into your order directly.",
      label: "Chat on WhatsApp",
    },
  },
};
