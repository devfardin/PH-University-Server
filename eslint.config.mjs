import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended  from "eslint-plugin-prettier/recommended"

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Include all desired file types
    languageOptions: { globals: globals.node },
    ignores: ["node_modules", "dist/*"], // Move ignores to the top-level config
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef":"error"
    },
    // "globals":{
    //   "process":"readonly"
    // }
  },
  eslintPluginPrettierRecommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
