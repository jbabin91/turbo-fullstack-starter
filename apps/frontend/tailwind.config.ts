import baseConfig from '@repo/tailwind-config/base';
import { type Config } from 'tailwindcss';

export default {
  content: [...baseConfig.content, '../../packages/ui/**/*.{ts,tsx}'],
  presets: [baseConfig],
} satisfies Config;
