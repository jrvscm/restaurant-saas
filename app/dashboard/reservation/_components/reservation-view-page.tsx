import PageContainer from '@/components/layout/page-container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ReservationViewPage({ reservation }: { reservation: any }) {
  return (
    <PageContainer>
      <Card className="mx-auto w-full">
        <CardHeader>
          <CardTitle className="text-left text-2xl font-bold">
            Reservation Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Date:</strong> {reservation.date}
            </div>
            <div>
              <strong>Time:</strong> {reservation.time}
            </div>
            <div>
              <strong>Guests:</strong> {reservation.guests}
            </div>
            <div>
              <strong>Status:</strong> {reservation.status}
            </div>
            <div>
              <strong>Notes:</strong> {reservation.notes || 'N/A'}
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
