'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ReservationTableWithSocket } from './reservation-tables/reservation-table-socket';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useSession } from '@/hooks/use-session';

type Reservation = {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  notes?: string;
};

export default function ReservationListingPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { session, loading } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!session || loading) return; // Wait for session to be available

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      query: {
        organizationId: session.user.organizationId || '' // Pass the organizationId from session
      },
      withCredentials: true
    });

    setSocket(socketInstance);

    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/reservations`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.token}` // Pass token from session
            },
            credentials: 'include'
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }

        const data: Reservation[] = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();

    socketInstance.on('reservation:created', (newReservation: Reservation) => {
      setReservations((prev) => [...prev, newReservation]);
    });

    socketInstance.on(
      'reservation:updated',
      (updatedReservation: Reservation) => {
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation.id === updatedReservation.id
              ? updatedReservation
              : reservation
          )
        );
      }
    );

    socketInstance.on('reservation:deleted', (deletedReservationId: string) => {
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== deletedReservationId)
      );
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [session, loading]); // Ensure useEffect runs only when session is available

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Reservations (${reservations.length})`}
            description="Manage reservations for your organization."
          />
          <Link
            href={'/dashboard/reservation/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ReservationTableWithSocket data={reservations} />
      </div>
    </PageContainer>
  );
}
