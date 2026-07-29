/**
 * Single source of truth for projects. Consumed by the home preview, the
 * /projects/[slug] detail pages, the 3D world monuments, and JSON-LD.
 * Cover images live in /public/images/projects.
 */

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  /** ISO year-month; end omitted => ongoing. */
  period: { start: string; end?: string };
  /** For ordering + labels only. */
  category: "AI" | "Blockchain" | "Product";
  status: "Live" | "Ongoing" | "Shipped";
  url?: string;
  /** Short one/two sentence hook used on cards + world panels. */
  summary: string;
  /** Full narrative for the detail page. Array = paragraphs. */
  synopsis: string[];
  highlights: string[];
  stack: string[];
  /** Headline metrics rendered as a data panel. */
  metrics?: { value: string; label: string }[];
  links: ProjectLink[];
  /** Accent hint (an RGB triplet string) used sparingly on the detail hero. */
  accent: string;
  /** 3D world monument descriptor. */
  monument: {
    kind: "box" | "tower" | "compass" | "cluster" | "garden" | "grid";
    /** Grid coordinates on the island, in world units. */
    position: [number, number, number];
    color: string; // hex
  };
  images: {
    cover: string;
    gallery?: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "kavela",
    name: "Kavela",
    tagline: "Describe the outcome. Kavela builds the cloud agent.",
    role: "Founder & Engineer",
    period: { start: "2026-02" },
    category: "AI",
    status: "Live",
    url: "https://kavela.ai/",
    summary:
      "A cloud platform that turns a described outcome into a production-grade AI agent, with the harness real work actually needs.",
    synopsis: [
      "Most AI agents die in the demo. They predict text but can't act, and the 95% that never reach production fail on the same thing: they lack a real harness. Skills, connectors, memory, a sandbox, tools, and a governed agent loop.",
      "Kavela is the harness. You describe the outcome you want; Kavela distills it into a productionizable specification and stands up the agentic infrastructure to run it: built by you, governed by you, evaluated by you. It's the platform I wished existed while shipping agents in the wild.",
    ],
    highlights: [
      "Outcome-first authoring: describe the job, get a running cloud agent",
      "Full agent harness: skills, connectors, memory, sandbox, tools, loop",
      "A control plane designed for evaluation and governance, not just demos",
    ],
    stack: ["TypeScript", "Cloud infra", "LLM orchestration", "Agent tooling"],
    metrics: [
      { value: "95%", label: "of agents never reach production" },
      { value: "6", label: "harness primitives in every Kavela agent" },
    ],
    links: [{ label: "Visit Kavela", href: "https://kavela.ai/" }],
    accent: "45 212 191",
    monument: { kind: "cluster", position: [4, 0, -3], color: "#2DD4BF" },
    images: { cover: "/images/projects/kavela.png" },
  },
  {
    slug: "hna-code",
    name: "HNA-Code",
    tagline: "Mission control for parallel coding agents.",
    role: "Creator",
    period: { start: "2026-06" },
    category: "AI",
    status: "Ongoing",
    url: "https://github.com/tyhh00/HNA-Code",
    summary:
      "An open-source desktop app that runs a live grid of parallel Claude Code & Codex agents. They glow when they need you, and resume after a restart.",
    synopsis: [
      "When you run more than one or two coding agents, the terminal stops scaling. You lose track of which session is working, which is blocked on a permission, and which folder each belongs to. HNA-Code (Humans and Agents Code) is the fix: a visual grid where every cell is a real terminal running a coding agent.",
      "Cells glow amber when an agent finishes and blue when one needs permission, so your attention goes exactly where it's needed. Sessions persist across restarts and resume where they left off, span multiple accounts, and take broadcast commands. I built it in Electron, open-sourced it under MIT, and it's steadily gathering stars.",
    ],
    highlights: [
      "Live grid of real PTY terminals, one coding agent per cell",
      "Glow indicators plus a needs-you-first sidebar to triage attention",
      "State persistence: every session resumes after a machine restart",
    ],
    stack: ["Electron", "TypeScript", "node-pty", "Playwright"],
    metrics: [
      { value: "21★", label: "GitHub stars and climbing" },
      { value: "MIT", label: "open source, cross-platform" },
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/tyhh00/HNA-Code" }],
    accent: "129 140 248",
    monument: { kind: "grid", position: [3.5, 0, 2.5], color: "#818CF8" },
    images: { cover: "/images/projects/hna-code.png" },
  },
  {
    slug: "true-north",
    name: "True North",
    tagline: "The world's first agentic brokerage.",
    role: "AI Engineer",
    period: { start: "2025-11" },
    category: "AI",
    status: "Ongoing",
    url: "https://truenorth.xyz/",
    summary:
      "AI Engineer building autonomous, agent-driven trading infrastructure at a Singapore AI startup.",
    synopsis: [
      "True North is building the first agentic brokerage, where autonomous AI agents, not dashboards, sit at the center of how people trade. I joined in November 2025 as an AI Engineer.",
      "My work lives at the intersection of LLM agents and real financial execution: designing the systems that let agents reason, act, and stay accountable in a domain where correctness and latency are non-negotiable.",
    ],
    highlights: [
      "Agentic systems for autonomous trading & brokerage",
      "Reliable tool-use and execution in a high-stakes financial domain",
      "Production LLM engineering: evaluation, guardrails, latency",
    ],
    stack: ["LLM agents", "TypeScript", "Python", "Financial systems"],
    links: [{ label: "Visit True North", href: "https://truenorth.xyz/" }],
    accent: "251 191 36",
    monument: { kind: "compass", position: [0, 0, -5], color: "#FBBF24" },
    images: { cover: "/images/projects/true-north.png" },
  },
  {
    slug: "crystara",
    name: "Crystara",
    tagline: "Discover NFTs in blind boxes.",
    role: "Founder",
    period: { start: "2025-01" },
    category: "Blockchain",
    status: "Live",
    url: "https://crystara.trade/",
    summary:
      "The first NFT marketplace on Supra, with gamified blind-box mints and provably-fair on-chain randomness. First place at the Supra hackathon; raised six figures.",
    synopsis: [
      "Crystara is the first NFT marketplace on the Supra network. It reimagines minting as a game: creators launch collections as blind boxes, and collectors unbox surprise NFTs, with rarity and rewards decided by Supra's dVRF, a decentralized Verifiable Random Function that makes every draw provably fair and transparent.",
      "I designed and built it end-to-end: Move smart contracts, the marketplace, and the product, after teaching myself blockchain development on Supra. It won first place at the Supra SuperMovers hackathon and went on to raise a six-figure round.",
    ],
    highlights: [
      "First NFT marketplace on the Supra blockchain",
      "Provably-fair blind-box mechanics powered by on-chain dVRF",
      "Move smart contracts, marketplace, and product built solo",
    ],
    stack: ["Move", "Supra", "Next.js", "Smart contracts", "dVRF"],
    metrics: [
      { value: "1st", label: "place · Supra SuperMovers hackathon" },
      { value: "6-fig", label: "raised" },
      { value: "#1", label: "NFT marketplace on Supra" },
    ],
    links: [
      { label: "Visit Crystara", href: "https://crystara.trade/" },
      { label: "Docs", href: "https://docs.crystara.trade/products/introduction/" },
    ],
    accent: "255 47 176",
    monument: { kind: "box", position: [-4, 0, -2], color: "#FF2FB0" },
    images: { cover: "/images/projects/crystara.png" },
  },
  {
    slug: "a-patch-of-heaven",
    name: "A Patch of Heaven",
    tagline: "A guiding light for difficult conversations.",
    role: "Founder & Engineer",
    period: { start: "2024" },
    category: "Product",
    status: "Live",
    url: "https://apatchofheaven.com/",
    summary:
      "A digital storybook platform that helps children process grief. A full-stack product with heart, built end-to-end.",
    synopsis: [
      "A Patch of Heaven is a digital storybook platform designed to help children understand loss. At its center is a beautifully illustrated 40-page story following a character named Timmy, paired with interactive activities and a caregiver discussion guide, grounded in child-development and grief-informed practices.",
      "I built the whole product: storefront, digital delivery, narration, and the interactive experience. It's the project that proves range: the same engineering care that ships smart contracts, applied to something quietly human.",
    ],
    highlights: [
      "40-page illustrated interactive storybook with narration",
      "Eight guided activities plus a caregiver discussion guide",
      "Full-stack e-commerce & digital delivery, built solo",
    ],
    stack: ["Next.js", "E-commerce", "Payments", "Digital delivery"],
    links: [{ label: "Visit A Patch of Heaven", href: "https://apatchofheaven.com/" }],
    accent: "124 174 120",
    monument: { kind: "garden", position: [-2, 0, 3], color: "#7CAE78" },
    images: { cover: "/images/projects/a-patch-of-heaven.jpg" },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectSlugs = projects.map((p) => p.slug);
