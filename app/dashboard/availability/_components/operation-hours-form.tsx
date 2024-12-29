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

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const formSchema = {
  operatingHours: [
    { day: 'Monday', openTime: '09:00', closeTime: '17:00' },
    { day: 'Tuesday', openTime: '09:00', closeTime: '17:00' },
    { day: 'Wednesday', openTime: '09:00', closeTime: '17:00' },
    { day: 'Thursday', openTime: '09:00', closeTime: '17:00' },
    { day: 'Friday', openTime: '09:00', closeTime: '17:00' },
    { day: 'Saturday', openTime: '09:00', closeTime: '17:00' },
    { day: 'Sunday', openTime: '09:00', closeTime: '17:00' }
  ]
};

export default function OperatingHoursForm() {
  // State to track checked days
  const [checkedDays, setCheckedDays] = React.useState<string[]>([]);

  const form = useForm({
    defaultValues: formSchema
  });

  // Function to convert 24-hour time to AM/PM format
  const convertToAMPM = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const isAM = hour < 12;
    const newHour = hour % 12 || 12;
    return `${newHour}:${minute.toString().padStart(2, '0')} ${
      isAM ? 'AM' : 'PM'
    }`;
  };

  const handleCheckboxChange = (day: string) => {
    const updatedCheckedDays = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];

    setCheckedDays(updatedCheckedDays);
  };

  const onSubmit = (values: any) => {
    // Only include operating hours for the days that are checked
    const selectedOperatingHours = values.operatingHours.filter((item: any) =>
      checkedDays.includes(item.day)
    );

    console.log('Operating Hours for Selected Days:', selectedOperatingHours);
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
            {/* Days Selection Section (Vertical Layout with Spacing) */}
            <div className="flex flex-col gap-3">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={checkedDays.includes(day)}
                    onChange={() => handleCheckboxChange(day)}
                    className="h-4 w-4"
                  />
                  <span className="text-lg">{day}</span>
                </div>
              ))}
            </div>

            {/* Operating Hours Section (Only show for selected days) */}
            {checkedDays.includes('Monday') && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name={`operatingHours[0].day` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monday</FormLabel>
                      <FormControl>
                        <Input disabled value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`operatingHours[0].openTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                  name={`operatingHours[0].closeTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
            )}

            {checkedDays.includes('Tuesday') && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name={`operatingHours[1].day` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tuesday</FormLabel>
                      <FormControl>
                        <Input disabled value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`operatingHours[1].openTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                  name={`operatingHours[1].closeTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
            )}

            {checkedDays.includes('Wednesday') && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name={`operatingHours[2].day` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wednesday</FormLabel>
                      <FormControl>
                        <Input disabled value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`operatingHours[2].openTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                  name={`operatingHours[2].closeTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
            )}

            {checkedDays.includes('Thursday') && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name={`operatingHours[3].day` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thursday</FormLabel>
                      <FormControl>
                        <Input disabled value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`operatingHours[3].openTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                  name={`operatingHours[3].closeTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
            )}

            {checkedDays.includes('Friday') && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name={`operatingHours[4].day` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Friday</FormLabel>
                      <FormControl>
                        <Input disabled value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`operatingHours[4].openTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                  name={`operatingHours[4].closeTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
            )}

            {checkedDays.includes('Saturday') && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name={`operatingHours[5].day` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saturday</FormLabel>
                      <FormControl>
                        <Input disabled value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`operatingHours[5].openTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                  name={`operatingHours[5].closeTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
            )}

            {checkedDays.includes('Sunday') && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name={`operatingHours[6].day` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sunday</FormLabel>
                      <FormControl>
                        <Input disabled value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`operatingHours[6].openTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                  name={`operatingHours[6].closeTime` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Close Time</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
            )}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
