'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
});

const signUpSchema = loginSchema.extend({
  organizationName: z.string().min(1, 'Organization name is required'),
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number')
});

type LoginValues = z.infer<typeof loginSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;

export default function UserAuthForm({ isSignUp }: { isSignUp: boolean }) {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const formSchema = isSignUp ? signUpSchema : loginSchema;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: isSignUp
      ? {
          organizationName: '',
          fullName: '',
          email: '',
          phone: '',
          password: ''
        }
      : { email: '', password: '' }
  });

  const onSubmit = async (data: LoginValues | SignUpValues) => {
    startTransition(async () => {
      try {
        const endpoint = isSignUp
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/organization`
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to authenticate');
        }

        toast.success(
          isSignUp
            ? 'Organization registered successfully!'
            : 'Logged in successfully!'
        );
        router.push('/dashboard');
      } catch (error: any) {
        toast.error(error.message || 'Something went wrong. Please try again.');
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        {isSignUp && (
          <>
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Company Name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="1234567890"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  disabled={loading}
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} className="w-full" type="submit">
          {loading
            ? isSignUp
              ? 'Signing Up...'
              : 'Logging In...'
            : isSignUp
            ? 'Sign Up'
            : 'Log In'}
        </Button>
      </form>
    </Form>
  );
}
