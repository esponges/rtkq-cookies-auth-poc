import { hasValidAuthTokens } from '@/lib/cookies';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AUTHED_ROUTES = ['/authed'];

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const isAuthedRoute = AUTHED_ROUTES.includes(router.pathname);
  const hasValidAuth = hasValidAuthTokens();

  useEffect(() => {
    if (isAuthedRoute && !hasValidAuth) {
      console.log('non authed, redirecting to login');
      router.push('/');
    }
  }, [isAuthedRoute, router, hasValidAuth]);

  if (!isAuthedRoute) return children;

  return (
    <div>
      <h1>Authed Layout</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
