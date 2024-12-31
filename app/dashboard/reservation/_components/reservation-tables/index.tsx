'use client';

import { ReservationDataTable } from './reservation-data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { columns } from './columns';
import { useReservationTableFilters } from './use-reservation-table-filters';

export default function ReservationTable({
  data,
  onStatusChange
}: {
  data: any[];
  onStatusChange: (reservationId: string, newStatus: string) => void;
}) {
  const { searchQuery, setSearchQuery, setPage } = useReservationTableFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
      </div>
      <ReservationDataTable
        columns={columns}
        data={data}
        totalItems={data.length}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
