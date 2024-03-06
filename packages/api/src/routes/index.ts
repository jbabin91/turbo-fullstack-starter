import type { inferReactQueryProcedureOptions } from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { publicProcedure, router } from '../trpc';
import { authRouter } from './auth';
import { postsRouter } from './posts';
import { usersRouter } from './users';

export const appRouter = router({
  auth: authRouter,
  example: publicProcedure.query(() => {
    return { message: 'Hello world' };
  }),
  posts: postsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
