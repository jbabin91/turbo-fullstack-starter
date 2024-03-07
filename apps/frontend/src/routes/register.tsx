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
  useToast,
} from '@repo/ui';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { trpc } from '@/libs';
import { useAuth } from '@/providers/AuthProvider';

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
});

const containsUppercase = (character: string) => /[A-Z]/.test(character);
const containsLowercase = (character: string) => /[a-z]/.test(character);
const containsSpecialChar = (character: string) =>
  /[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-]/.test(character);

const formSchema = z
  .object({
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
      }),
    username: z
      .string()
      .min(1, {
        message: 'Username is required',
      })
      .min(2, {
        message: 'Username must be at least 2 characters long',
      }),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      const character = password.charAt(i);
      if (!Number.isNaN(+character)) countOfNumbers++;
      else if (containsUppercase(character)) countOfUpperCase++;
      else if (containsLowercase(character)) countOfLowerCase++;
      else if (containsSpecialChar(character)) countOfSpecialChar++;
    }

    let errObj = {
      lowerCase: {
        message: 'Password requires at least 1 lowercase character',
        pass: true,
      },
      specialCh: {
        message: 'Password requires at least 1 special character',
        pass: true,
      },
      totalNumber: {
        message: 'Password requires at least 1 number character',
        pass: true,
      },
      upperCase: {
        message: 'Password requires at least 1 uppercase character',
        pass: true,
      },
    };

    if (countOfLowerCase < 1) {
      errObj = { ...errObj, lowerCase: { ...errObj.lowerCase, pass: false } };
    }
    if (countOfNumbers < 1) {
      errObj = {
        ...errObj,
        totalNumber: { ...errObj.totalNumber, pass: false },
      };
    }
    if (countOfUpperCase < 1) {
      errObj = { ...errObj, upperCase: { ...errObj.upperCase, pass: false } };
    }
    if (countOfSpecialChar < 1) {
      errObj = { ...errObj, specialCh: { ...errObj.specialCh, pass: false } };
    }

    if (countOfLowerCase < 1) {
      checkPassComplexity.addIssue({
        code: 'custom',
        message: errObj.lowerCase.message,
        path: ['password'],
      });
    }

    if (countOfUpperCase < 1) {
      checkPassComplexity.addIssue({
        code: 'custom',
        message: errObj.upperCase.message,
        path: ['password'],
      });
    }

    if (countOfSpecialChar < 1) {
      checkPassComplexity.addIssue({
        code: 'custom',
        message: errObj.specialCh.message,
        path: ['password'],
      });
    }

    if (countOfNumbers < 1) {
      checkPassComplexity.addIssue({
        code: 'custom',
        message: errObj.totalNumber.message,
        path: ['password'],
      });
    }
  });

function RegisterComponent() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const mutation = trpc.auth.register.useMutation({
    onError: (error) => {
      console.error(error);
      toast({
        description: 'Uh oh! Something went wrong.',
        variant: 'destructive',
      });
    },
    onSuccess: async (data) => {
      console.log('User registered successfully');
      toast({
        description: 'User registered successfully',
        variant: 'success',
      });
      auth.user.set(data?.user);
      auth.isAuthenticated.set(true);
      await navigate({ to: '/' });
    },
  });

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
    mutation.mutate(values);
  }

  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Signup Form</CardTitle>
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
