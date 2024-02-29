import { Button, cn } from '@repo/ui';
import { Link, type LinkProps } from '@tanstack/react-router';

type NavLinkProps = {
  title: string;
} & LinkProps;

export function NavLink({ title, className, ...props }: NavLinkProps) {
  return (
    <Button
      className={cn(
        'text-base font-semibold leading-7 dark:hover:text-blue-500',
        className,
      )}
      variant="link"
    >
      <Link
        activeProps={{
          className: 'font-bold text-blue-400',
        }}
        {...props}
      >
        {title}
      </Link>
    </Button>
  );
}
