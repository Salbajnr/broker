import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "sbcdn.bitpanda.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
