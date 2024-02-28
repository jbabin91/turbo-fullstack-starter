/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable unicorn/no-process-exit */
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL ?? '';

const migrationClient = postgres(connectionString, { max: 1 });

migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' })
  .then(() => {
    console.log('migrations finished!');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
