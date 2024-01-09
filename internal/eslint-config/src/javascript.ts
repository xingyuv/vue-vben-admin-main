import globals from 'globals';
import jsConfig from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from './constants';
import type { FlatESLintConfigItem } from 'eslint-define-config';

export { importPlugin };

export const js: FlatESLintConfigItem[] = [
  jsConfig.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'off',
      'no-case-declarations': 'off',
      'no-use-before-define': 'off',
      'space-before-function-paren': 'off',
    },
  },
  {
    files: ['**/scripts/*', '**/cli.*'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.{test,spec}.js?(x)'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },
];

export const jsx: FlatESLintConfigItem[] = [
  {
    files: ['**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];

export const imports: FlatESLintConfigItem[] = [
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.mjs', '.ts', '.mts', '.d.ts'] },
      },
    },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
  {
    files: [
      `**/*config*.${GLOB_SRC_EXT}`,
      `**/views/${GLOB_SRC}`,
      `**/pages/${GLOB_SRC}`,
      `**/{index,vite,esbuild,rollup,webpack,rspack}.ts`,
      '**/*.d.ts',
      `${GLOB_MARKDOWN}/**`,
    ],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
