/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages does not run Next's default image optimizer; serve images
  // as-authored (a Cloudflare Images loader can be added later if wanted).
  images: {
    unoptimized: true,
  },
  eslint: {
    // Design/build velocity: lint is run separately, not blocking `next build`.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
