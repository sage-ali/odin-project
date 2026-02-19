import js from "@eslint/js";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import prettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  js.configs.recommended,
  ...compat.extends("eslint-config-airbnb-base"),
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        vitest: true,
      },
    },
    plugins: {
      security,
      sonarjs,
    },
    rules: {
      ...security.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      "no-console": "warn",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "import/no-unresolved": "off",
      "import/extensions": ["error", "ignorePackages", { js: "always" }],
      "no-underscore-dangle": ["error", { allow: ["__filename", "__dirname"] }],
      "security/detect-object-injection": "off",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  prettier,
];
