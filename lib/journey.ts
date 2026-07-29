/**
 * The journey timeline: the narrative spine of the home page and the story
 * behind the /world monuments. Years are inferred from Yong's account (b.2003)
 * and are easy to adjust; each milestone maps to a "chapter" of the story.
 */

export type Milestone = {
  id: string;
  /** Display year/range label. */
  when: string;
  /** Sort key (approx start year). */
  year: number;
  chapter: string;
  title: string;
  body: string;
  /** Optional headline stat to render as a figure. */
  metric?: { value: string; label: string };
  href?: string;
  /** Icon key -> components/icons.tsx */
  icon: "server" | "gamepad" | "shield" | "cube" | "cap" | "compass" | "spark";
};

export const journey: Milestone[] = [
  {
    id: "minecraft",
    when: "2018 · Age 15",
    year: 2018,
    chapter: "Chapter 01 · The first server",
    title: "A Minecraft server, and 250 players",
    body: "It started with a world I could host myself. I built and ran a Minecraft server from age fifteen and grew it to a peak of 250 concurrent players, teaching myself systems administration, community, and shipping software people actually used, years before it was a job.",
    metric: { value: "250", label: "peak concurrent players" },
    icon: "server",
  },
  {
    id: "polytechnic",
    when: "2019 to 2022",
    year: 2019,
    chapter: "Chapter 02 · Learning to make",
    title: "Game Development at Nanyang Polytechnic",
    body: "After secondary school I spent three years on a Diploma in Game Development at Nanyang Polytechnic, where designing systems for play sharpened the instinct for interaction, feel, and craft that shows up in everything I build now.",
    icon: "gamepad",
  },
  {
    id: "national-service",
    when: "2022 to 2024",
    year: 2022,
    chapter: "Chapter 03 · The self-taught years",
    title: "National Service, and twelve-hour coding days",
    body: "I served two years of National Service in Singapore as a security trooper. The downtime became a forge. I taught myself to build, full days of sometimes twelve hours of coding: websites, e-commerce, and eventually blockchain development on Supra, a Move-based chain. Discipline in, obsession out.",
    icon: "shield",
  },
  {
    id: "crystara",
    when: "Jan 2025",
    year: 2025,
    chapter: "Chapter 04 · Shipping for real",
    title: "Crystara, first NFT marketplace on Supra",
    body: "Everything I'd taught myself compounded into Crystara: the first NFT marketplace on Supra, with provably-fair blind-box mints powered by on-chain randomness. I built it end-to-end, won first place at the Supra SuperMovers hackathon, and raised a six-figure round.",
    metric: { value: "1st", label: "place · Supra hackathon" },
    href: "/projects/crystara",
    icon: "cube",
  },
  {
    id: "nus",
    when: "2024 to present",
    year: 2024,
    chapter: "Chapter 05 · The foundations",
    title: "Computer Science at NUS",
    body: "I'm now a Year 2 Computer Science student at the National University of Singapore, pairing the theory with the years of building that came before it.",
    icon: "cap",
  },
  {
    id: "truenorth",
    when: "Nov 2025",
    year: 2025.9,
    chapter: "Chapter 06 · Into the AI era",
    title: "AI Engineer at True North",
    body: "I joined True North, a Singapore AI startup building the world's first agentic brokerage, as an AI Engineer, bringing autonomous agents into a domain where correctness and latency are everything.",
    href: "/projects/true-north",
    icon: "compass",
  },
  {
    id: "kavela",
    when: "Feb 2026",
    year: 2026,
    chapter: "Chapter 07 · Now",
    title: "Building Kavela",
    body: "Now I'm building Kavela, a cloud platform that turns a described outcome into a production-grade AI agent. The throughline from a Minecraft server at fifteen to here: build the thing, ship it, make it real.",
    href: "/projects/kavela",
    icon: "spark",
  },
];
