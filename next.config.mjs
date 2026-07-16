/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.voxelo.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "outfit.hellohello.is",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
