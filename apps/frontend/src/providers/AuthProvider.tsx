import { type ObservableObject } from '@legendapp/state';
import { persistObservable } from '@legendapp/state/persist';
import { useObservable } from '@legendapp/state/react';
import { createContext, useContext, useMemo } from 'react';

import { type Auth } from '@/types';

export type AuthContext = {
  isAuthenticated: ObservableObject<NonNullable<Auth['isAuthenticated']>>;
  user: ObservableObject<Auth['user']>;
  logout: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const state$ = useObservable<Auth>({
    isAuthenticated: undefined,
    user: undefined,
  });

  persistObservable(state$, {
    local: 'auth-state',
  });

  const auth = useMemo(
    () => ({
      isAuthenticated: state$.isAuthenticated,
      logout: () => {
        state$.isAuthenticated.set(undefined);
        state$.user.set(undefined);
        persistObservable(state$, {
          local: 'auth-state',
        }).delete();
      },
      user: state$.user,
    }),
    [state$],
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
