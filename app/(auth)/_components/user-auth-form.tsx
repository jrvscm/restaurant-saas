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

const formSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
});

type UserFormValues = z.infer<typeof formSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: '',
      fullName: '',
      email: '',
      phone: '',
      password: ''
    }
  });

  const onSubmit = async (data: UserFormValues) => {
    startTransition(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/organization`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Send cookies with request
            body: JSON.stringify(data)
          }
        );

        if (!response.ok) {
          // Parse the server error response
          const errorData = await response.json();

          if (response.status === 400 && errorData?.errors) {
            // Backend returned field-specific errors
            for (const key in errorData.errors) {
              form.setError(key as keyof UserFormValues, {
                type: 'server',
                message: errorData.errors[key]
              });
            }
            throw new Error('Fix the highlighted errors');
          }

          // Handle generic server error
          throw new Error(errorData.error || 'Failed to register');
        }

        toast.success('Organization registered successfully!');
        router.push('/dashboard'); // Redirect on success
      } catch (error: any) {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Example Organization"
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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  );
}
