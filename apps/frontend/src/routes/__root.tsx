import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@/components/utils';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="h-screen w-screen">
      <div className="flex gap-2 p-2 text-lg">
        <Link
          activeOptions={{ exact: true }}
          activeProps={{ className: 'font-bold' }}
          to="/"
        >
          Home
        </Link>
        <Link activeProps={{ className: 'font-bold' }} to="/about">
          About
        </Link>
      </div>
      <hr />
      <main className="container mx-auto max-w-7xl">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
