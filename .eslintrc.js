module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "@typescript-eslint/eslint-plugin",
    "prettier",
    "simple-import-sort",
    "import",
    "unicorn",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:unicorn/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "unicorn/no-static-only-class": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "sort-imports": "off",
    "import/first": "error",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-array-reduce": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-null": "off",
    "unicorn/no-process-exit": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowHigherOrderFunctions: true },
    ],
  },
};
