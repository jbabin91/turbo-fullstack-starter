import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { authSchema } from '@/types';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    const { auth } = context;
    const isAuth = authSchema.safeParse({
      isAuthenticated: auth.isAuthenticated.get(),
      user: auth.user.get(),
    });

    if (!isAuth.success) {
      throw redirect({
        search: {
          redirect: location.href,
        },
        to: '/login',
      });
    }
  },
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  return <Outlet />;
}
