import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
  qualities: [75, 90, 100],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
  ],
},
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.output.chunkFilename = "chunks/[name].js";
    }

    return config;
  },
};

export default nextConfig;
