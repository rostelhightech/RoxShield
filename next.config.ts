import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://www.rostelhightech.com",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://www.rostelhightech.com https://rostelhightech.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
