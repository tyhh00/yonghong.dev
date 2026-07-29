/**
 * Public site configuration. Anything here ships to the client — never put the
 * contact email or secrets here (see app/api/contact/route.ts for those).
 */
export const site = {
  name: "Tan Yong Hong",
  alias: "Yong",
  birthYear: 2003,
  role: "Software & AI Engineer",
  location: "Singapore",
  domain: "yonghong.dev",
  // Override in production via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yonghong.dev",
  tagline: "Building at the frontier of AI, one system at a time.",
  description:
    "Tan Yong Hong (Yong) is a software and AI engineer from Singapore. NUS Computer Science, AI Engineer at True North, founder of Crystara, builder of Kavela and HNA-Code.",
  currentRole: {
    title: "AI Engineer",
    company: "True North",
    href: "https://truenorth.xyz/",
    since: "2025-11",
  },
  education: {
    current: "National University of Singapore",
    currentDetail: "B.Comp. Computer Science, Year 2",
  },
  socials: [
    { label: "X", handle: "@tyhho0", href: "https://x.com/tyhho0", icon: "x" },
    {
      label: "GitHub",
      handle: "tyhh00",
      href: "https://github.com/tyhh00",
      icon: "github",
    },
    {
      label: "LinkedIn",
      handle: "Tan Yong Hong",
      href: "https://www.linkedin.com/in/tan-yong-hong-374593200/",
      icon: "linkedin",
    },
  ] as Social[],
} as const;

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: "x" | "linkedin" | "github" | "mail";
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Journey", href: "/#journey" },
  { label: "World", href: "/world" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
