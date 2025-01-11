import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },

  {
    ignores: ["node_modules", "dist"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "object-curly-newline": [
        "error",
        {
          multiline: true, // Only enforce newlines for multiline objects
          consistent: true, // Ensure consistency
          minProperties: 0 // Allow single-line objects regardless of the number of properties
        }
      ],

      "prettier/prettier": [
        "error",
        {
          trailingComma: "none",
          semi: true,
          bracketSpacing: true,
          printWidth: 80
        }
      ]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended
];
