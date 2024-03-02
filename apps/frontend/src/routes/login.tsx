import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui';
import {
  createFileRoute,
  getRouteApi,
  useNavigate,
} from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { trpc } from '@/libs';
import { useAuth } from '@/providers/AuthProvider';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
  validateSearch: z.object({
    redirect: z.string().catch('/'),
  }),
});

const routeApi = getRouteApi('/login');

const formSchema = z.object({
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  username: z.string().min(1, {
    message: 'Username is required',
  }),
});

function LoginComponent() {
  const auth = useAuth();
  const navigate = useNavigate();

  const search = routeApi.useSearch();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { mutate: loginAction } = trpc.auth.login.useMutation({
    onError: (error) => {
      console.error(error);
    },
    onSuccess: async (data) => {
      auth.user.set(data?.user);
      auth.isAuthenticated.set(true);
      await navigate({ to: search.redirect });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginAction(values);
  }

  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
