import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      // TODO this is only necessary because it seems to want to follow the old redirect that went to a now-gone directory
      {
        source: '/search',
        destination: '/home',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
