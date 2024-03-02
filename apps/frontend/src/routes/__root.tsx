import { TailwindIndicator } from '@repo/ui';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { Footer, Navigation, TanStackRouterDevtools } from '@/components';
import { type AuthContext } from '@/providers/AuthProvider';

type RouterContext = {
  auth: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <header className="flex h-16 border-b border-gray-900/10 py-4 text-sm dark:border-gray-200/20">
          <Navigation />
        </header>
        <main className="flex grow flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
      <TanStackRouterDevtools position="bottom-left" />
      <TailwindIndicator />
    </>
  );
}
