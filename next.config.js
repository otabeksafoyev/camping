/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "assets.asaxiy.uz",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  