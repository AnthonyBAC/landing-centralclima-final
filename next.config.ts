import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", ".prisma/client", "pg", "pg-cloudflare", "@prisma/adapter-pg"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
