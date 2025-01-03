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
import { Input } from '@/components/ui/input';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { Icon } from '@/components/custom-icons';
import { MoveRight } from 'lucide-react';
import { toast } from 'sonner';
import { convertTo24HourFormat } from '../../../lib/convertTime';

export const ReservationForm = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<string>('');
  const [guests, setGuests] = React.useState<string>('1');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [availability, setAvailability] = React.useState<any[]>([]);
  const [availableTimes, setAvailableTimes] = React.useState<string[]>([]);
  const [name, setName] = React.useState<string>('');

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

    // Determine the day of the week for the selected date
    const dayOfWeek = new Date(date).toLocaleString('en-us', {
      weekday: 'long'
    });

    // Get the availability for the selected day from the fetched data
    const selectedDayAvailability = availability.find(
      (day) => day.dayOfWeek === dayOfWeek
    );

    if (selectedDayAvailability) {
      const { startTime, endTime } = selectedDayAvailability;
      generateTimeSlots(startTime, endTime, dayOfWeek, selectedDayAvailability);
    } else {
      setAvailableTimes([]);
      toast.error('No availability found for the selected day.');
    }
  }, [availability, date]);

  const generateTimeSlots = (
    startTime: string,
    endTime: string,
    selectedDate: string,
    organizationAvailability: any
  ) => {
    if (!selectedDate || !organizationAvailability) return;
    const times: string[] = [];

    // Get the current date
    const today = new Date();

    // Get the day of the week for today and selected date
    const selectedDayOfWeek = selectedDate;

    const todayDayOfWeek = today.toLocaleString('en-us', { weekday: 'long' });

    // Check the organization's availability for the selected day
    const selectedDayAvailabilityHasRange =
      organizationAvailability.dayOfWeek.toLowerCase() ===
        selectedDayOfWeek.toLowerCase() &&
      organizationAvailability?.startTime &&
      organizationAvailability?.endTime;

    if (!selectedDayAvailabilityHasRange) {
      console.error('No availability for the selected day');
      return;
    }
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
            date: date.toISOString().split('T')[0],
            time: time24Hour,
            guests: parseInt(guests, 10),
            notes: `source: website`,
            organizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID,
            phoneNumber,
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            contactName: name
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create reservation');
      }

      const reservation = await response.json();
      toast.success("We'll text you when your reservation is confirmed.");
      setDate(null);
      setTime('12:00 PM');
      setGuests('1');
      setPhoneNumber('');
      setName('');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Something went wrong');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

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
        <form className="grid grid-cols-1 items-center gap-6 md:grid-cols-6">
          {/* Date Picker */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="
                    flex h-10 w-full items-center justify-start rounded-md 
                    border-secondary-foreground 
                    hover:bg-secondary-50 hover:text-secondary-foreground hover:shadow-md
                    focus:ring-1 focus:ring-secondary-foreground
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
                  selected={date || undefined}
                  onSelect={(selectedDate?: Date) =>
                    setDate(selectedDate || null)
                  }
                  className="bg-secondary-foreground"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selector */}
          <div className="relative">
            <Select onValueChange={(value) => setTime(value)} value={time}>
              <SelectTrigger className="justify-space-between flex h-10 w-full items-center rounded-md border-secondary-foreground pl-10 hover:shadow-md focus:outline-none focus:ring-secondary-foreground">
                <Clock className="absolute left-3 h-5 w-5" />
                {!time ? (
                  <span className="mr-auto">Select a time</span>
                ) : (
                  <span className="mr-auto">{time}</span>
                )}
              </SelectTrigger>
              <SelectContent className="bg-secondary-foreground text-primary-foreground">
                {!availableTimes?.length && (
                  <SelectItem value="placeholder">
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
          </div>

          {/* Guests Selector */}
          <div className="relative">
            <Select onValueChange={(value) => setGuests(value)} value={guests}>
              <SelectTrigger className="justify-space-between flex h-10 w-full items-center rounded-md border-secondary-foreground pl-10 placeholder-secondary-foreground hover:shadow-md focus:outline-none focus:ring-secondary-foreground">
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

          {/* Phone Input */}
          <div className="relative">
            <Input
              required
              type="phone"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-10 w-full rounded-md border border-secondary-foreground placeholder:text-secondary-foreground hover:bg-secondary-50 hover:text-secondary-foreground hover:shadow-md focus-visible:ring-1 focus-visible:ring-secondary-foreground"
            />
          </div>

          {/* Name Input */}
          <div className="relative">
            <Input
              required
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-md border border-secondary-foreground placeholder:text-secondary-foreground hover:bg-secondary-50 hover:text-secondary-foreground hover:shadow-md focus-visible:ring-1 focus-visible:ring-secondary-foreground"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              className="h-[40px] w-full rounded-md border-[1px] border-secondary-foreground bg-secondary px-6 py-3 text-secondary-foreground hover:bg-secondary-50 hover:shadow-lg focus-visible:ring-1 focus-visible:ring-secondary-foreground"
            >
              Book Now <MoveRight className="ml-[1rem] h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
