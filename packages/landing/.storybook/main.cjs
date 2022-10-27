const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  core: { builder: 'webpack5' },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-addon-next', 'storybook-dark-mode'],
  // For MUI theming to work in Storybook
  features: { emotionAlias: false },
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    // ==============================
    // Add Svg Support
    // ==============================
    const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // ==============================
    // Add Typescript support
    // ==============================
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json')
      }),
    ];

    // ==============================
    // Add ESM Support
    // @link https://stackoverflow.com/questions/69427025/programmatic-webpack-jest-esm-cant-resolve-module-without-js-file-exten
    // ==============================
    config.module.rules.push({
      test: /\.m?js/,
      resolve: { fullySpecified: false },
    });

    return config
  },
  // For MSW public directory and fonts
  staticDirs: ['../public'],
}
