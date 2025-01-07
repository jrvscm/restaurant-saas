'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Gift, CircleDollarSign } from 'lucide-react';

type SliderMode = 'redeem' | 'earn' | 'refer';

interface SliderProps {
  mode: SliderMode;
  isOpen: boolean;
  onClose: () => void;
}

const Slider: React.FC<SliderProps> = ({ mode, isOpen, onClose }) => {
  const renderContent = () => {
    switch (mode) {
      case 'redeem':
        return (
          <div>
            <h2 className="mb-4 text-xl font-bold">We give back</h2>
            <p className="mb-6 text-gray-600">
              Follow these steps to redeem your points:
            </p>
            <div className="relative flex flex-col items-start">
              {/* Step 1 */}
              <div className="relative flex items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-secondary-foreground">
                    1
                  </div>
                  <div className="h-12 w-[1px] bg-black/10"></div>
                </div>
                <p className="text-md ml-4 mt-4">
                  Head over to the redemption page
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-secondary-foreground">
                    2
                  </div>
                  <div className="h-12 w-[1px] bg-black/10"></div>
                </div>
                <p className="text-md ml-4 mt-4">Choose a qualified discount</p>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-secondary-foreground">
                    3
                  </div>
                </div>
                <p className="text-md ml-4 mt-4">
                  Tell our personnel at checkout
                </p>
              </div>
            </div>
            <div className="flex w-12 flex-col items-center">
              <div className="h-12 w-[1px] bg-black/10"></div>
            </div>

            {/* Rewards Section */}
            <div className="rounded-lg rounded-bl-none rounded-br-none border border-b-0 border-black/10 bg-white p-4">
              <div className="flex flex-row items-center justify-start">
                <CircleDollarSign className="mr-1 h-6 w-6 text-secondary-foreground" />
                <p className="text-sm text-gray-500">1 Dollar</p>
              </div>
              <h3 className="mb-4 mt-1 text-lg font-bold">Equals 10 Points</h3>
            </div>
            <div className="rounded-lg rounded-tl-none rounded-tr-none bg-black/10 p-4">
              <p className="text-secondary-foreground">
                Refer 5 friends and get extra rewards!
              </p>
            </div>

            {/* Referral Link */}
            <div className="mt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Link copied successfully!');
                }}
                className="flex flex-row items-center"
              >
                <input
                  type="text"
                  readOnly
                  value="https://plusrewards.com/refer/234jalkd21k"
                  className="
                        text-disabled h-[36px] flex-grow rounded-bl-md rounded-br-none rounded-tl-md rounded-tr-none border border-r-[0px] border-black/10 
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
        );
      case 'earn':
        return (
          <div>
            <h2 className="mb-4 text-xl font-bold">Earn more when you spend</h2>
            <p className="mb-6 text-gray-600">
              Follow these steps to earn rewards:
            </p>
            <div className="relative flex flex-col items-start">
              {/* Step 1 */}
              <div className="relative flex items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-secondary-foreground">
                    1
                  </div>
                  <div className="h-12 w-[1px] bg-black/10"></div>
                </div>
                <p className="text-md ml-4 mt-4">Spend money in our stores</p>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-secondary-foreground">
                    2
                  </div>
                  <div className="h-12 w-[1px] bg-black/10"></div>
                </div>
                <p className="text-md ml-4 mt-4">
                  Enter your rewards id at checkout
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-secondary-foreground">
                    3
                  </div>
                </div>
                <p className="text-md ml-4 mt-4">
                  Points are added automatically
                </p>
              </div>
            </div>
            <div className="flex w-12 flex-col items-center">
              <div className="h-12 w-[1px] bg-black/10"></div>
            </div>

            {/* Rewards Section */}
            <div className="rounded-lg rounded-bl-none rounded-br-none border border-b-0 border-black/10 bg-white p-4">
              <div className="flex flex-row items-center justify-start">
                <CircleDollarSign className="mr-1 h-6 w-6 text-secondary-foreground" />
                <p className="text-sm text-gray-500">1 Dollar</p>
              </div>
              <h3 className="mb-4 mt-1 text-lg font-bold">10 Points</h3>
            </div>
            <div className="rounded-lg rounded-tl-none rounded-tr-none bg-black/10 p-4">
              <p className="text-secondary-foreground">
                Refer 5 friends and get extra rewards!
              </p>
            </div>

            {/* Referral Link */}
            <div className="mt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Link copied successfully!');
                }}
                className="flex flex-row items-center"
              >
                <input
                  type="text"
                  readOnly
                  value="https://plusrewards.com/refer/234jalkd21k"
                  className="
                        text-disabled h-[36px] flex-grow rounded-bl-md rounded-br-none rounded-tl-md rounded-tr-none border border-r-[0px] border-black/10 
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
        );
      case 'refer':
        return (
          <div>
            <h2 className="mb-4 text-xl font-bold">We value friendship</h2>
            <p className="mb-6 text-gray-600">
              Follow these steps to earn rewards:
            </p>
            <div className="relative flex flex-col items-start">
              {/* Step 1 */}
              <div className="relative flex items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-secondary-foreground">
                    1
                  </div>
                  <div className="h-12 w-[1px] bg-black/10"></div>
                </div>
                <p className="text-md ml-4 mt-4">Share your referral link</p>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-secondary-foreground">
                    2
                  </div>
                  <div className="h-12 w-[1px] bg-black/10"></div>
                </div>
                <p className="text-md ml-4 mt-4">
                  Your friends signup using the link
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-secondary-foreground">
                    3
                  </div>
                </div>
                <p className="text-md ml-4 mt-4">Your friend places an order</p>
              </div>
            </div>
            <div className="flex w-12 flex-col items-center">
              <div className="h-12 w-[1px] bg-black/10"></div>
            </div>

            {/* Rewards Section */}
            <div className="rounded-lg rounded-bl-none rounded-br-none border border-b-0 border-black/10 bg-white p-4">
              <div className="flex flex-row items-center justify-start">
                <CircleDollarSign className="mr-1 h-6 w-6 text-secondary-foreground" />
                <p className="text-sm text-gray-500">You get</p>
              </div>
              <h3 className="mb-4 mt-1 text-lg font-bold">20 Points</h3>
              <div className="flex flex-row items-center justify-start">
                <Gift className="mr-1 h-6 w-6 text-secondary-foreground" />
                <p className="text-sm text-gray-500">They get</p>
              </div>
              <h3 className="mb-4 mt-1 text-lg font-bold">
                Discount coupon (10%)
              </h3>
            </div>
            <div className="rounded-lg rounded-tl-none rounded-tr-none bg-black/10 p-4">
              <p className="text-secondary-foreground">
                Refer 5 friends and get extra rewards!
              </p>
            </div>

            {/* Referral Link */}
            <div className="mt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Link copied successfully!');
                }}
                className="flex flex-row items-center"
              >
                <input
                  type="text"
                  readOnly
                  value="https://plusrewards.com/refer/234jalkd21k"
                  className="
                        text-disabled h-[36px] flex-grow rounded-bl-md rounded-br-none rounded-tl-md rounded-tr-none border border-r-[0px] border-black/10 
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
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full transform bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50 w-[90%] max-w-md`}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-bold">
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </h2>
        <button onClick={onClose}>
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      <div className="p-4">{renderContent()}</div>
    </div>
  );
};

export default Slider;
