import { site } from "./site";
import { projects } from "./projects";

/** schema.org Person — the anchor for GEO / knowledge-graph understanding. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.alias,
    url: site.url,
    jobTitle: site.currentRole.title,
    description: site.description,
    worksFor: {
      "@type": "Organization",
      name: site.currentRole.company,
      url: site.currentRole.href,
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "National University of Singapore" },
      { "@type": "EducationalOrganization", name: "Nanyang Polytechnic" },
    ],
    address: { "@type": "PostalAddress", addressCountry: "SG", addressLocality: "Singapore" },
    knowsAbout: [
      "Artificial Intelligence",
      "AI Agents",
      "Software Engineering",
      "Blockchain",
      "Move (smart contracts)",
      "Full-stack development",
    ],
    sameAs: [
      ...site.socials.map((s) => s.href),
      ...projects.filter((p) => p.url).map((p) => p.url!),
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en",
    author: { "@type": "Person", name: site.name },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: new URL(it.path, site.url).toString(),
    })),
  };
}

export function articleSchema({
  title,
  description,
  slug,
  date,
  tags,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    url: new URL(`/blog/${slug}`, site.url).toString(),
    keywords: tags?.join(", "),
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: new URL(`/blog/${slug}`, site.url).toString(),
  };
}

export function creativeWorkSchema(p: (typeof projects)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.summary,
    url: p.url,
    creator: { "@type": "Person", name: site.name, url: site.url },
    dateCreated: p.period.start,
  };
}
