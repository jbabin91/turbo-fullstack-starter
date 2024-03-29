import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { useState } from 'react';
import SuperJSON from 'superjson';

import { TanStackQueryDevtools } from '@/components';
import { env, siteConfigs } from '@/configs';
import { queryClient as QueryClient, trpc } from '@/libs';

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => QueryClient);
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            env.DEV || (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchLink({
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
          headers() {
            const headers = new Headers();
            headers.set(
              'x-trpc-source',
              siteConfigs.name.toLowerCase().replaceAll(' ', '-'),
            );
            return headers;
          },
          transformer: SuperJSON,
          url: `${env.VITE_API_URL}/trpc`,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
        <TanStackQueryDevtools initialIsOpen={false} />
      </trpc.Provider>
    </QueryClientProvider>
  );
}
