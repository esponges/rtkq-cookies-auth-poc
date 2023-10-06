import Link from 'next/link';
import { useRouter } from 'next/router';

import { useLoginMutation } from '@/store/services/auth';
import { AUTH_REFRESH_TOKEN, AUTH_TOKEN, removeCookies } from '@/lib/cookies';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/auth';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signIn] = useLoginMutation();
  const { userEmail } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    try {
      await signIn().unwrap();

      router.push('/authed');
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
            <span className='text-xl'>Login</span>
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded'
          >
            <span className='text-xl'>Logout</span>
          </button>
        )}
        {/* remove cookies for testing */}
        <button
          onClick={() => removeCookies([AUTH_TOKEN, AUTH_REFRESH_TOKEN])}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded'
        >
          <span className='text-xl'>Remove cookies</span>
        </button>
      </div>
    </div>
  );
}
