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
import { CalendarIcon, Clock, Users } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { convertTo24HourFormat } from '../../../../lib/convertTime';

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
  notes: z.string().optional(),
  contactName: z.string().min(1, {
    message: 'Contact name is required.'
  }),
  phoneNumber: z
    .string()
    .min(1, {
      message: 'Phone number is required.'
    })
    .regex(/^[0-9]{10}$/, {
      message: 'Phone number must be 10 digits.'
    })
});

export default function ReservationForm() {
  const { session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: '',
      time: '',
      guests: '',
      status: 'confirmed',
      notes: '',
      contactName: '',
      phoneNumber: ''
    }
  });

  const [availableTimes, setAvailableTimes] = React.useState<string[]>([]);
  const [availability, setAvailability] = React.useState<any[]>([]);
  const [date, setDate] = React.useState<Date | null>(null); // Local state for the date

  // Fetch availability data for the organization
  React.useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/availability/public`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
              organizationId: `${process.env.NEXT_PUBLIC_ORGANIZATION_ID}`,
              credentials: 'include'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch availability');
        }

        const data = await response.json();
        setAvailability(data); // Storing the fetched availability data
      } catch (error) {
        console.error('Error fetching availability:', error);
        toast.error('Error fetching availability');
      }
    };
    fetchAvailability();
  }, []);

  React.useEffect(() => {
    if (!availability || !date) return;

    const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' });

    // Find the availability for the selected day
    const selectedDayAvailability = availability.find(
      (day) => day.dayOfWeek === dayOfWeek
    );

    if (selectedDayAvailability) {
      const { startTime, endTime } = selectedDayAvailability;
      generateTimeSlots(startTime, endTime, date, selectedDayAvailability);
    } else {
      setAvailableTimes([]);
      toast.error('No availability found for the selected day.');
    }
  }, [availability, date]);

  const generateTimeSlots = (
    startTime: string,
    endTime: string,
    selectedDate: Date | null,
    organizationAvailability: any
  ) => {
    if (!selectedDate || !organizationAvailability) return;

    const times: string[] = [];

    // Get the current date
    const today = new Date();

    // Get the day of the week for today and selected date
    const selectedDayOfWeek = selectedDate.toLocaleString('en-us', {
      weekday: 'long'
    });
    const todayDayOfWeek = today.toLocaleString('en-us', { weekday: 'long' });

    // Check the organization's availability for the selected day
    const selectedDayAvailability = organizationAvailability;

    // Parse start and end times based on selected day availability
    let start = new Date(
      `${today.toISOString().split('T')[0]}T${
        selectedDayAvailability.startTime
      }:00`
    );
    let end = new Date(
      `${today.toISOString().split('T')[0]}T${
        selectedDayAvailability.endTime
      }:00`
    );

    const currentTime = new Date();

    // If the selected date is today, limit the start time to the current time
    if (selectedDayOfWeek === todayDayOfWeek) {
      if (start < currentTime) {
        // Round to the next 30-minute interval if the start time is in the past
        const currentMinutes = currentTime.getMinutes();
        const roundedMinutes = Math.ceil(currentMinutes / 30) * 30; // Get the next 30-minute interval

        currentTime.setMinutes(roundedMinutes);
        currentTime.setSeconds(0); // Reset seconds to 0

        start = new Date(currentTime); // Set the new start time to the rounded time
      }
    }

    // If the selected day is in the future, use the full time range
    else {
      start = new Date(
        `${today.toISOString().split('T')[0]}T${
          organizationAvailability.startTime
        }:00`
      );
      end = new Date(
        `${today.toISOString().split('T')[0]}T${
          organizationAvailability.endTime
        }:00`
      );
    }

    // Generate time slots in 30-minute intervals between start and end time
    while (start < end) {
      // Format time in 12-hour AM/PM format without leading zeroes
      const timeSlot = start.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      times.push(timeSlot);

      start.setMinutes(start.getMinutes() + 30); // Increment by 30 minutes
    }

    setAvailableTimes(times); // Set the generated time slots in state
  };

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      setDate(selectedDate); // Update the local state
      form.setValue('date', selectedDate.toISOString().split('T')[0]); // Sync form value
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const time24Hour = convertTo24HourFormat(values.time);
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
            time: time24Hour,
            guests: parseInt(values.guests, 10), // Convert guests to number
            status: values.status,
            notes: values.notes,
            contactName: values.contactName, // Send contact name
            phoneNumber: values.phoneNumber // Send phone number
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
              {/* Date Picker with Calendar */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="
                              flex h-[36px] w-full items-center justify-start rounded-md border border-input
                              focus:ring-1 focus:ring-secondary-foreground
                            "
                          >
                            <CalendarIcon className="mr-[1rem] h-5 w-5" />
                            {date ? (
                              new Date(date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })
                            ) : (
                              <span className="text-muted-foreground">
                                Select a date
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateChange} // Use the handleDateChange function
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time Selector */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <Clock className="mr-[1rem] h-5 w-5" />
                          {!field.value && (
                            <span className="mr-auto text-muted-foreground">
                              Select a time
                            </span>
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {!availableTimes?.length && (
                          <SelectItem>
                            Select a date to generate available times
                          </SelectItem>
                        )}
                        {availableTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Guests Selector */}
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <Users className="mr-[1rem] h-5 w-5" />
                          {field.value == '' && (
                            <span className="mr-auto text-muted-foreground">
                              Number of guests
                            </span>
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => (
                          <SelectItem
                            className="justify-start"
                            key={i + 1}
                            value={(i + 1).toString()}
                          >
                            {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                        <SelectItem value="8+">8+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Name */}
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <input
                        placeholder="Contact Name"
                        type="text"
                        {...field}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <input
                        type="tel"
                        {...field}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                        placeholder="Enter phone number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Selector */}
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
