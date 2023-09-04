import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { useUserDetailsQuery } from '@/store/services/user';
import { AUTH_TOKEN, getAuthCookie } from '@/lib/cookies';

type Props = {
  children: React.ReactNode;
};

const AUTHED_ROUTES = ['/authed'];

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const isAuthedRoute = AUTHED_ROUTES.includes(router.pathname);

  const userToken = getAuthCookie(AUTH_TOKEN);
  const userName = useSelector((state: RootState) => state.auth.userName);

  const { data: _, isLoading: __ } = useUserDetailsQuery({ token: userToken || ''}, {
    // conditional query fetching
    // should only fetch if the following conditions are all false
    skip: !isAuthedRoute || !userToken || !!userName,
  });
  
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
      <h1 className='mt-5 ml-5'>Welcome: <b>{userName}</b></h1>
      {children}
    </div>
  );
};

export default AuthLayout;
