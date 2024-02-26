import { db, posts } from '@repo/db';

import { publicProcedure, router } from '../../trpc';

export const postsRouter = router({
  list: publicProcedure.query(() => {
    const data = db.select().from(posts);
    return data;
  }),
});
