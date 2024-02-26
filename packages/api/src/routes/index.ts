import { publicProcedure, router } from '../trpc';
import { postsRouter } from './posts';
import { usersRouter } from './users';

export const appRouter = router({
  example: publicProcedure.query(() => {
    return { message: 'Hello world' };
  }),
  posts: postsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
