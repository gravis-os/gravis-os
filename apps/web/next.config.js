const withTM = require('next-transpile-modules')([
  '@gravis-os/auth',
  '@gravis-os/form',
  '@gravis-os/storage',
  '@gravis-os/ui',
  '@gravis-os/utils',
])

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const shouldAnalyzeBundle = process.env.ANALYZE === 'true'

const nextConfig = withTM({
  reactStrictMode: true,
})

module.exports = shouldAnalyzeBundle
  ? withBundleAnalyzer(nextConfig)
  : nextConfig
