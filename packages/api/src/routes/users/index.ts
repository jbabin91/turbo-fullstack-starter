import { publicProcedure, router } from '../../trpc';

export const usersRouter = router({
  example: publicProcedure.query(() => {
    return { message: 'Hello world' };
  }),
});
