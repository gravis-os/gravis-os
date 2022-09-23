const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const shouldAnalyzeBundle = process.env.ANALYZE === 'true'

const withTM = require('next-transpile-modules')([
  '@gravis-os/ui',
  '@gravis-os/web',
  '@gravis-os/form',
  '@gravis-os/auth',
  '@gravis-os/storage',
  '@gravis-os/utils',
])

const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'source.unsplash.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})

module.exports = shouldAnalyzeBundle
  ? withBundleAnalyzer(nextConfig)
  : nextConfig
