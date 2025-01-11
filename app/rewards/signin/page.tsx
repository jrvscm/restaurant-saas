import { Metadata } from './next';
import RewardsSigninView from '../../(auth)/_components/rewards-signin-view';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default function Page() {
  return <RewardsSigninView />;
}
