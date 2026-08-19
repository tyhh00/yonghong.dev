import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projectSlugs } from "@/lib/projects";
import { getPostSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");

  const routes = ["", "/world", "/blog", "/links", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes = getPostSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes, ...postRoutes];
}
