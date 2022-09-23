const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const shouldAnalyzeBundle = process.env.ANALYZE === 'true'

const nextConfig = {
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
}

module.exports = shouldAnalyzeBundle
  ? withBundleAnalyzer(nextConfig)
  : nextConfig
