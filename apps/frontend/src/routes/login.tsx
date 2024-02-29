import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';
import { Form, useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
});

const formSchema = z.object({
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  username: z.string().min(1, {
    message: 'Username is required',
  }),
});

function LoginComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h1>Login Form</h1>
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
          <button type="submit">Submit</button>
        </form>
      </Form>
    </div>
  );
}
