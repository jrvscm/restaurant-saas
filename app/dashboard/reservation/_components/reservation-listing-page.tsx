import { headers } from 'next/headers';
import { buttonVariants } from '@/components/ui/button';
import { searchParamsCache } from '@/lib/searchparams';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ReservationTable from './reservation-tables';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type TReservationListingPage = {};

export default async function ReservationListingPage({}: TReservationListingPage) {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const session = headers().get('X-Session');
  const token = session ? JSON.parse(session)?.token : null;

  if (!token) {
    console.error('Authorization token is missing.');
    throw new Error('Failed to fetch reservations. Missing token.');
  }

  const filters = {
    page: page?.toString() || '',
    limit: pageLimit?.toString() || '',
    ...(search && { search })
  };

  const queryString = new URLSearchParams(
    filters as Record<string, string>
  ).toString();

  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_BASE_URL
  }/reservation/reservations?${queryString ? queryString + '&' : ''}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // Include token
    },
    credentials: 'include', // Include credentials like cookies
    cache: 'no-store' // Ensure fresh data for each request
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error fetching reservations:', {
      status: response.status,
      statusText: response.statusText,
      error
    });
    throw new Error(error.message || 'Failed to fetch reservations');
  }

  const data = await response.json();

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Reservations (${data.length})`}
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
        <ReservationTable data={data} />
      </div>
    </PageContainer>
  );
}
