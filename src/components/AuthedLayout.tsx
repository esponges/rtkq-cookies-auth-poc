import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AUTHED_ROUTES = ['/authed'];

const hasAuthCookies = false;

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const isAuthedRoute = AUTHED_ROUTES.includes(router.pathname);

  useEffect(() => {
    if (isAuthedRoute && !hasAuthCookies) {
      console.log('non authed, redirecting to /');
      router.push('/');
    }
  }, [isAuthedRoute, router]);

  if (!isAuthedRoute) return children;

  return (
    <div>
      <h1>Authed Layout</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
