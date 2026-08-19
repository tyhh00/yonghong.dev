import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { MonoLabel } from "@/components/ui";
import {
  IconArrowUpRight,
  IconTelegram,
  IconKavela,
  IconX,
  IconLinkedin,
} from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Links",
  description: `All of ${site.alias}'s links in one place.`,
  path: "/links",
});

type LinkItem = {
  label: string;
  handle: string;
  href: string;
  Icon: (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
};

const links: LinkItem[] = [
  {
    label: "Kavela",
    handle: "Build agents · kavela.ai",
    href: "https://kavela.ai",
    Icon: IconKavela,
  },
  {
    label: "X / Twitter",
    handle: "@tyhho0",
    href: "https://x.com/tyhho0?s=11",
    Icon: IconX,
  },
  {
    label: "LinkedIn",
    handle: "Tan Yong Hong",
    href: "https://www.linkedin.com/in/tan-yong-hong-374593200?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    Icon: IconLinkedin,
  },
  {
    label: "Telegram",
    handle: "@tyhh00",
    href: "https://t.me/tyhh00",
    Icon: IconTelegram,
  },
];

export default function LinksPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Faint technical grid backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-5 py-24 sm:px-6">
        {/* Monogram */}
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="focus-ring group relative flex h-14 w-14 items-center justify-center"
        >
          <svg viewBox="0 0 32 32" className="h-14 w-14" aria-hidden>
            <rect
              x="1"
              y="1"
              width="30"
              height="30"
              rx="8"
              className="fill-none stroke-line"
              strokeWidth="1.3"
            />
            <path
              d="M9.5 9 L16 16 L22.5 9"
              className="stroke-fg"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M16 16 L16 23.5"
              className="stroke-accent"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="2" className="fill-accent" />
          </svg>
          <span className="glow-accent absolute inset-0 rounded-[8px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {/* Name + intro */}
        <h1 className="mt-6 text-center font-display text-2xl font-semibold tracking-tight">
          {site.name}
        </h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-fg-muted">
          {site.role} · Singapore
        </p>

        {/* Built-at-event badge */}
        <a
          href="https://kavela.ai/agents/kavela-worker/"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring group mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/60 px-3.5 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent/50 hover:text-fg"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="mono-label">
            Built this at the Marc Low event today
          </span>
          <IconArrowUpRight className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" />
        </a>

        {/* Link buttons */}
        <div className="mt-8 flex w-full flex-col gap-3">
          {links.map(({ label, handle, href, Icon }) => {
            const isExternal = href.startsWith("http");
            const Comp = isExternal ? "a" : Link;
            return (
              <Comp
                key={label}
                href={href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="focus-ring group panel flex w-full items-center gap-4 px-5 py-4 transition-all duration-300 ease-expo hover:border-accent/50 hover:bg-bg-elev hover:shadow-[0_0_24px_-8px_rgb(var(--glow)/0.35)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-bg text-fg transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-medium text-fg">{label}</span>
                  <span className="truncate text-xs text-fg-muted">{handle}</span>
                </span>
                <IconArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </Comp>
            );
          })}
        </div>

        {/* Footer hint */}
        <p className="mt-10 text-center text-xs text-fg-subtle">
          <Link href="/" className="focus-ring transition-colors hover:text-fg">
            yonghong.dev
          </Link>
        </p>
      </div>
    </div>
  );
}
