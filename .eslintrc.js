module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["react", "prettier", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/"],
  rules: {
    "react/no-unknown-property": [
      "error",
      { ignore: ["css", "jsx", "global"] },
    ],
    "react/react-in-jsx-scope": 0,
  },
};
