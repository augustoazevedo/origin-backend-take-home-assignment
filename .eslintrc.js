module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:markdown/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ['@typescript-eslint', 'markdown'],
  rules: {
    'no-console': 2,
    '@typescript-eslint/no-explicit-any': 2,
  },
  overrides: [
    {
      files: ['*.schema.ts', '*.interface.ts'],
      rules: {
        camelcase: 'off',
        '@typescript-eslint/camelcase': 'off',
      },
    },
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
  ],
};
