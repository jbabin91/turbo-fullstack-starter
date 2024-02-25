import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Suspense } from 'react';

import { routeTree } from '@/routeTree.gen';

import { TRPCReactProvider } from './TrpcReactProvider';

// Setup a Router instance
const router = createRouter({
  defaultPreload: 'intent',
  routeTree,
});

export function Providers() {
  return (
    <Suspense fallback="loading...">
      <TRPCReactProvider>
        <RouterProvider router={router} />
      </TRPCReactProvider>
    </Suspense>
  );
}

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
