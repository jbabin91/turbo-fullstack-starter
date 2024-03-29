import { serve } from '@hono/node-server';
import { appRouter, createTRPCContext } from '@repo/api';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { trpcServer } from './middleware/trpc-server';

const app = new Hono();

app.use(logger());

app.use(
  '*',
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://tfs.jacebabin.com',
      'https://tfs-frontend.pages.dev',
      'https://*.tfs-frontend.pages.dev',
    ],
  }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.use(
  '/trpc/*',
  trpcServer({
    createContext: createTRPCContext,
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
    router: appRouter,
  }),
);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT ?? 8080),
});
