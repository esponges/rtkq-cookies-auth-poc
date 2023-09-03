import Link from 'next/link';

export default function Home() {
  return (
    <div className='text-center mt-10'>
      <h1 className='text-xl mb-5'>Welcome to the login</h1>
      <Link
        href='/authed'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        <span className='text-xl'>Go to authed route</span>
      </Link>
    </div>
  );
}
