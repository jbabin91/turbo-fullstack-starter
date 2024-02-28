import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Suspense } from 'react';

import { Spinner } from '@/components';
import { routeTree } from '@/routeTree.gen';

import { TRPCReactProvider } from './TrpcReactProvider';

const router = createRouter({
  defaultPreload: 'intent',
  routeTree,
});

export function Providers() {
  return (
    <Suspense fallback={<Spinner />}>
      <TRPCReactProvider>
        <RouterProvider router={router} />
      </TRPCReactProvider>
    </Suspense>
  );
}

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}
