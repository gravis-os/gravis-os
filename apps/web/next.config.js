const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const shouldAnalyzeBundle = process.env.ANALYZE === 'true'

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'source.unsplash.com'],
  },
}

module.exports = shouldAnalyzeBundle
  ? withBundleAnalyzer(nextConfig)
  : nextConfig
