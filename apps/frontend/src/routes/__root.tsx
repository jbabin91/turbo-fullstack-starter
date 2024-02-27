import { TailwindIndicator } from '@repo/ui';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Header, TanstackRouterDevtools } from '../components';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Header />
      <main className="relative isolate overflow-hidden pt-16">
        <Outlet />
      </main>
      <TanstackRouterDevtools position="bottom-left" />
      <TailwindIndicator />
    </>
  );
}
