'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Reservation } from '../../types';

// Define how to style different reservation statuses
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-confirmed text-muted-foreground'; // Pulsing muted color for confirmed
    case 'pending':
      return 'bg-primary text-primary-foreground animate-pulse'; // Primary color for pending
    case 'canceled':
      return 'bg-destructive-20 text-muted-foreground'; // Destructive color for canceled
    default:
      return '';
  }
};

interface ReservationDataTableProps {
  columns: ColumnDef<Reservation, unknown>[];
  data: Reservation[];
  totalItems: number;
  pageSizeOptions?: number[];
  onStatusChange: (id: string, status: string) => void;
  fetchReservations: () => void;
  handleArchive: (id: string) => void;
}

// Helper function to convert time to 12-hour AM/PM format
const convertTo12HourFormat = (time: string) => {
  const [hour, minute] = time.split(':');
  const hours = parseInt(hour);
  const minutes = parseInt(minute);
  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHour = hours % 12 || 12; // Convert 0 hours to 12 (midnight case)
  const formattedMinute = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
  return `${adjustedHour}:${formattedMinute} ${period}`;
};

export function ReservationDataTable({
  columns,
  data,
  totalItems,
  pageSizeOptions = [10, 20, 30, 40, 50],
  onStatusChange,
  fetchReservations,
  handleArchive
}: ReservationDataTableProps) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withOptions({ shallow: false }).withDefault(1)
  );
  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withOptions({ shallow: false, history: 'push' })
      .withDefault(10)
  );

  const paginationState = {
    pageIndex: currentPage - 1, // zero-based index for React Table
    pageSize: pageSize
  };

  const pageCount = Math.ceil(totalItems / pageSize);

  const handlePaginationChange = (
    updaterOrValue:
      | PaginationState
      | ((old: PaginationState) => PaginationState)
  ) => {
    const pagination =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(paginationState)
        : updaterOrValue;

    setCurrentPage(pagination.pageIndex + 1); // converting zero-based index to one-based
    setPageSize(pagination.pageSize);
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    state: {
      pagination: paginationState
    },
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true
  });

  return (
    <div className="space-y-4">
      <ScrollArea className="grid h-[calc(80vh-220px)] rounded-md border md:h-[calc(90dvh-240px)]">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(getStatusStyle(row.original.status))} // Apply status-based styles to row
                >
                  {row.getVisibleCells().map((cell) => {
                    // For the "time" column, apply the time conversion
                    if (cell.column.id === 'time') {
                      const formattedTime = convertTo12HourFormat(
                        row.original.time
                      );
                      return (
                        <TableCell key={cell.id}>{formattedTime}</TableCell>
                      );
                    }
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                  {!pathname.includes('archive') && (
                    <TableCell>
                      <Select
                        value={row.original.status}
                        onValueChange={(newStatus) => {
                          // Handle status change and trigger callback
                          onStatusChange(row.original.id, newStatus);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue>{row.original.status}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}

                  {!pathname.includes('archive') && (
                    <TableCell>
                      {row.original.status != 'pending' && (
                        <Button
                          className="bg-destructive-20 text-muted-foreground hover:bg-destructive-40"
                          onClick={() => handleArchive(row.original.id)}
                        >
                          Archive
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {totalItems > 0 ? (
              <>
                Showing{' '}
                {paginationState.pageIndex * paginationState.pageSize + 1} to{' '}
                {Math.min(
                  (paginationState.pageIndex + 1) * paginationState.pageSize,
                  totalItems
                )}{' '}
                of {totalItems} entries
              </>
            ) : (
              'No entries found'
            )}
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">
                Rows per page
              </p>
              <Select
                value={`${paginationState.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={paginationState.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex w-[150px] items-center justify-center text-sm font-medium">
            {totalItems > 0 ? (
              <>
                Page {paginationState.pageIndex + 1} of {table.getPageCount()}
              </>
            ) : (
              'No pages'
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
