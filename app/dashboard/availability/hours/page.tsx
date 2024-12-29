import { SearchParams } from 'nuqs/parsers';
import OperationHoursViewPage from '../_components/operation-hours-view-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Operation Hours'
};

export default async function Page({ searchParams }: pageProps) {
  return <OperationHoursViewPage />;
}
