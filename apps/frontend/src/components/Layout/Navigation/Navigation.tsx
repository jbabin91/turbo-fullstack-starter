import { Button, Icons, ModeToggle } from '@repo/ui';
import { Link } from '@tanstack/react-router';

import viteLogo from '/vite.svg';
import { useAuth } from '@/providers/AuthProvider';

import { MobileNavigation } from './MobileNavigation';
import { Navbar } from './Navbar';
import { UserProfile } from './UserProfile';

export function Navigation() {
  const auth = useAuth();

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center gap-x-6">
        <MobileNavigation />
        <img
          alt="Vite logo"
          className="hidden h-8 w-auto transition duration-300 hover:scale-110 md:flex"
          src={viteLogo}
        />
        <h1 className="hidden text-2xl font-bold tracking-tight md:flex">
          TFS
        </h1>
      </div>
      <Navbar />
      <div className="flex flex-1 items-center justify-end gap-x-5">
        <ModeToggle />
        {auth.isAuthenticated.get() ? (
          <>
            {' '}
            <Button size="icon" variant="outline">
              <Icons.Bell className="size-[1.2rem]" />
              <span className="sr-only">View notifications</span>
            </Button>
            <UserProfile />
          </>
        ) : (
          <>
            <Link
              className="text-base font-semibold leading-7 dark:hover:text-blue-500"
              search={{
                redirect: '/profile',
              }}
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-base font-semibold leading-7 dark:hover:text-blue-500"
              to="/register"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
