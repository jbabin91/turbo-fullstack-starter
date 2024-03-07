import { Link } from '@tanstack/react-router';

import { routes } from '@/configs';

export function Navbar() {
  return (
    <nav className="hidden md:flex md:gap-x-10 md:text-sm md:font-semibold md:leading-6">
      {routes.map((route) => (
        <Link
          key={route.to}
          activeProps={{
            className: 'font-bold text-blue-400',
          }}
          className="text-base font-semibold leading-7 hover:text-blue-500"
          to={route.to}
        >
          {route.title}
        </Link>
      ))}
    </nav>
  );
}
