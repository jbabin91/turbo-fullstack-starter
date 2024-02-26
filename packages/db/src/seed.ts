import { faker } from '@faker-js/faker';

import { db } from '.';
import { posts, type users } from './schema';

if (!('DATABASE_URL' in process.env)) {
  throw new Error('DATABASE_URL is not defined.');
}

const main = async () => {
  const userData: (typeof users.$inferInsert)[] = [];
  const postData: (typeof posts.$inferInsert)[] = [];

  for (let i = 0; i < 20; i++) {
    userData.push({
      name: faker.person.fullName(),
    });
  }

  for (let i = 0; i < 20; i++) {
    postData.push({
      content: faker.lorem.paragraphs({ max: 10, min: 2 }),
      title: faker.lorem.word({ length: { max: 5, min: 2 } }),
      userId: i + 1,
    });
  }

  console.log('Seed start');
  // await db.insert(users).values(userData);
  await db.insert(posts).values(postData);
  console.log('Seed done');
};

void main();
