import type { Config } from 'drizzle-kit';

export default {
  breakpoints: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
  driver: 'pg',
  out: './drizzle',
  schema: './src/schema/index.ts',
} satisfies Config;
