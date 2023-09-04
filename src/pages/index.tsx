import Link from 'next/link';
import { useRouter } from 'next/router';

import { useLoginMutation } from '@/store/services/auth';

export default function Home() {
  const router = useRouter();
  const [signIn] = useLoginMutation();

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

  return (
    <div className='text-center mt-10'>
      <h1 className='text-xl mb-5'>Welcome to the login</h1>
      <div className='mb-5 flex justify-center'>
        <Link
          href='/authed'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          <span className='text-xl'>Go to authed route</span>
        </Link>
        <button
          onClick={handleLogin}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-5 rounded'
        >
          <span className='text-xl'>Login</span>
        </button>
      </div>
    </div>
  );
}
