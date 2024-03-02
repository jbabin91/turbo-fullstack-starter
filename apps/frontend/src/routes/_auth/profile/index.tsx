import { Button } from '@repo/ui';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { trpc } from '@/libs';
import { useAuth } from '@/providers/AuthProvider';

export const Route = createFileRoute('/_auth/profile/')({
  component: ProfileComponent,
});

function ProfileComponent() {
  const navigate = useNavigate({ from: '/profile' });
  const auth = useAuth();

  const { data: user } = trpc.users.me.useQuery();

  const logoutMutation = trpc.auth.logout.useMutation({
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      auth.logout();
      navigate({ to: '/' });
    },
  });

  return (
    <div>
      <div>Hello /_auth/profile/!</div>
      <pre>{JSON.stringify(user)}</pre>
      <Button onClick={() => logoutMutation.mutate()}>Logout</Button>
    </div>
  );
}
