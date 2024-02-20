import { type AnyTRPCRouter } from '@trpc/server';
import {
  type FetchHandlerRequestOptions,
  fetchRequestHandler,
} from '@trpc/server/adapters/fetch';
import { type MiddlewareHandler } from 'hono';

type tRPCOptions = Omit<
  FetchHandlerRequestOptions<AnyTRPCRouter>,
  'req' | 'endpoint'
> &
  Partial<Pick<FetchHandlerRequestOptions<AnyTRPCRouter>, 'endpoint'>>;

export const trpcServer = ({
  endpoint = '/trpc',
  ...rest
}: tRPCOptions): MiddlewareHandler => {
  return async (c) => {
    const res = fetchRequestHandler({
      ...rest,
      endpoint,
      req: c.req.raw,
    });
    return res;
  };
};
