import { TailwindIndicator } from '@repo/ui';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Header, TanStackRouterDevtools } from '@/components';

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
      <TanStackRouterDevtools position="bottom-left" />
      <TailwindIndicator />
    </>
  );
}
