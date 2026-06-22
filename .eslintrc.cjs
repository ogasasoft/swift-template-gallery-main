module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'prefer-const': 'error',

    // TypeScript
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/ban-ts-comment': ['warn', {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description',
      'ts-nocheck': 'allow-with-description',
    }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',

    // Storybook
    'no-unused-vars': 'off',

    // React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-key': 'warn',
    'react/jsx-uses-react': 'off',
    'react/jsx-no-undef': 'error',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-max-props-per-line': ['warn', { 'when': 'multiline' }],
    'react/jsx-pascal-case': 'warn',
    'react/no-direct-mutation-state': 'error',
    'react/no-unescaped-entities': 'warn',

    // React Performance
    'react-hooks/exhaustive-deps': ['warn', {
      additionalHooks: '(useCustomHook|useEffectOnce)',
    }],

    // Import
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    }],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'warn',

    // Style
    'no-nested-ternary': 'warn',
    'prefer-template': 'error',
    'sort-vars': 'warn',
    'space-before-blocks': 'error',
  },
  ignorePatterns: ['dist', 'build', 'node_modules', '**/*.config.ts', '**/*.config.js', '**/*.config.mjs', '.storybook/**'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
