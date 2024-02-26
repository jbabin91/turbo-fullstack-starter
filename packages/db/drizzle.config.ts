import type { Config } from 'drizzle-kit';

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

export default {
  breakpoints: true,
  dbCredentials: {
    authToken: process.env.TURSO_AUTH_TOKEN ?? '',
    url: process.env.TURSO_URL ?? '',
  },
  driver: 'turso',
  out: './drizzle',
  schema: './src/schema.ts',
} satisfies Config;
