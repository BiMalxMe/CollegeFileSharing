/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },

  webpack: (config) => {
    config.resolve.fullySpecified = false;

    // Externalize undici to avoid Webpack parsing issues
    config.externals = [...config.externals, "undici"];

    return config;
  },
};

module.exports = nextConfig;
