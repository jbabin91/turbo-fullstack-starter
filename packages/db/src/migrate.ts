/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable unicorn/no-process-exit */
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { db } from './database';

migrate(db, { migrationsFolder: 'drizzle' })
  .then(() => {
    console.log('migrations finished!');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
