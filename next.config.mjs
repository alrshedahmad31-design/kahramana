import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All images are local (public/) — no remote patterns needed.
    // Next.js optimises them automatically (WebP/AVIF output, lazy loading).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
