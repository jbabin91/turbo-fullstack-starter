import { ModeToggle } from '@repo/ui';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <nav className="mb-4 flex flex-row items-center justify-between border-b p-4 align-middle ">
        <div className="flex gap-2 text-lg">
          <Link
            activeOptions={{ exact: true }}
            activeProps={{
              className: 'font-bold text-blue-400',
            }}
            to="/"
          >
            Home
          </Link>{' '}
          <Link
            activeProps={{
              className: 'font-bold text-blue-400',
            }}
            to={'/about'}
          >
            About
          </Link>
        </div>
        <ModeToggle />
      </nav>
      <main className="flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
