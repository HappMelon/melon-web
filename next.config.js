/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        // TODO
        hostname: "img.clerk.com",
      },
    ],
  },
};

module.exports = nextConfig;
