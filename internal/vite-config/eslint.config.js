import { defineConfig, prettier, vue } from '@vben/eslint-config';

export default defineConfig([
  ...prettier,
  ...vue,
  {
    ignores: ['dist', 'lib', 'types', 'test'],
  },
])
