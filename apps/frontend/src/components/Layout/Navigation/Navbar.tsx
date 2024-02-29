import { NavLink } from '@/components';
import { routes } from '@/configs';

export function Navbar() {
  return (
    <nav className="hidden md:flex md:gap-x-10 md:text-sm md:font-semibold md:leading-6">
      {routes.map((route) => (
        <NavLink
          key={route.to}
          params={{ ...route.params }}
          title={route.title}
          to={route.to}
        />
      ))}
    </nav>
  );
}
