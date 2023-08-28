/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        // https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
