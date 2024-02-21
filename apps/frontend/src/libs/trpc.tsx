import { type AppRouter } from '@repo/api';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();

export function getBaseUrl() {
  if (import.meta.env.API_URL) return `${import.meta.env.API_URL}`;
  return '/trpc';
}
