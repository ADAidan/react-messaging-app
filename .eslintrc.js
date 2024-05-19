module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vitest"],
  globals: {
    describe: "readonly",
    it: "readonly",
    expect: "readonly",
    test: "readonly",
    beforeEach: "readonly",
    afterEach: "readonly",
  },
  rules: {},
};
