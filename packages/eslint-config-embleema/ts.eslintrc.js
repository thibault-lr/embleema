

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
  parserOptions: {
    ecmaVersion: 2021,
    project: './tsconfig.*?.json',
  },
};
