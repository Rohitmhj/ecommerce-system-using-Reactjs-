import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { react: pluginReact },
    extends: ["js/recommended"],
  },

  pluginReact.configs.flat.recommended,

  {
    rules: {
      "react/prop-types": "off",
    },
  },
]);
