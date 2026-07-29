import Link from "next/link";
import { site, nav } from "@/lib/site";
import { socialIcons } from "./icons";
import { Container, MonoLabel } from "./ui";
import { IconArrowUpRight } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line">
      <Container className="py-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold tracking-tight">
              Let&apos;s build something real.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {site.role} · {site.location}. Open to ambitious problems in AI,
              systems, and product.
            </p>
            <Link
              href="/contact"
              className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
            >
              Start a conversation
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <MonoLabel tick={false}>Sitemap</MonoLabel>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="focus-ring text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <MonoLabel tick={false}>Elsewhere</MonoLabel>
              <ul className="mt-4 space-y-2.5">
                {site.socials.map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        <Icon className="h-4 w-4" />
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="mono-label">
            © {year} {site.name}
          </p>
          <p className="mono-label text-fg-subtle">
            Designed &amp; built in Singapore
          </p>
        </div>
      </Container>
    </footer>
  );
}
