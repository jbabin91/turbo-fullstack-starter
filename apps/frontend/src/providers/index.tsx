import { Toaster } from '@repo/ui';
import { Suspense } from 'react';

import { Spinner } from '@/components';

import { AuthProvider } from './AuthProvider';
import { TanstackRouterProvider } from './TanstackRouterProvider';
import { TRPCReactProvider } from './TrpcReactProvider';

export function Providers() {
  return (
    <Suspense fallback={<Spinner />}>
      <TRPCReactProvider>
        <AuthProvider>
          <TanstackRouterProvider />
          <Toaster />
        </AuthProvider>
      </TRPCReactProvider>
    </Suspense>
  );
}
