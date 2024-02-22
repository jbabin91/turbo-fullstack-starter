import { QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { useState } from 'react';
import SuperJSON from 'superjson';

import { queryClient as QueryClient } from '../libs/react-query';
import { trpc } from '../libs/trpc';

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => QueryClient);

  console.log('MODE', import.meta.env.MODE);
  console.log('API_URL', import.meta.env.VITE_API_URL);

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            import.meta.env.MODE === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          headers() {
            const headers = new Headers();
            headers.set('x-trpc-source', 'react');
            return headers;
          },
          transformer: SuperJSON,
          url: `${import.meta.env.VITE_API_URL}/trpc`,
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
