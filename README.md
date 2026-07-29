# tanyonghong.com — portfolio

The personal portfolio of **Tan Yong Hong (Young)** — software & AI engineer.
Cinematic, minimal, three themes (light / dark / **fuzzy** game mode), an MDX
blog, an interactive 3D voxel world, and SEO/GEO-optimized metadata.

## Stack

- **Next.js 14.2.35** (App Router) · TypeScript · Tailwind CSS
- **React Three Fiber** + drei + postprocessing — the `/world` voxel scene
- **Framer Motion** + **Lenis** — motion & smooth scroll
- **next-mdx-remote** — the blog (`/content/blog/*.mdx`)
- **Resend** — the contact form (edge runtime)
- Deployed on **Cloudflare Pages** via `@cloudflare/next-on-pages`

Pinned to Next 14.2.35 (latest patched 14.2.x — the `CVE-2025-29927`
middleware bypass and Dec-2025 advisories are fixed). The only residual audit
finding is `postcss` bundled **inside** Next itself: a build-time CSS issue that
requires attacker-controlled stylesheets (N/A for self-authored CSS) and whose
only upstream fix is Next 16, which Cloudflare Pages can't run.

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

### Environment variables

| Var                    | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Production origin (canonical URLs, sitemap, OG)    |
| `RESEND_API_KEY`       | Contact form delivery — get one at resend.com      |
| `CONTACT_TO`           | (optional) recipient override                      |
| `CONTACT_FROM`         | (optional) verified sender, e.g. `you@domain.com`  |

Without `RESEND_API_KEY` the contact form fails gracefully and points visitors
to LinkedIn / X.

## Deploy — Cloudflare Pages

Connect the repo in the Cloudflare dashboard, then set:

- **Build command:** `npx @cloudflare/next-on-pages@1`
- **Build output directory:** `.vercel/output/static`
- **Compatibility flag:** `nodejs_compat` (already in `wrangler.toml`)
- Add the env vars above under **Settings → Environment variables**

Cloudflare builds on Linux, where `next-on-pages` runs correctly. **On Windows,
`next-on-pages` does not run locally** (Vercel CLI limitation) — use WSL for
`npm run preview` / `npm run deploy`, or just push and let Pages build it.

## Editing content

- **Projects** — `lib/projects.ts` (drives cards, `/projects/[slug]`, the world)
- **Journey timeline** — `lib/journey.ts`
- **Blog** — add an `.mdx` file to `content/blog/` with frontmatter
  (`title`, `description`, `date`, `tags`, `published`)
- **Site info & socials** — `lib/site.ts` (add a GitHub URL here to surface it)
- **Images** — drop real assets into `public/images/...`; slots show a designed
  placeholder until then (portrait, project covers)

## Themes

Three themes via `next-themes` (`data-theme`): `light`, `dark`, and `fuzzy`
(the neon "game" mode). Tokens live in `app/globals.css`.
