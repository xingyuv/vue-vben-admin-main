import { defineFlatConfig, prettier, vue } from '@vben/eslint-config';

export default defineFlatConfig([...prettier, ...vue]);
