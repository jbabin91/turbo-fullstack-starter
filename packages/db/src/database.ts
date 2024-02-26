import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

if (!('DATABASE_URL' in process.env)) {
  throw new Error('DATABASE_URL is not defined.');
}

const connectionString = process.env.DATABASE_URL ?? '';
console.log('drizzle connectionString:', connectionString);

const client = postgres(connectionString);

export const db = drizzle(client, { schema });
