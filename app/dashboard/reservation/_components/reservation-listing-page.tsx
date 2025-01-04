'use client';
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ReservationTableWithSocket } from './reservation-tables/reservation-table-socket';
import ReservationTable from './reservation-tables';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useSession } from '@/hooks/use-session';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import type { Reservation } from '../types';

export default function ReservationListingPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { session } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const pathname = usePathname();
  const isArchive = pathname.includes('archive');

  const handleArchive = useCallback(
    async (reservationId: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/reservations/${reservationId}/archive`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.token}` // Ensure token is valid
            },
            credentials: 'include' // Verify if necessary
          }
        );

        if (!response.ok) {
          throw new Error('Failed to archive reservation');
        }

        const archivedReservation = await response.json();

        // Remove the archived reservation from the active list
        setReservations((prev) =>
          prev.filter((reservation) => reservation.id !== reservationId)
        );

        toast.success('Reservation archived successfully!');
      } catch (error: any) {
        console.error('Error archiving reservation:', error);
        toast.error(`Failed to archive reservation: ${error.message || error}`);
      }
    },
    [session?.token, setReservations]
  );

  const fetchReservations = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/${
          isArchive ? 'archived' : 'reservations'
        }`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.token || ''}`
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
      toast.error('Failed to fetch reservations.');
    }
  }, [isArchive, session?.token, setReservations]);

  useEffect(() => {
    if (!session) return;
    fetchReservations();
    if (!isArchive) {
      const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
        path: `${process.env.NEXT_PUBLIC_SOCKET_URL}/socket.io`,
        query: {
          organizationId: session.user.organizationId || ''
        },
        withCredentials: true
      });

      setSocket(socketInstance);

      socketInstance.on('reservation:created', () => {
        fetchReservations(); // Refetch when a reservation is created
      });

      socketInstance.on('reservation:updated', () => {
        fetchReservations(); // Refetch when a reservation is updated
      });

      socketInstance.on('reservation:deleted', () => {
        fetchReservations(); // Refetch when a reservation is deleted
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [session]);

  const updateReservationStatus = useCallback(
    async (reservationId: string, newStatus: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/reservations/${reservationId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.token || ''}`
            },
            body: JSON.stringify({ status: newStatus })
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update reservation status');
        }

        const updatedReservation = await response.json();

        setReservations((prev) =>
          prev.map((reservation) =>
            reservation.id === reservationId
              ? { ...reservation, status: updatedReservation.status }
              : reservation
          )
        );

        toast.success('Reservation status updated successfully!');
      } catch (error) {
        console.error('Error updating reservation status:', error);
        toast.error('Failed to update reservation status.');
      }
    },
    [session?.token, setReservations]
  );

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Reservations (${reservations.length})`}
            description="Manage reservations for your organization."
          />
          {!isArchive && (
            <Link
              href={'/dashboard/reservation/new'}
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          )}
        </div>
        <Separator />
        {!isArchive && (
          <ReservationTableWithSocket
            data={reservations}
            onStatusChange={updateReservationStatus}
            fetchReservations={fetchReservations}
            handleArchive={handleArchive}
          />
        )}
        {isArchive && <ReservationTable data={reservations} />}
      </div>
    </PageContainer>
  );
}
