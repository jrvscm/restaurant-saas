'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Reservation } from '../../types';

export const columns: ColumnDef<Reservation>[] = [
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'time', header: 'Time' },
  { accessorKey: 'guests', header: 'Guests' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'phoneNumber', header: 'Phone' },
  { accessorKey: 'contactName', header: 'Name' },
  { accessorKey: 'notes', header: 'Notes' }
];
