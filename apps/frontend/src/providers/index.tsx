import { TRPCReactProvider } from './TrpcReactProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
