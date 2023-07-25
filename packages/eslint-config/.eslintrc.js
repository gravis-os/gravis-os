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
    camelcase: 0,
    'arrow-body-style': 0,
    'no-shadow': 0,
    'no-case-declarations': 0,
    'no-use-before-define': 0,
    'no-nested-ternary': 1,
    'no-useless-return': 0,
    'prefer-const': 2,
    'no-unreachable': 2,
    'no-useless-rename': 2,
    'no-magic-numbers': 1,
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
    '@typescript-eslint/no-explicit-any': 1,
    // allow vars to specify _ for unused
    '@typescript-eslint/no-unused-vars': [1, { varsIgnorePattern: '^_' }],
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/no-use-before-define': 1,
    // @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
    '@typescript-eslint/naming-convention': [
      1,
      {
        selector: 'variable',
        format: ['strictCamelCase', 'snake_case', 'UPPER_CASE'],
      },
      // Valid boolean prefixes
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      // Valid function prefixes
      {
        selector: 'function',
        prefix: [
          // For react render functions
          'render',
          // For data-fetching functions
          'fetch',
          'refetch',
          // For data-dispatch functions
          'send',
          // For data-massaging functions e.g. 'generate', 'transform'
          'get',
          // For data-validation functions
          'validate',
          // For event handlers
          'on',
          'handle',
          // For setting states
          'set',
          // For formatting functions e.g. 'format', 'parse', 'clean'
          'print',
          // For plugin functions
          'with',
          // For factory functions
          'make',
          // For classes
          'init',
          // For crud functions
          'create',
          'update',
          'delete',
          // For rows
          'add',
          'remove',
          'reset',
          'append',
          'prepend',
          // For dialogs
          'toggle',
          'open',
          'close',
          'show',
          'hide',
        ],
        format: ['PascalCase'],
        // Only apply to functions in camelCases to exclude React Components which are in PascalCase.
        filter: {
          regex: '^[a-z][a-zA-Z0-9]*$',
          match: true,
        },
      },
      // Ensure all types are PascalCase
      {
        selector: 'interface',
        format: ['StrictPascalCase'],
      },
      // Add suffix to enums
      {
        selector: 'enum',
        format: ['UPPER_CASE'],
        suffix: ['Enum'],
      },
      // Ignore destructured variables
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
    ],
    // a11y
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/label-has-associated-control': 1,
    // React
    'react/react-in-jsx-scope': 0,
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
          '^@gravis-os/landing/*',
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
