import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatLongDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container, MonoLabel, Tag } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { IconArrowUpRight } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description:
    "Notes on building AI systems, blockchain, and the craft of shipping software, by Tan Yong Hong.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-28 pb-24 sm:pt-32">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
          ]}
        />

        <header className="mt-10 max-w-2xl">
          <MonoLabel index="00">Writing</MonoLabel>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
            Notes from the build.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted">
            Thinking out loud about AI systems, agents, blockchain, and the
            craft of shipping.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mono-label mt-16">No posts yet. Check back soon.</p>
        ) : (
          <ul className="mt-14 border-t border-line">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 0.04}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="focus-ring group grid gap-4 border-b border-line py-8 md:grid-cols-[180px_1fr] md:gap-8"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="mono-label text-fg-subtle">
                        {formatLongDate(post.date)}
                      </span>
                      <span className="mono-label text-fg-subtle">
                        {post.readingTime}
                      </span>
                    </div>
                    <div>
                      <h2 className="flex items-start gap-2 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                        {post.title}
                        <IconArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </h2>
                      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-fg-muted">
                        {post.description}
                      </p>
                      {post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((t) => (
                            <Tag key={t}>{t}</Tag>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
