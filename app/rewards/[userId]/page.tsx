'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/hooks/use-session';
// import { PointsTable } from './points-table';
import { toast } from 'sonner';

interface PointsHistory {
  id: string;
  userId: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string | null;
  createdAt: string;
}

interface LoyaltyData {
  totalPoints: number;
  history: PointsHistory[];
}

export default function RewardsPage() {
  const { userId } = useParams();
  const [points, setPoints] = useState<number>(0);
  const [history, setHistory] = useState<PointsHistory[]>([]);
  const { session } = useSession();

  useEffect(() => {
    if (!userId) {
      toast.error('User ID is missing');
      return;
    }

    const fetchLoyaltyData = async () => {
      if (!session) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/loyalty/points/${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.token}`,
              apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
              organizationId: `${process.env.NEXT_PUBLIC_ORGANIZATION_ID}`,
              credentials: 'include'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch loyalty points.');
        }

        const data: LoyaltyData = await response.json();
        setPoints(data.totalPoints);
        setHistory(data.history);
      } catch (error) {
        console.error('Error fetching loyalty data:', error);
        toast.error('Failed to fetch rewards data.');
      }
    };

    fetchLoyaltyData();
  }, [userId, session]);

  if (!userId || !session) return;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Heading
          title="Your Rewards"
          description="Track your loyalty points and reward history."
        />
        <Separator />
        <div className="space-y-4">
          {/* Display Total Points */}
          <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="text-lg font-semibold">Total Points</h2>
            <p className="text-2xl font-bold text-blue-600">{points}</p>
          </div>

          {/* Points History Table */}
          {/* <PointsTable data={history} /> */}
        </div>
      </div>
    </PageContainer>
  );
}
