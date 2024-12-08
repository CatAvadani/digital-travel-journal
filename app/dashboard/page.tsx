import Link from 'next/link';

export default function DashboardHome() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4 '>Welcome to Your Dashboard</h1>
      <p>Select an option from the sidebar to get started.</p>
      <div className='px-4 py-8 flex flex-col gap-2 bg-black/30 w-full  md:w-[50%] rounded-md shadow-lg text-white mt-11 border border-white/10'>
        <h2 className='text-lg font-bold mb-2'>Create a Postcard</h2>
        <p className='text-sm mb-4'>
          Use your saved trip images to create beautiful postcards and share
          them with friends!
        </p>
        <Link
          href='/dashboard/postcard-creator'
          className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] text-white text-sm md:text-lg px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-[#E91E63]/80 hover:to-[#4B0082]/80 transition-all duration-300 ease-in-out'
        >
          Start Creating
        </Link>
      </div>
    </div>
  );
}
