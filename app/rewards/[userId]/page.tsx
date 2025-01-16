'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { useSession } from '@/hooks/use-session';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLogout } from '@/hooks/use-logout';
import {
  Sparkle,
  Coins,
  RefreshCcw,
  MoveRight,
  HandCoins,
  Gift,
  UserPlus,
  Copy
} from 'lucide-react';
import Slider from '../_components/slider';

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
  const [fetching, setFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'redeem' | 'earn' | 'refer'>('refer');
  const logout = useLogout();

  const openSlider = (selectedMode: 'redeem' | 'earn' | 'refer') => {
    setMode(selectedMode);
    setIsOpen(true);
  };

  const fetchLoyaltyData = async () => {
    if (!session) return;
    setFetching(true);
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
    setTimeout(() => {
      setFetching(false);
    }, 500);
  };

  useEffect(() => {
    if (!userId) {
      toast.error('User ID is missing');
      return;
    }
    fetchLoyaltyData();
  }, [userId, session]);

  if (!userId || !session) return;

  return (
    <>
      <div className="relative z-[0] flex flex-col justify-start bg-secondary p-6 pb-[70px]">
        {/* Header Section */}
        <div className="mx-auto flex w-full max-w-[800px] flex-row justify-between">
          <div className="mb-[1rem] w-[fit-content] rounded-lg bg-black/10 p-1">
            <Coins className="h-6 w-6" />
          </div>
          <Button onClick={logout} className="h-[32px]">
            Log Out
          </Button>
        </div>
        <span className="mx-auto w-full max-w-[800px] text-sm">Welcome to</span>
        <div className="mx-auto flex w-full max-w-[800px] flex-row items-center justify-between">
          <span className="text-2xl font-bold">Rewardable</span>
          <RefreshCcw
            role="button"
            onClick={fetchLoyaltyData}
            className={`mr-1 h-6 w-6 ${fetching && 'animate-spin'}`}
          />
        </div>
      </div>

      {/* Points Card */}
      <div className="relative z-[10] mx-4 -mt-[40px] mb-4 ml-auto mr-auto w-full max-w-[800px] rounded-lg">
        <div className="ml-4 mr-4 flex flex-row items-center rounded-lg bg-white p-4 shadow-lg">
          <div className="flex items-center justify-center">
            <Sparkle className="mr-2 h-4 w-4 text-secondary-foreground" />
            <h2 className="text-md font-bold">Points</h2>
          </div>
          <div className="ml-[auto] flex-col items-center justify-center">
            <p className="text-center text-2xl font-bold text-secondary-foreground">
              {points}
            </p>
            <p className="text-md text-secondary-foreground">
              Equals ${Math.floor(points * 0.1)}
            </p>
          </div>
        </div>
      </div>

      {/* Earn Redeem */}
      <div className="mx-auto mb-4 flex w-full max-w-[800px] flex-row items-center">
        <div
          role="button"
          onClick={() => openSlider('earn')}
          className="relative ml-4 mr-4 w-[100%] rounded-lg shadow-lg"
        >
          <div className="flex flex-row items-center rounded-lg bg-white p-4">
            <div className="flex-col items-center justify-center">
              <HandCoins className="mb-1 mr-2 h-6 w-6 text-secondary-foreground" />
              <h2 className="text-md font-bold">Earn</h2>
            </div>
            <div className="ml-[auto] flex-col items-center justify-center">
              <MoveRight className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>

        <div
          role="button"
          onClick={() => openSlider('redeem')}
          className="relative mx-auto mr-4 w-full max-w-[800px] rounded-lg shadow-lg"
        >
          <div className="flex flex-row items-center rounded-lg bg-white p-4">
            <div className="flex-col items-center justify-center">
              <Gift className="mb-1 h-6 w-6 text-secondary-foreground" />
              <h2 className="text-md font-bold">Redeem</h2>
            </div>
            <div className="ml-[auto] flex-col items-center justify-center">
              <MoveRight className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative ml-auto mr-auto w-full max-w-[800px]">
        <div className="ml-4 mr-4 rounded-lg bg-white p-4 shadow-lg">
          <div className="flex flex-col items-start justify-center">
            <UserPlus className="mb-1 mb-1 mr-2 h-6 w-6 text-secondary-foreground" />
            <div
              role="button"
              onClick={() => openSlider('refer')}
              className="mb-4 flex w-[100%] flex-row items-center justify-center"
            >
              <h2 className="text-md font-bold underline">
                Refer your friends
              </h2>
              <MoveRight className="ml-[auto] h-6 w-6 text-secondary" />
            </div>
            <div
              role="button"
              className="mb-4 flex w-[100%] flex-row items-center justify-start"
            >
              <ul role="list" className="ml-4 list-disc marker:text-secondary">
                <li>
                  <p className="text-sm text-black/40">
                    Refer friends for{' '}
                    <span className="text-secondary-foreground">
                      +20 points
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Site is in demo mode');
            }}
            className="flex flex-row items-center"
          >
            <input
              type="text"
              readOnly
              value="https://plusrewards.com/refer/234jalkd21k"
              className="
                text-disabled h-[36px] flex-grow rounded-bl-md rounded-br-none rounded-tl-md rounded-tr-none border border-r-[0px] border-black/15 
                bg-white px-4 py-3 text-sm 
                text-black/40 text-secondary-foreground placeholder-opacity-70 
                focus:border-secondary
                focus:outline-none
                focus:ring-1
                focus:ring-secondary
              "
              required
            />
            <Button
              type="submit"
              className="
                border-1 w-[fit-content] rounded-bl-none rounded-br-md rounded-tl-none 
                rounded-tr-md border-secondary bg-secondary px-6 py-3
                text-secondary-foreground
                shadow-none
                hover:bg-secondary-50
                sm:w-auto
              "
            >
              <Copy className="h-6 w-6 text-secondary-foreground" />
            </Button>
          </form>
        </div>
      </div>

      <PageContainer scrollable={false}>
        <div className="h-full w-full">
          <div className="ml-auto mr-auto w-full max-w-[800px] space-y-4">
            <div className="rounded-lg">
              {/* Points History */}
              {history.map((entry: PointsHistory, index: number) => (
                <div key={index} className="relative mb-4 rounded-lg shadow-lg">
                  <div className="flex flex-row items-center rounded-lg bg-white p-4">
                    <div className="flex items-center justify-center">
                      <h2 className="text-md font-bold">
                        {entry.type === 'earned' ? '+' : '-'} {entry.points}{' '}
                        Points
                      </h2>
                    </div>
                    <div className="ml-[auto] flex-col items-center justify-center">
                      <p className="text-center text-2xl font-bold text-secondary-foreground">
                        {entry.points}
                      </p>
                      <p className="text-md text-secondary-foreground">
                        ${entry.points * 0.1}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
      <Slider mode={mode} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
