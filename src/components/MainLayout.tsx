import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { useUserDetailsQuery } from '@/store/services/user';
import {
  AUTH_TOKEN,
  getAuthCookie,
} from '@/lib/cookies';
import Navbar from './Navbar';

type Props = {
  children: React.ReactNode;
};

const AUTHED_ROUTES = ['/authed'];

const MainLayout = ({ children }: Props) => {
  const router = useRouter();
  const isAuthedRoute = AUTHED_ROUTES.includes(router.pathname);
  const { token, refreshToken } = useSelector((state: RootState) => state.auth);

  const userToken = getAuthCookie(AUTH_TOKEN);
  const userName = useSelector((state: RootState) => state.auth.userName);

  // fetch user details when non present - probably after a page refresh

  /*
   * THE BEST APPROACH
   * see middleware.ts for handling redirections on server side
   */

  // const hasValidAuth = hasValidAuthTokens();
  // useEffect(() => {
  //   if (isAuthedRoute && !hasValidAuth) {
  //     console.log('non authed, redirecting to login');
  //     router.push('/');
  //   }
  // }, [isAuthedRoute, router, hasValidAuth]);

  if (!isAuthedRoute) return children;

  return (
    <div>
      <Navbar
        // isLoading={isLoading}
        tokenExpiryDate={token} 
        refreshTokenExpiryDate={refreshToken}
      />
      {children}
    </div>
  );
};

export default MainLayout;