'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '@/hooks/use-socket';
import ReservationTable from '../reservation-tables';
import { useSession } from '@/hooks/use-session';

type Reservation = {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  notes?: string;
};

type ReservationTableWithSocketProps = {
  data: Reservation[];
  onStatusChange: (reservationId: string, newStatus: string) => void;
};
//TODO: fix sorting on update or add because the new reservation just gets added to the list,
//TODO: but should be sorted by date in the panel so on refresh they are aligned
export const ReservationTableWithSocket = ({
  data,
  onStatusChange
}: ReservationTableWithSocketProps) => {
  const [reservations, setReservations] = useState<Reservation[]>(data);
  const { session } = useSession();
  const socket = useSocket({
    organizationId: session?.user?.organizationId || ''
  });

  // Update reservations state when the data prop changes
  useEffect(() => {
    setReservations(data);
  }, [data]);

  // Handle real-time socket updates
  useEffect(() => {
    if (!socket) return;

    socket.on('reservation:created', (newReservation: Reservation) => {
      setReservations((prev) => [...prev, newReservation]);
    });

    socket.on('reservation:updated', (updatedReservation: Reservation) => {
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === updatedReservation.id
            ? updatedReservation
            : reservation
        )
      );
    });

    socket.on('reservation:deleted', (deletedReservationId: string) => {
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== deletedReservationId)
      );
    });

    return () => {
      socket.off('reservation:created');
      socket.off('reservation:updated');
      socket.off('reservation:deleted');
    };
  }, [socket]);

  return (
    <ReservationTable data={reservations} onStatusChange={onStatusChange} />
  );
};
