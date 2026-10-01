import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone only for Docker containers; Vercel deploys natively with automatic tracing
  output: process.env.DOCKER_BUILD ? "standalone" : undefined,
  experimental: {
    cpus: 2,
  },
};

export default nextConfig;
