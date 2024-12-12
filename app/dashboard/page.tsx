import Link from 'next/link';
import { Image as ImageIcon, MapPin } from 'react-feather';

export default function Dashboard() {
  return (
    <div className='min-h-screen bg-black/10 p-8'>
      <div className='mb-12'>
        <h1 className='text-3xl font-bold text-white mb-4'>
          Welcome to Your Dashboard
        </h1>
        <p className='text-gray-400'>
          Select an option from the sidebar to get started.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-black/20 backdrop-blur-lg rounded-md p-6 border border-white/5 hover:border-white/10 transition-all duration-300 group'>
          <div className='flex items-start justify-between mb-4'>
            <h2 className='text-xl font-semibold text-white'>
              Add a New Location
            </h2>
            <MapPin className='text-pink-500 group-hover:scale-110 transition-transform duration-300' />
          </div>
          <p className='text-gray-400 mb-6'>
            Add a new location to your saved trips and make your travel memories
            last forever.
          </p>
          <Link
            href='/mapView'
            className='inline-flex items-center gap-2 px-6 py-3   rounded-md text-white font-medium  transition-all duration-300 bg-gradient-to-r from-[#E91E63] to-[#4B0082]  hover:from-[#E91E63]/80 hover:to-[#4B0082]/80'
          >
            <MapPin className='w-5 h-5' />
            Add Location
          </Link>
        </div>

        <div className='bg-black/20 backdrop-blur-lg rounded-md p-6 border border-white/5 hover:border-white/10 transition-all duration-300 group'>
          <div className='flex items-start justify-between mb-4'>
            <h2 className='text-xl font-semibold text-white'>
              Create a Postcard
            </h2>
            <ImageIcon className='text-pink-500 group-hover:scale-110 transition-transform duration-300' />
          </div>
          <p className='text-gray-400 mb-6'>
            Use your saved trip images to create beautiful postcards and share
            them with friends!
          </p>
          <Link
            href='/dashboard/postcard-creator'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-medium  transition-all duration-300 bg-gradient-to-r from-[#E91E63] to-[#4B0082]  hover:from-[#E91E63]/80 hover:to-[#4B0082]/80'
          >
            <ImageIcon className='w-5 h-5' />
            Start Creating
          </Link>
        </div>
      </div>
    </div>
  );
}
