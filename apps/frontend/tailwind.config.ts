import baseConfig from '@repo/tailwind-config/base';
import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [...baseConfig.content, '../../packages/ui/**/*.{ts,tsx}'],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
    },
  },
} satisfies Config;
