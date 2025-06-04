module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "linebreak-style": 0,
    "comma-spacing": ["error", { "before": false, "after": true }],
    "semi": ["error", "always"],
    "padded-blocks": ["error", "never"],
    "spaced-comment": ["error", "always"]
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
