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
  fetchReservations: () => void;
  handleArchive: (reservationId: string) => void;
};

export const ReservationTableWithSocket = ({
  data,
  onStatusChange,
  fetchReservations,
  handleArchive
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

    socket.on('reservation:created', () => {
      fetchReservations(); // Refetch reservations when created
    });

    socket.on('reservation:updated', () => {
      fetchReservations(); // Refetch reservations when updated
    });

    socket.on('reservation:deleted', () => {
      fetchReservations(); // Refetch reservations when deleted
    });

    return () => {
      socket.off('reservation:created');
      socket.off('reservation:updated');
      socket.off('reservation:deleted');
    };
  }, [socket, fetchReservations]);

  return (
    <ReservationTable
      data={reservations}
      onStatusChange={onStatusChange}
      handleArchive={handleArchive}
    />
  );
};
