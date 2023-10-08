import {
  AUTH_REFRESH_TOKEN,
  AUTH_TOKEN,
  getValidAuthTokens,
} from '@/lib/cookies';
import { RootState } from '@/store';
import { useGetAuthDataQuery } from '@/store/services/auth';
import { expireToken, logout } from '@/store/slices/auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  tokenExpiryDate?: string;
  refreshTokenExpiryDate?: string;
};

const Navbar = ({ tokenExpiryDate, refreshTokenExpiryDate }: Props) => {
  const [redirectCount, setRedirectCount] = useState(10);
  const hasStartedCountRef = useRef(false);

  const dispatch = useDispatch();
  const { push } = useRouter();
  const { userEmail } = useSelector((state: RootState) => state.auth);

  const { token, refreshToken } = getValidAuthTokens();

  // TODO: handle case when user refreshed the app and we need to get auth
  // details using the existing token
  const { error: authDetailsFetchError, isLoading } = useGetAuthDataQuery(
    { token: token || '' },
    {
      skip: !!userEmail || !token,
    }
  );

  const handleDecreaseRedirectCount = useCallback(() => {
    setInterval(() => {
      setRedirectCount((prev) => prev - 1);
    }, 1000);
  }, []);

  // TODO: handle case when the token is expired and we need to get a new one
  // using the refresh token

  const handleLogout = useCallback(() => {
    push('/');
    dispatch(logout());
  }, [dispatch, push]);

  useEffect(() => {
    if (redirectCount === 0) {
      handleLogout();
    }

    if (authDetailsFetchError || !token && !hasStartedCountRef.current) {
      hasStartedCountRef.current = true;
      handleDecreaseRedirectCount();
    }
  }, [
    redirectCount,
    handleLogout,
    authDetailsFetchError,
    handleDecreaseRedirectCount,
    token,
  ]);

  const handleExpireToken = (name: string[]) => {
    dispatch(expireToken(name));
  };

  return (
    <nav className='flex flex-row justify-between items-center bg-gray-200 p-4'>
      {isLoading ? (
        <h1 className='text-gray-700'>Getting auth details...</h1>
      ) : (
        <h1 className='text-gray-700'>Hi {userEmail || 'Guest'}</h1>
      )}
      <div className='flex flex-col text-gray-700'>
        {!!tokenExpiryDate && (
          <span className='text-sm'>
            Token expires at: {tokenExpiryDate.toLocaleString()}
          </span>
        )}
        {!!refreshTokenExpiryDate && (
          <span className='text-sm'>
            Refresh token expires at: {refreshTokenExpiryDate.toLocaleString()}
          </span>
        )}
      </div>
      <div className='flex flex-row'>
        {token ? (
          <button
            onClick={() => handleExpireToken([AUTH_TOKEN])}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4'
          >
            Expire token
          </button>
        ) : null}
        {refreshToken ? (
          <button
            onClick={() => handleExpireToken([AUTH_REFRESH_TOKEN])}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4'
          >
            Expire refresh token
          </button>
        ) : null}
      </div>
      {!token && refreshToken && (
        <div className='flex flex-col text-gray-700'>
          <span className='text-sm'>
            Token expired, redirecting in: {redirectCount} seconds
          </span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
