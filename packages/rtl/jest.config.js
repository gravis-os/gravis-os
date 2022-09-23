const esModules = ['jose', '@supabase'].join('|')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [`../../node_modules/(?!${esModules})`],
  setupFilesAfterEnv: ['../../node_modules/@gravis-os/rtl/setup-jest.js'],
}
