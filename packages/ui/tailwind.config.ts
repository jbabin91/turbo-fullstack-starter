import baseConfig from '@repo/tailwind-config/base';
import { type Config } from 'tailwindcss';

export default {
  content: ['src/**/*.tsx'],
  presets: [baseConfig],
} satisfies Config;
