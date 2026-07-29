import Link from "next/link";
import { Container, MonoLabel, ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center pt-16">
      <Container>
        <MonoLabel>Error 404</MonoLabel>
        <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
          Lost the thread.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted">
          This page doesn&apos;t exist, or it moved. Let&apos;s get you back to
          something real.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <Link
            href="/world"
            className="focus-ring inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg/40"
          >
            Explore the world
          </Link>
        </div>
      </Container>
    </div>
  );
}
