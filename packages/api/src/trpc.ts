import { lucia } from '@repo/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import SuperJSON from 'superjson';
import { ZodError } from 'zod';

import { getCookies } from './utils/cookies';

/**
 * 1. CONTEXT
 *
 * This section defined the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generated the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the reqired context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const cookieHeader = getCookies(opts.req);
  const sessionId = lucia.readSessionCookie(cookieHeader ?? '');

  if (!sessionId) {
    console.log('>>> tRPC Lucia session not found');
  }

  const luciaSession = await lucia.validateSession(sessionId ?? '');
  const source = opts.req.headers.get('x-trpc-source') ?? 'unknown';

  console.log(
    '>>> tRPC Request from',
    source,
    'by',
    luciaSession.session?.userId,
  );

  return {
    ...opts,
    session: luciaSession,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and transformer
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
  transformer: SuperJSON,
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the src/routes folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const router = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API.
 * It does not guarantee that a user querying is authorized, but you can still access
 * user session data if they are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedure
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
