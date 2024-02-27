import { db, posts } from '@repo/db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { publicProcedure, router } from '../../trpc';

export const postsRouter = router({
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const post = await db.query.posts.findFirst({
        where: eq(posts.id, input.id),
      });
      return post;
    }),
  list: publicProcedure.query(() => {
    const data = db.select().from(posts);
    return data;
  }),
});
