module.exports = {
  root: true,
  extends: ['@gravis-os/eslint-config'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json'] },
}
