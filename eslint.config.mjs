import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import stylisticPlugin from "@stylistic/eslint-plugin";
import reactQueryPlugin from "@tanstack/eslint-plugin-query";
import importXPlugin from "eslint-plugin-import-x";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import readableTailwindPlugin from "eslint-plugin-readable-tailwind";
import importSortPlugin from "eslint-plugin-simple-import-sort";
import globals from "globals";
import ts from "typescript-eslint";

// @ts-check
export default ts.config(
  // Shared Config
  js.configs.recommended,
  ...ts.configs.recommended,
  importXPlugin.flatConfigs.recommended,
  importXPlugin.flatConfigs.typescript,
  ...reactQueryPlugin.configs["flat/recommended"],

  // A11Y for Components
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...jsxA11yPlugin.flatConfigs.recommended.rules,

      // <img> 엘리먼트에 유의미한 대체 텍스트가 있는지 체크합니다.
      "jsx-a11y/alt-text": [
        "warn",
        {
          elements: ["img"],
        },
      ],

      // 유효한 aria-* 속성만 사용합니다.
      "jsx-a11y/aria-props": "warn",

      // 유효한 aria-* 상태/값만 사용합니다.
      "jsx-a11y/aria-proptypes": "warn",

      // DOM에서 지원되는 role, ARIA만 사용합니다.
      "jsx-a11y/aria-unsupported-elements": "warn",

      // 필수 ARIA 속성이 빠져있는지 체크합니다.
      "jsx-a11y/role-has-required-aria-props": "warn",

      // ARIA 속성은 지원되는 role에서만 사용합니다.
      "jsx-a11y/role-supports-aria-props": "warn",
    },
  },

  // React Config
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-refresh": reactRefreshPlugin,
      "react-hooks": fixupPluginRules(reactHooksPlugin),
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...reactRefreshPlugin.configs.recommended.rules,

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // Ignore
  {
    ignores: ["node_modules/**", "build/**", "*.config.mjs"],
  },

  // Linter
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "readable-tailwind": readableTailwindPlugin,
    },
    languageOptions: {
      parser: ts.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser },
    },
    rules: {
      "import-x/no-dynamic-require": "warn",
      "react-refresh/only-export-components": "off",
      "import-x/no-nodejs-modules": "off",

      ...readableTailwindPlugin.configs.warning.rules,
      ...readableTailwindPlugin.configs.error.rules,
      "readable-tailwind/multiline": ["warn", { printWidth: 80 }],
    },
  },

  // Formatter
  {
    plugins: {
      "@stylistic": stylisticPlugin,
      "simple-import-sort": importSortPlugin,
    },
    rules: {
      // Tab이 차지하는 공백을 2칸으로 지정합니다.
      "@stylistic/indent": ["error", 2],

      // Arrow Function의 Parameter에 괄호를 의무적으로 씌울 지 결정합니다.
      "@stylistic/arrow-parens": ["error", "always"],

      // 세미콜론을 강제합니다.
      "@stylistic/semi": ["error", "always"],

      // 한 줄의 최대 길이를 80글자로 지정합니다.
      "@stylistic/max-len": ["error", { code: 80, tabWidth: 2 }],

      // 쉼표를 마지막 Property에도 표기합니다. 한 줄로 구성된 경우에는 적용되지 않습니다.
      "@stylistic/comma-dangle": ["error", "always-multiline"],

      // 작은 따옴표를 사용하지 않고 큰 따옴표로 통일합니다.
      "@stylistic/quotes": [
        "error",
        "double",
        {
          // Template Literal 문자열은 허용합니다. (백틱도 사용 가능)
          allowTemplateLiterals: true,
        },
      ],

      // import 또는 export 순서를 알아서 정렬합니다.
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
);
