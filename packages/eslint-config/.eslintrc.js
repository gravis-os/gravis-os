module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    // Style
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // Security
    'plugin:security/recommended',
    'plugin:no-unsanitized/DOM',
    // Style
    'plugin:unicorn/recommended',
    'plugin:fp/recommended',
    'plugin:promise/recommended',
    'plugin:perfectionist/recommended-natural',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    'react',
    'prettier',
    'import',
    '@typescript-eslint',
    'jest',
    'testing-library',
    'unused-imports',
    'no-secrets',
    'fp',
    'write-good-comments',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    // TypeScript
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 1,
    // allow vars to specify _ for unused
    '@typescript-eslint/no-unused-vars': [1, { varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': 1,
    'arrow-body-style': 0,
    camelcase: 0,
    'consistent-return': 1,
    'fp/no-mutating-methods': [
      2,
      {
        allowedObjects: ['router'],
      },
    ],
    'fp/no-mutation': [
      2,
      {
        commonjs: true,
        exceptions: [{ property: 'args' }, { property: 'argTypes' }],
      },
    ],
    'fp/no-nil': 1,
    'fp/no-rest-parameters': 0,
    'fp/no-throw': 1,
    'fp/no-unused-expression': 0,
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
    'import/no-extraneous-dependencies': 0,
    // @issue https://github.com/microsoft/TypeScript/issues/43133
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '^@gravis-os/apps/*',
          '^@gravis-os/stripe/server',
          '^@gravis-os/auth-server/server',
          '^@gravis-os/landing/server',
          '^@gravis-os/utils/edge',
          '^@gravis-os/saas/middleware',
        ],
      },
    ],
    // Import-order
    'import/order': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/alt-text': 0,
    // a11y
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-associated-control': 1,
    'no-case-declarations': 0,
    'no-nested-ternary': 1,
    'no-restricted-imports': [
      2,
      {
        paths: [
          {
            message: 'Import [module] from lodash/[module] instead',
            name: 'lodash',
          },
          {
            message: 'Import [icon] from @mui/icons-material/[icon] instead',
            name: '@mui/icons-material',
          },
        ],
      },
    ],
    'no-restricted-syntax': 0,
    // Security
    'no-secrets/no-secrets': [2, { tolerance: 5 }],
    'no-shadow': 0,
    'no-unreachable': 2,
    // Unused imports
    'no-unused-vars': 'off',
    'no-use-before-define': 0,
    'no-useless-rename': 2,
    'no-useless-return': 0,
    // Perfectionist
    'perfectionist/sort-imports': [
      2,
      {
        'custom-groups': {
          type: {
            react: 'react',
          },
          value: {
            react: ['react', 'react-*'],
          },
        },
        groups: [
          'type',
          'react',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'side-effect',
          'style',
          'object',
          'unknown',
        ],
      },
    ],
    'perfectionist/sort-objects': [
      2,
      {
        'custom-groups': {
          id: 'id',
          title: 'title',
          slug: 'slug',
          xs: 'xs',
          sm: 'sm',
          md: 'md',
          lg: 'lg',
          xl: 'xl',
          xxl: 'xxl',
        },
        groups: ['id', 'title', 'slug', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      },
    ],
    'prefer-const': 2,
    // prettier
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
      },
    ],
    // Fixes an open TS issue from using typesVersions
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 1,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/jsx-no-duplicate-props': [2, { ignoreCase: false }],
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'react/no-unescaped-entities': 1,
    'react/prop-types': ['off', {}],
    // React
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    // Unicorn
    'unicorn/consistent-destructuring': 1,
    'unicorn/explicit-length-check': 1,
    'unicorn/filename-case': 0,
    'unicorn/no-array-reduce': 0,
    'unicorn/no-null': 1,
    'unicorn/no-useless-switch-case': 0,
    'unicorn/prefer-module': 1,
    'unicorn/prefer-spread': 1,
    'unicorn/prevent-abbreviations': 0,
    // Unused-imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
    'write-good-comments/write-good-comments': 1,
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
}
