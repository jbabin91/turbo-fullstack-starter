import {
  Button,
  Icons,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@repo/ui';

import viteLogo from '/vite.svg';
import { NavLink } from '@/components';
import { routes } from '@/configs';

export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="p-3 md:hidden" size="icon" variant="outline">
          <Icons.Menu aria-hidden="true" className="size-[1.2rem]" />
          <span className="sr-only">Open main menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex w-3/5 flex-col items-start justify-start gap-5"
        side="left"
      >
        <SheetHeader>
          <img
            alt="Vite logo"
            className="ml-4 h-8 w-auto transition duration-300 hover:scale-110"
            src={viteLogo}
          />
        </SheetHeader>
        <div className="flex flex-col gap-3">
          {routes.map((route) => (
            <NavLink
              key={route.to}
              params={{ ...route.params }}
              title={route.title}
              to={route.to}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
