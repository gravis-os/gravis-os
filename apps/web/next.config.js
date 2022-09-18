const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const shouldAnalyzeBundle = process.env.ANALYZE === 'true'

const nextConfig = {
  reactStrictMode: true,
}

module.exports = shouldAnalyzeBundle
  ? withBundleAnalyzer(nextConfig)
  : nextConfig
