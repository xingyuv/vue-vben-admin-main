import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import { typescript, tsParser, tsPlugin } from './typescript';
import { GLOB_EXCLUDE, GLOB_VUE } from './constants';
import type { FlatESLintConfigItem, Rules } from 'eslint-define-config';

export { vueParser, vuePlugin };

export const reactivityTransform: FlatESLintConfigItem[] = [
  {
    languageOptions: {
      globals: {
        $: 'readonly',
        $$: 'readonly',
        $ref: 'readonly',
        $computed: 'readonly',
        $shallowRef: 'readonly',
        $toRef: 'readonly',
        $customRef: 'readonly',
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      'vue/no-setup-props-destructure': 'off',
    },
  },
];

const vueCustomRules: Rules = {
  'vue/script-setup-uses-vars': 'error',
  'vue/no-reserved-component-names': 'off',
  'vue/custom-event-name-casing': 'off',
  'vue/attributes-order': 'off',
  'vue/one-component-per-file': 'off',
  'vue/html-closing-bracket-newline': 'off',
  'vue/max-attributes-per-line': 'off',
  'vue/multiline-html-element-content-newline': 'off',
  'vue/singleline-html-element-content-newline': 'off',
  'vue/attribute-hyphenation': 'off',
  'vue/require-default-prop': 'off',
  'vue/require-explicit-emits': 'off',
  'vue/html-self-closing': [
    'error',
    {
      html: {
        void: 'always',
        normal: 'never',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    },
  ],
  'vue/multi-word-component-names': 'off',
};

const vue3Rules: Rules = {
  ...vuePlugin.configs.base.rules,
  ...vuePlugin.configs['vue3-essential'].rules,
  ...vuePlugin.configs['vue3-strongly-recommended'].rules,
  ...vuePlugin.configs['vue3-recommended'].rules,
};

function getVueConfig(vueVersionRules: Rules) {
  const vueRules: FlatESLintConfigItem[] = [
    {
      files: [GLOB_VUE],
      plugins: {
        vue: vuePlugin,
        '@typescript-eslint': tsPlugin,
      },
      languageOptions: {
        ecmaVersion: 'latest',
        parser: vueParser,
        parserOptions: {
          parser: tsParser,
          ecmaVersion: 2020,
          sourceType: 'module',
          jsxPragma: 'React',
          project: './tsconfig.*?.json',
          createDefaultProgram: false,
          extraFileExtensions: ['.vue'],
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      processor: vuePlugin.processors['.vue'],
      rules: {
        ...typescript[0].rules,
      },
      ignores: [...GLOB_EXCLUDE],
    },
    {
      plugins: {
        vue: vuePlugin,
      },
      rules: {
        ...vueVersionRules,
        ...vueCustomRules,
      },
      ignores: [...GLOB_EXCLUDE],
    },
    ...reactivityTransform,
  ];

  return vueRules;
}

export const vue = getVueConfig(vue3Rules);
