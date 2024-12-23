'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select';
import { CalendarIcon, Clock, Users } from 'lucide-react';

export const ReservationForm = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState('12:00 PM');
  const [guests, setGuests] = React.useState('1');

  const availableTimes = [
    '12:00 PM',
    '12:15 PM',
    '12:30 PM',
    '12:45 PM',
    '1:00 PM',
    '1:15 PM',
    '1:30 PM',
    '1:45 PM'
  ];

  return (
    <div className="relative rounded-md border-b-[1rem] border-t-[1rem] border-primary bg-white px-4 py-6 shadow-md md:px-8">
      <div className="container mx-auto">
        <form className="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
          {/* Date Picker */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="primary"
                  className="flex h-10 w-full items-center justify-start rounded-md border pl-10 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <CalendarIcon className="absolute left-3 h-5 w-5 text-primary" />
                  {date ? (
                    date.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  ) : (
                    <span className="text-muted-foreground">Select a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selector */}
          <div className="relative">
            <Select onValueChange={(value) => setTime(value)} value={time}>
              <SelectTrigger className="flex h-10 w-full items-center justify-start rounded-md border pl-10 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary">
                <Clock className="absolute left-3 h-5 w-5 text-primary" />
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Guests Selector */}
          <div className="relative">
            <Select onValueChange={(value) => setGuests(value)} value={guests}>
              <SelectTrigger className="flex h-10 w-full items-center justify-start rounded-md border pl-10 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary">
                <Users className="absolute left-3 h-5 w-5 text-primary" />
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 9 }, (_, i) => (i + 1).toString()).map(
                  (guest) => (
                    <SelectItem key={guest} value={guest}>
                      {guest === '9' ? `${8}+` : guest}{' '}
                      {guest === '1' ? 'Guest' : 'Guests'}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center md:justify-end">
            <Button className="hover:bg-primary-dark w-full rounded-md bg-primary px-6 py-3 text-white shadow-md md:w-auto">
              Book Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
