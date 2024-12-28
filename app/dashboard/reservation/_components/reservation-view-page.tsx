import PageContainer from '@/components/layout/page-container';
import ReservationForm from './reservation-form';

export default function ReservationViewPage({
  reservation
}: {
  reservation: any;
}) {
  return (
    <PageContainer>
      <ReservationForm />
    </PageContainer>
  );
}
