/* eslint-disable sort-keys */

module.exports = {
  root: true,
  ignorePatterns: ['**/*'],
  extends: ['airbnb-base', 'prettier'],
  plugins: ['simple-import-sort'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'class-methods-use-this': 'off',
    complexity: ['error', { max: 10 }],
    'import/prefer-default-export': 'off',
    'no-console': 'error',
    'import/extensions': 'off',
    'simple-import-sort/exports': 'error',
    curly: ['error', 'all'],
  }
};
