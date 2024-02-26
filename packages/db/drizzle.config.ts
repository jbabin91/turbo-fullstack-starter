import type { Config } from 'drizzle-kit';

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

export default {
  breakpoints: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
  driver: 'pg',
  out: './drizzle',
  schema: './src/schema.ts',
  strict: true,
} satisfies Config;
