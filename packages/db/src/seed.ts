/* eslint-disable unicorn/no-process-exit */
import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';
import { count, sql } from 'drizzle-orm';

import { db } from './database';
import { posts, users } from './schema';

if (!('DATABASE_URL' in process.env)) {
  throw new Error('DATABASE_URL is not defined.');
}

const main = async () => {
  const userData: (typeof users.$inferInsert)[] = [];
  const postData: (typeof posts.$inferInsert)[] = [];

  const countUsers = await db
    .select({
      usersCount: sql<number>`cast(${count(users.id)} as int)`,
    })
    .from(users);

  const countPosts = await db
    .select({
      postsCount: sql<number>`cast(${count(posts.id)} as int)`,
    })
    .from(posts);

  if (
    countUsers[0] &&
    countUsers[0]?.usersCount > 0 &&
    countPosts[0] &&
    countPosts[0]?.postsCount > 0
  ) {
    throw new Error('Database already seeded.');
  }

  for (let i = 0; i < 20; i++) {
    userData.push({
      email: faker.internet.email(),
      id: createId(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    });
  }

  for (let i = 0; i < 20; i++) {
    postData.push({
      content: faker.lorem.paragraphs({ max: 10, min: 2 }),
      title: faker.lorem.word({ length: { max: 5, min: 2 } }),
      userId: userData[i]?.id ?? createId(),
    });
  }

  console.log('Seed start');
  await db.insert(users).values(userData);
  await db.insert(posts).values(postData);
  console.log('Seed done');
};

await main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
