'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useSession } from '@/hooks/use-session';

const formSchema = z.object({
  date: z.string().min(1, {
    message: 'Date is required.'
  }),
  time: z.string().min(1, {
    message: 'Time is required.'
  }),
  guests: z.string().min(1, {
    message: 'Number of guests is required.'
  }),
  status: z.enum(['pending', 'confirmed', 'cancelled'], {
    required_error: 'Please select a status.'
  }),
  notes: z.string().optional()
});

export default function ReservationForm() {
  const { session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: '',
      time: '',
      guests: '1',
      status: 'pending',
      notes: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(session);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/reservations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer: ${session?.token}`
          },
          credentials: 'include', // Include cookies in the request
          body: JSON.stringify({
            date: values.date,
            time: values.time,
            guests: parseInt(values.guests, 10), // Convert guests to number
            status: values.status,
            notes: values.notes
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create reservation');
      }

      toast.success('Reservation created successfully!');
      form.reset(); // Reset the form on success
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Reservation Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a date" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Generate date options dynamically */}
                        {[...Array(7)].map((_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() + i);
                          const formattedDate = date
                            .toISOString()
                            .split('T')[0];
                          return (
                            <SelectItem
                              key={formattedDate}
                              value={formattedDate}
                            >
                              {formattedDate}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Generate time options dynamically */}
                        {Array.from({ length: 24 }, (_, hour) =>
                          ['00', '30'].map((minute) => (
                            <SelectItem
                              key={`${hour}:${minute}`}
                              value={`${hour
                                .toString()
                                .padStart(2, '0')}:${minute}`}
                            >
                              {`${hour.toString().padStart(2, '0')}:${minute}`}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Generate guest number options dynamically */}
                        {Array.from({ length: 20 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Additional notes (optional)"
                      {...field}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit Reservation</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
