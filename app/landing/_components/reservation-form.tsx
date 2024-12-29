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
import { toast } from 'sonner';
import { convertTo24HourFormat } from '../../../lib/convertTime';

export const ReservationForm = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState('12:00 PM');
  const [guests, setGuests] = React.useState('1');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error('Please select a date.');
      return;
    }

    try {
      const time24Hour = convertTo24HourFormat(time); // Convert time to HH:MM format

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/reservations/public`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
            time: time24Hour, // Use converted time
            guests: parseInt(guests, 10), // Convert guests to number
            notes: '', // You can add a field for notes if needed
            organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID,
            apiKey: process.env.NEXT_PUBLIC_API_KEY
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create reservation');
      }

      const reservation = await response.json();
      toast.success('Reservation created successfully!');
      console.log('Reservation:', reservation);

      // Reset the form
      setDate(null);
      setTime('12:00 PM');
      setGuests('1');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    }
  };

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
    <div className="relative relative w-[100vw] overflow-hidden border-b-[2px] border-t-[2px] border-secondary-foreground bg-secondary px-4 py-6 text-secondary-foreground md:px-8">
      <h2 className="w-full text-center font-logo text-2xl text-secondary-foreground md:text-4xl">
        We hope to see you soon!
      </h2>
      <Icon
        name="curlyLeft"
        className="
      absolute 
      bottom-[-5px]
      left-[24px] rotate-[-30deg]
      text-primary
      md:left-[3rem]
      "
      />
      <Icon
        name="curlyright"
        className="
      absolute right-[24px] 
      top-[40px] rotate-[-40deg] 
      text-primary md:right-[3rem]
      md:top-[1rem]"
      />
      <div className="container mx-auto p-8">
        <form className="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
          {/* Date Picker */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="
                    flex h-10 w-full items-center justify-start rounded-md 
                    border-secondary-foreground hover:bg-secondary-50 hover:text-secondary-foreground
                    hover:shadow-md focus:outline-none focus:ring-secondary-foreground
                  "
                >
                  <CalendarIcon className="mr-[1rem] h-5 w-5" />
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
              <PopoverContent className="w-auto bg-secondary-foreground p-2 text-primary-foreground">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="bg-secondary-foreground"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selector */}
          <div className="relative">
            <Select onValueChange={(value) => setTime(value)} value={time}>
              <SelectTrigger
                className="
                flex h-10 w-full items-center justify-start rounded-md border-secondary-foreground pl-10 
                hover:shadow-md focus:outline-none
                focus:ring-secondary-foreground
              "
              >
                <Clock className="absolute left-3 h-5 w-5" />
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent className="bg-secondary-foreground text-primary-foreground">
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
              <SelectTrigger
                className="
                flex h-10 w-full items-center justify-start rounded-md border-secondary-foreground pl-10 placeholder-gray-400 
                hover:shadow-md focus:outline-none 
                focus:ring-secondary-foreground
                "
              >
                <Users className="absolute left-3 h-5 w-5" />
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent className="bg-secondary-foreground text-primary-foreground">
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
            <Button
              onClick={handleSubmit}
              className="
              h-[40px] w-full rounded-md border-[1px] border-secondary-foreground
              bg-secondary px-6 
              py-3 text-secondary-foreground
              hover:bg-secondary-50 hover:shadow-lg"
            >
              Book Now <MoveRight className="ml-[1rem] h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
