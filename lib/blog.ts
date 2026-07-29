import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Blog posts are authored MDX in /content/blog and read at build time.
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  readingTime: string;
  published: boolean;
};

export type Post = PostMeta & { content: string };

function readAll(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date(0).toISOString(),
        tags: (data.tags ?? []) as string[],
        readingTime: readingTime(content).text,
        published: data.published !== false,
        content,
      };
    });
}

export function getAllPosts(): PostMeta[] {
  return readAll()
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(({ content: _content, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  return readAll().find((p) => p.slug === slug && p.published);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
