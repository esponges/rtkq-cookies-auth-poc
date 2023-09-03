import Link from 'next/link';

const AuthedRoute = () => {
  return (
    <div className='text-center mt-10'>
      <h1 className='text-xl mb-5'>
        Welcome to an <b>Authenticated Route</b>
      </h1>
      <Link
        href='/'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        <span className='text-xl'>Go to back to login</span>
      </Link>
    </div>
  );
};

export default AuthedRoute;
