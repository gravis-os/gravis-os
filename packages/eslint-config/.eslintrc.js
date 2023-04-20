module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: [
    'react',
    'import',
    'prettier',
    '@typescript-eslint',
    'jest',
    'testing-library',
    'unused-imports',
  ],
  rules: {
    // Javascript
    'arrow-body-style': 0,
    'no-shadow': 0,
    'no-case-declarations': 0,
    'no-use-before-define': 0,
    'no-nested-ternary': 1,
    'no-useless-return': 0,
    camelcase: 0,
    'consistent-return': 1,
    // prettier
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
      },
    ],
    // TypeScript
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/no-use-before-define': 1,
    // a11y
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/alt-text': 0,
    // React
    'react/no-unescaped-entities': 1,
    'react/require-default-props': 0,
    'react/prop-types': ['off', {}],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 1,
    // import
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    // Fixes an open TS issue from using typesVersions
    // @issue https://github.com/microsoft/TypeScript/issues/43133
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '^@gravis-os/apps/*',
          '^@gravis-os/stripe/*',
          '^@gravis-os/auth-server/*',
        ],
      },
    ],
    // Unused imports
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
}
