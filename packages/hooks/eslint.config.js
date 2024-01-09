import { defineFlatConfig, strict, prettier, vue } from '@vben/eslint-config';

export default defineFlatConfig([
  ...prettier,
  ...vue,
  ...strict,
  {
    ignores: ['dist', 'lib', 'types', 'test'],
  },
]);
