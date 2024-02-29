import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
});

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email address is required',
    })
    .email('Email address is not valid'),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(24, {
      message: 'Password must be at most 24 characters long',
    }),
  username: z
    .string()
    .min(1, {
      message: 'Username is required',
    })
    .min(2, {
      message: 'Username must be at least 2 characters long',
    }),
});

function RegisterComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      name: '',
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
      <h1>Signup Form</h1>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe69" {...field} />
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@email.com" {...field} />
                </FormControl>
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
