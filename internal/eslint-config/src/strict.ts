import tsPlugin from '@typescript-eslint/eslint-plugin';
// import simpleImportSortPlugin from "eslint-plugin-simple-import-sort"
import { GLOB_EXCLUDE } from './constants';
import type { FlatESLintConfigItem } from 'eslint-define-config';

// export { simpleImportSortPlugin }

export const strict: FlatESLintConfigItem[] = [
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      // 'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      // 'simple-import-sort/imports': 'error',
      // 'simple-import-sort/exports': 'error',

      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          'ts-check': false,
        },
      ],

      /**
       * 【强制】关键字前后有一个空格
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
       */
      'keyword-spacing': 'off',
      '@typescript-eslint/keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
          overrides: {
            return: { after: true },
            throw: { after: true },
            case: { after: true },
          },
        },
      ],

      /**
       * 禁止出现空函数，普通函数（非 async/await/generator）、箭头函数、类上的方法除外
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
       */
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],

      /**
       * 优先使用 interface 而不是 type 定义对象类型
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
       */
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],

      'vue/attributes-order': 'error',
      'vue/require-default-prop': 'error',
    },
    ignores: [...GLOB_EXCLUDE],
  },
];
