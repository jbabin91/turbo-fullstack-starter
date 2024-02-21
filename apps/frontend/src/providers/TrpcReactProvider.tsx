import { QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { useState } from 'react';
import SuperJSON from 'superjson';

import { queryClient as QueryClient } from '../libs/react-query';
import { getBaseUrl, trpc } from '../libs/trpc';

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => QueryClient);

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          headers() {
            const headers = new Headers();
            headers.set('x-trpc-source', 'react');
            return headers;
          },
          transformer: SuperJSON,
          url: getBaseUrl(),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
