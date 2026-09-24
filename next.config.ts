import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.hepsensigorta.com",
      },
      {
        protocol: "https",
        hostname: "hepsensigorta.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "hepsensigorta.com",
          },
        ],
        destination: "https://www.hepsensigorta.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
