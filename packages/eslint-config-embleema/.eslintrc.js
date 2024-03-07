module.exports = {
  extends: ['./js.eslintrc.js', './ts.eslintrc.js'],
  ignorePatterns: ['!**/*'],
  parserOptions: {
    project: './tsconfig.build.json',
  },
};
