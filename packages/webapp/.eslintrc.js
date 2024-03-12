module.exports = {
  extends: ['embleema/ts', 'plugin:react-hooks/recommended'],
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['**/*.tsx', '**/*.cy.{js,ts}', 'vite.config.ts', 'cypress/**/*'],
      plugins: ['jest'],
      rules: {
        'import/extensions': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'max-lines-per-function': 'off',
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*.e2e.ts'],
      rules: {
        'jest/expect-expect': 'off',
      },
    },
  ],
};
