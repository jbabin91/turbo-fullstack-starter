import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icons,
  ModeToggle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@repo/ui';

import viteLogo from '/vite.svg';
import { NavLink } from '@/components';
import { routes } from '@/configs';

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
      <Nav />
    </header>
  );
}

function Nav() {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center gap-x-6">
        <MobileNav />
        <img
          alt="Vite logo"
          className="hidden h-8 w-auto transition duration-300 hover:scale-110 md:flex"
          src={viteLogo}
        />
      </div>
      <Navbar />
      <div className="flex flex-1 items-center justify-end gap-x-5">
        <ModeToggle />
        <Button size="icon" variant="outline">
          <Icons.Bell className="size-[1.2rem]" />
          <span className="sr-only">View notifications</span>
        </Button>
        <UserProfile />
      </div>
    </div>
  );
}

function Navbar() {
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

function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            alt="profile image"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icons.User className="mr-2 size-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.Settings className="mr-2 size-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.Keyboard className="mr-2 size-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.Github className="mr-2 size-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.Logout className="mr-2 size-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
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
