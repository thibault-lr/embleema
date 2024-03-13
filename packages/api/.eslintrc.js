module.exports = {
  extends: 'embleema/ts',
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['scripts/*.ts', 'test/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
};
