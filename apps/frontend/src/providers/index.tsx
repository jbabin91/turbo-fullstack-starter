import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from '../routeTree.gen';
import { TRPCReactProvider } from './TrpcReactProvider';

const router = createRouter({
  defaultPreload: 'intent',
  routeTree,
});

export function Providers() {
  return (
    <TRPCReactProvider>
      <RouterProvider router={router} />
    </TRPCReactProvider>
  );
}

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}
