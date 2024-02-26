import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

const url = process.env.TURSO_URL ?? '';
const authToken = process.env.TURSO_AUTH_TOKEN ?? '';
console.log('drizzle URL:', url);
console.log('drizzle authToken:', authToken);

const client = createClient({
  authToken,
  url,
});

export const db = drizzle(client, { schema });
