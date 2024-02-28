import { Icons } from '@repo/ui';

export function Spinner() {
  return (
    <span className="flex min-h-screen flex-col items-center justify-center">
      <Icons.Spinner className="size-12 animate-spin" />
    </span>
  );
}
