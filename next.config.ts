import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Enable experimental features for Next.js 15
  experimental: {
    ppr: false, // Partial Pre-rendering (optional)
    reactCompiler: false, // React Compiler (optional)
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Improved caching
  // cacheHandler: process.env.NODE_ENV === 'production' 
  //   ? require.resolve('./cache-handler.js') 
  //   : undefined,
  // cacheMaxMemorySize: 0, // disable default in-memory caching
}

module.exports = nextConfig