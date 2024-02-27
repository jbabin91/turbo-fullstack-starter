import { Button, cn } from '@repo/ui';
import { Link, type LinkProps } from '@tanstack/react-router';

type NavLinkProps = {
  title: string;
} & LinkProps;

export function NavLink({ title, className, ...props }: NavLinkProps) {
  return (
    <Button asChild variant="ghost">
      <Link
        activeProps={{
          className: 'font-bold text-blue-400',
        }}
        className={cn(
          'text-base font-semibold leading-7 dark:hover:text-blue-500',
          className,
        )}
        {...props}
      >
        {title}
      </Link>
    </Button>
  );
}
