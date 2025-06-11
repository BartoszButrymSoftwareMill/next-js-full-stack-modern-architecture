import { NextConfig } from "next";

import "./src/env/server.ts";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      new URL("https://picsum.photos/**"),
    ],
  },
};

export default nextConfig;
