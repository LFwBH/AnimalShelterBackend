module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "../tsconfig.json",
    sourceType: "module",
  },
  extends: ["../.eslintrc.js"],
  rules: {
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
