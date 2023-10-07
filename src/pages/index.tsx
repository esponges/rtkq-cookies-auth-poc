import Link from 'next/link';

import { useLoginMutation } from '@/store/services/auth';
import { AUTH_REFRESH_TOKEN, AUTH_TOKEN, removeCookies } from '@/lib/cookies';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/auth';

export default function Home() {
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useLoginMutation();
  const { userEmail } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    try {
      await signIn().unwrap();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div className='text-center mt-10'>
      <h1 className='text-xl mb-5'>Welcome {userEmail || 'Guest'}</h1>
      <div className='mb-5 flex justify-center'>
        <Link
          href='/authed'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          <span className='text-xl'>Go to authed route</span>
        </Link>
        {!userEmail ? (
          <button
            onClick={handleLogin}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-5 rounded'
          >
            <span className='text-xl'>{isLoading ? 'Logging in...' : 'Login'}</span>
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded'
          >
            <span className='text-xl'>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
