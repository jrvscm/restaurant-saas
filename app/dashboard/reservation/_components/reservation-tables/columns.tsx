'use client';

import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'time', header: 'Time' },
  { accessorKey: 'guests', header: 'Guests' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'phoneNumber', header: 'Phone' },
  { accessorKey: 'contactName', header: 'Name' },
  { accessorKey: 'notes', header: 'Notes' }
];
