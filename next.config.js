/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["img.clerk.com", "ipfs.xlog.app"],
    // remotePatterns: [
    //   {
    //     // https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
    //     protocol: "https",
    //     hostname: "**",
    //   }
    // ],
  },
};

module.exports = nextConfig;
