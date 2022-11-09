/** @type {import('next').NextConfig} */
const withFonts = require("next-fonts");

const nextConfig = withFonts({
  reactStrictMode: true,
  //   enableSvg: true,

  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = nextConfig;
