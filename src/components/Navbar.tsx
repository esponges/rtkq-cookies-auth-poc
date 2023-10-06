import { RootState } from '@/store';
import { useSelector } from 'react-redux';

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
  const { userEmail } = useSelector((state: RootState) => state.auth);

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
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          {isLoading ? 'Loading...' : 'Button 1'}
        </button>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4'>
          Button 2
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
