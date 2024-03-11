

module.exports = {
  extends: ['./js.eslintrc.js'],
  ignorePatterns: ['dist', 'node_modules'],
  overrides: [
    {
      extends: ['airbnb-typescript/base', 'plugin:jest/recommended'],
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
    },
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    'import/no-default-export': 'error',
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  },
  parserOptions: {
    ecmaVersion: 2021,
    project: './tsconfig.*?.json',
  },
};
