import {
  Button,
  Icons,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@repo/ui';
import { Link } from '@tanstack/react-router';

import viteLogo from '/vite.svg';
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
            <Link
              key={route.to}
              activeProps={{
                className: 'font-bold text-blue-400',
              }}
              className="text-base font-semibold leading-7 dark:hover:text-blue-500"
              to={route.to}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
