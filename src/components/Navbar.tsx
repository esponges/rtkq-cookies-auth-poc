import { RootState } from '@/store';
import { expireToken } from '@/store/slices/auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  isLoading?: boolean;
  tokenExpiryDate?: string;
  refreshTokenExpiryDate?: string;
};

const Navbar = ({
  isLoading,
  tokenExpiryDate,
  refreshTokenExpiryDate,
}: Props) => {
  const [redirectCount, setRedirectCount] = useState(5);
  const hasStartedCountRef = useRef(false);

  const dispatch = useDispatch();
  const { push } = useRouter();
  const { userEmail } = useSelector((state: RootState) => state.auth);

  const hasValidToken =
    new Date().getTime() < new Date(tokenExpiryDate || 0).getTime();

  const handleDecreaseRedirectCount = useCallback(() => {
    setInterval(() => {
      setRedirectCount((prev) => prev - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!hasValidToken && !hasStartedCountRef.current) {
      hasStartedCountRef.current = true;
      handleDecreaseRedirectCount();
    }
  }, [hasValidToken, handleDecreaseRedirectCount]);

  const handleExpireToken = (name: string[]) => {
    dispatch(expireToken(name));
  };

  // navbar component that displays the user's email or 'Guest'
  return (
    <nav className='flex flex-row justify-between items-center bg-gray-200 p-4'>
      <h1 className='text-gray-700'>Hi {userEmail || 'Guest'}</h1>
      {/* show token dates */}
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
        <button
          onClick={() => handleExpireToken(['token'])}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4'
        >
          Expire token
        </button>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4'>
          Expire refresh token
        </button>
      </div>
      {/* show redirect count if there's no valid token */}
      {!hasValidToken && (
        <div className='flex flex-col text-gray-700'>
          <span className='text-sm'>
            Redirecting to login page in {redirectCount} seconds
          </span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
