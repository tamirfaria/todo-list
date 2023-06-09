module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
    "cypress/globals": true,
  },
  plugins: ["react", "cypress", "prettier", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:cypress/recommended",
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
    "no-unused-expressions": 0,
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error",
  },
};
