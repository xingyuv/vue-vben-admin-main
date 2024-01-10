import { name } from './package.json';
import { resolve } from 'node:path';
import { os } from 'node:os';

export default {
  apps: [
    {
      name,
      script: resolve(__dirname, './dist/index.js'),
      instances: os.cpus().length,
      autorestart: true,
      watch: true,
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
  ],
};
