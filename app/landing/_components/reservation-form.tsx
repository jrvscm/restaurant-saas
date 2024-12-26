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
import { Icon } from '@/components/custom-icons';
import { MoveRight } from 'lucide-react';

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
    <div className="overflow-hidden relative bg-secondary text-secondary-foreground relative border-b-[2px] border-t-[2px] border-secondary-foreground px-4 py-6 md:px-8 w-[100vw]">
      <h2 className="text-2xl md:text-4xl font-logo text-secondary-foreground w-full text-center">We hope to see you soon!</h2>
      <Icon name="curlyLeft" className="
      text-primary 
      absolute
      bottom-[-5px] left-[24px]
      md:left-[3rem]
      rotate-[-30deg]
      " />
      <Icon name="curlyright" className="
      text-primary absolute 
      top-[40px] right-[24px] 
      md:right-[3rem] md:top-[1rem]
      rotate-[-40deg]" />
      <div className="container mx-auto p-8">
        <form className="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
          {/* Date Picker */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex h-10 w-full items-center justify-start rounded-md border-secondary-foreground focus:outline-none focus:ring-secondary-foreground"
                >
                  <CalendarIcon className="h-5 w-5 mr-[1rem]" />
                  {date ? (
                    date.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  ) : (
                    <span>Select a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-secondary text-secondary-foreground">
                <Calendar mode="single" selected={date} onSelect={setDate} className="bg-secondary" />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selector */}
          <div className="relative">
            <Select onValueChange={(value) => setTime(value)} value={time}>
              <SelectTrigger className="flex h-10 w-full items-center justify-start rounded-md border-secondary-foreground pl-10 placeholder-gray-400 focus:outline-none focus:ring-secondary-foreground">
                <Clock className="absolute left-3 h-5 w-5" />
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
              <SelectTrigger className="flex h-10 w-full items-center justify-start rounded-md border-secondary-foreground pl-10 placeholder-gray-400 focus:outline-none focus:ring-secondary-foreground">
                <Users className="absolute left-3 h-5 w-5" />
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
          <div className="flex justify-center">
            <Button variant="" className="
              rounded-md px-6 py-3 w-full h-[40px]
              bg-secondary text-secondary-foreground 
              border-secondary-foreground border-[1px]
              hover:bg-secondary/85 hover:shadow-lg">
              Book Now <MoveRight className="h-4 w-4 ml-[1rem]" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
