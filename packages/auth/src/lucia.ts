import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db, sessions, type User, users } from '@repo/db';
import { env } from '@repo/env';
import { Lucia } from 'lucia';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      name: attributes.name,
      username: attributes.username,
    };
  },
  sessionCookie: {
    attributes: {
      secure: env.PROD,
    },
  },
});

declare module 'lucia' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<User, 'id'>;
  }
}
