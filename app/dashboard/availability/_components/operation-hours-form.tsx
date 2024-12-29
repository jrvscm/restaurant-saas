'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useSession } from '@/hooks/use-session';
import { toast } from 'sonner';

// Order of days for the week
const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

// Define a reducer to manage the week state
const weekReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AVAILABILITY':
      return { ...state, [action.day]: action.value };
    case 'TOGGLE_DAY':
      const newState = { ...state };
      if (newState[action.day]) {
        delete newState[action.day];
      } else {
        newState[action.day] = { startTime: '09:00', endTime: '17:00' }; // Default times
      }
      return newState;
    default:
      return state;
  }
};

const formSchema = {
  operatingHours: [
    { dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00', id: '' },
    { dayOfWeek: 'Tuesday', startTime: '09:00', endTime: '17:00', id: '' },
    { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '17:00', id: '' },
    { dayOfWeek: 'Thursday', startTime: '09:00', endTime: '17:00', id: '' },
    { dayOfWeek: 'Friday', startTime: '09:00', endTime: '17:00', id: '' },
    { dayOfWeek: 'Saturday', startTime: '09:00', endTime: '17:00', id: '' },
    { dayOfWeek: 'Sunday', startTime: '09:00', endTime: '17:00', id: '' }
  ]
};

export default function OperatingHoursForm() {
  const [weekState, dispatch] = React.useReducer(weekReducer, {});
  const { session, loading } = useSession();
  const form = useForm({
    defaultValues: formSchema
  });

  // Convert 24-hour time to AM/PM format
  const convertToAMPM = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const isAM = hour < 12;
    const newHour = hour % 12 || 12;
    return `${newHour}:${minute.toString().padStart(2, '0')} ${
      isAM ? 'AM' : 'PM'
    }`;
  };

  const convertToShortTime = (time) => {
    const [hour, minute] = time.split(':');
    return `${hour}:${minute}`;
  };

  // Fetch availability data
  React.useEffect(() => {
    const fetchAvailability = async () => {
      if (!session || loading) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/availability`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer: ${session?.token}`
            },
            credentials: 'include'
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch availability data');
        }

        const data = await response.json();

        // Check if the data is in the expected format
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }

        // Update availability state with fetched data
        const availabilityObj = data.reduce((acc, item) => {
          acc[item.dayOfWeek] = {
            startTime: convertToShortTime(item.startTime),
            endTime: convertToShortTime(item.endTime)
          };
          return acc;
        }, {});

        // Set the week state with the fetched data
        dispatch({ type: 'SET_AVAILABILITY', value: availabilityObj });
      } catch (error) {
        console.error('Error fetching availability:', error);
        toast.error('Error fetching availability data');
      }
    };

    fetchAvailability();
  }, [session, loading]);

  // Handle checkbox changes
  const handleCheckboxChange = (day) => {
    dispatch({ type: 'TOGGLE_DAY', day });
  };

  // Handle form submit
  const onSubmit = async (values) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/availability`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer: ${session?.token}`
          },
          credentials: 'include',
          body: JSON.stringify({ availabilityData: weekState })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update availability');
      }

      toast.success('Availability updated successfully!');
      form.reset();
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Operating Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-3">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={weekState[day] ? true : false}
                    onChange={() => handleCheckboxChange(day)}
                    className="h-4 w-4"
                  />
                  <span className="text-lg">{day}</span>
                </div>
              ))}
            </div>

            {/* Operating Hours Section (Only show for selected days) */}
            {Object.keys(weekState).map((day, index) => (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4" key={day}>
                <FormField
                  control={form.control}
                  name={`operatingHours[${index}].dayOfWeek`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{day}</FormLabel>
                      <FormControl>
                        <Input disabled value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`operatingHours[${index}].startTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={weekState[day]?.startTime}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select open time" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 w-full overflow-y-auto sm:max-h-80 sm:w-80">
                            {Array.from({ length: 24 }, (_, hour) =>
                              ['00', '30'].map((minute) => {
                                const time = `${hour
                                  .toString()
                                  .padStart(2, '0')}:${minute}`;
                                return (
                                  <SelectItem key={time} value={time}>
                                    {convertToAMPM(time)}
                                  </SelectItem>
                                );
                              })
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`operatingHours[${index}].endTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={weekState[day]?.endTime}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select close time" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 w-full overflow-y-auto sm:max-h-80 sm:w-80">
                            {Array.from({ length: 24 }, (_, hour) =>
                              ['00', '30'].map((minute) => {
                                const time = `${hour
                                  .toString()
                                  .padStart(2, '0')}:${minute}`;
                                return (
                                  <SelectItem key={time} value={time}>
                                    {convertToAMPM(time)}
                                  </SelectItem>
                                );
                              })
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
