import Link from 'next/link';

export default function DashboardHome() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4 '>Welcome to Your Dashboard</h1>
      <p>Select an option from the sidebar to get started.</p>
      <div className='p-4 bg-gradient-to-r from-[#E91E63] to-[#4B0082] rounded-md shadow-lg text-white mt-11'>
        <h2 className='text-lg font-bold mb-2'>Create a Postcard</h2>
        <p className='text-sm mb-4'>
          Use your saved trip images to create beautiful postcards and share
          them with friends!
        </p>
        <Link
          href='/dashboard/postcard-creator'
          className='bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200'
        >
          Start Creating
        </Link>
      </div>
    </div>
  );
}
