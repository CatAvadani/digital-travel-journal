import Link from 'next/link';
import { Image as ImageIcon, MapPin } from 'react-feather';

export default function Dashboard() {
  return (
    <div className='min-h-screen md:p-4'>
      <div className='mb-8 sm:my-10'>
        <h1 className='text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4'>
          Welcome to Your Dashboard
        </h1>
        <p className='text-sm sm:text-base text-white/80'>
          Select an option from the sidebar to get started.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full'>
        <div className='bg-black/20 backdrop-blur-lg rounded-md px-2 py-4 sm:p-6 border border-white/5 hover:border-white/10 transition-all duration-300 group'>
          <div className='flex items-start justify-between mb-3 sm:mb-4'>
            <h2 className='text-lg sm:text-xl font-semibold text-white'>
              Add a New Location
            </h2>
            <MapPin className='text-pink-500 group-hover:scale-110 transition-transform duration-300' />
          </div>
          <p className='text-sm sm:text-base text-white/80 mb-4 sm:mb-6'>
            Add a new location to your saved trips and make your travel memories
            last forever.
          </p>
          <Link
            href='/mapView'
            className='inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base text-white font-medium primary-btn'
          >
            <MapPin className='w-4 h-4 sm:w-5 sm:h-5' />
            Add Location
          </Link>
        </div>

        <div className='bg-black/20 backdrop-blur-lg rounded-md px-2 py-4 sm:p-6 border border-white/5 hover:border-white/10 transition-all duration-300 group'>
          <div className='flex items-start justify-between mb-3 sm:mb-4'>
            <h2 className='text-lg sm:text-xl font-semibold text-white'>
              Create a Postcard
            </h2>
            <ImageIcon className='text-pink-500 group-hover:scale-110 transition-transform duration-300' />
          </div>
          <p className='text-sm sm:text-base text-white/80 mb-4 sm:mb-6'>
            Use your saved trip images to create beautiful postcards and share
            them with friends!
          </p>
          <Link
            href='/dashboard/postcard-creator'
            className='inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base text-white font-medium primary-btn'
          >
            <ImageIcon className='w-4 h-4 sm:w-5 sm:h-5' />
            Start Creating
          </Link>
        </div>
      </div>
    </div>
  );
}
