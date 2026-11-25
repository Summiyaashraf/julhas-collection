export interface AboutContent {
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
  };
  intro: string;
  journey: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    image: {
      src: string;
      alt: string;
      caption: string;
      badge: string;
    };
  };
  founder: {
    eyebrow: string;
    quote: string;
    name: string;
    role: string;
  };
  visionMission: {
    eyebrow: string;
    title: string;
    vision: {
      title: string;
      description: string;
    };
    mission: {
      title: string;
      description: string;
    };
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    label: string;
    href: string;
  };
}

export const ABOUT_CONTENT: AboutContent = {
  hero: {
    eyebrow: "DISCOVER OUR STORY",
    title: "JULHAAS",
    tagline: "Where Tradition Meets Modern Elegance",
  },
  intro:
    "Discover the story behind Julhas Collection — a house shaped by Pakistani craft, considered design, and a belief that tradition belongs in modern life.",
  journey: {
    eyebrow: "Our Journey",
    title: "A Legacy of Elegance & Craftsmanship",
    paragraphs: [
      "Julhas Collection was born from a love of Pakistani craft and a belief that tradition should feel effortless in the modern wardrobe. What began as a small study of embroidery, fabric, and silhouette has grown into a house devoted to pieces that carry meaning.",
      "Our work is rooted in the hands that make it — the embroiderer's patience, the tailor's precision, the quiet rhythm of small-batch production. Each collection honours those skills while reimagining them for the way we live now.",
      "From everyday lawn to occasion wear, we choose fabrics for the way they feel, colours for the way they endure, and details for the way they reward a second look.",
    ],
    image: {
      src: "/images/editorial/journey.jpg",
      alt: "Still life of draped fabric, embroidery, and stone textures in warm neutral tones",
      caption: "Rooted in craft. Made for now.",
      badge: "The Julhas Atelier",
    },
  },
  founder: {
    eyebrow: "A Message From Our Founder",
    quote:
      "I founded Julhas with a simple belief: heritage should not be kept apart from everyday life. It should be worn, lived in, and passed on. Every piece we create carries the hand of an artisan, the discipline of considered design, and the hope that it becomes part of your own story.",
    name: "Safdar Iqbal",
    role: "Founder & CEO",
  },
  visionMission: {
    eyebrow: "What Guides Us",
    title: "Vision & Mission",
    vision: {
      title: "Our Vision",
      description:
        "To be recognised as a house of quiet luxury — where Pakistani craft traditions and contemporary design meet, and where every collection feels as enduring as it is beautiful.",
    },
    mission: {
      title: "Our Mission",
      description:
        "To create considered, beautifully made pieces that bring ease and elegance to everyday dressing, while honouring the artisans and traditions behind them.",
    },
  },
  cta: {
    eyebrow: "Join Our Journey",
    title: "Become part of the Julhas story.",
    description:
      "Explore pieces shaped by heritage, made for the present, and designed to stay with you for years to come.",
    label: "EXPLORE COLLECTION",
    href: "/collections",
  },
};
