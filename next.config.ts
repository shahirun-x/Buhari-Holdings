import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * TEMPORARY — required only so `next/image` will serve the committed SVG
     * placeholders in /public/images. Every image the site renders is a
     * first-party file in this repo; there is no user-supplied or remote
     * image path. The CSP below sandboxes them regardless.
     *
     * Remove both lines once real raster artwork replaces the placeholders.
     * See public/images/README.md.
     */
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline'",
  },
};

export default nextConfig;
