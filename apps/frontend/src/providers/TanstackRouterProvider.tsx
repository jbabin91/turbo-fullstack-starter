import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from '@/routeTree.gen';

import { useAuth } from './AuthProvider';

const router = createRouter({
  context: {
    auth: undefined!,
  },
  defaultPreload: 'intent',
  routeTree,
});

export function TanstackRouterProvider() {
  const auth = useAuth();
  return <RouterProvider context={{ auth }} router={router} />;
}

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}
