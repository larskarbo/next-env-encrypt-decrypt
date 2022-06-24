/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  target: 'serverless',
  serverRuntimeConfig: {
    PROJECT_ROOT: process.cwd(),
  },
  experimental: {
    nftTracing: true,
  },
};

module.exports = nextConfig;
