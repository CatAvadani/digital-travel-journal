import Link from 'next/link';

export default function Home() {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <div className='absolute z-50 top-1/2 -ml-20  transform -translate-y-1/2 -rotate-90 text-white text-lg md:text-2xl lg:text-3xl font-semibold tracking-widest opacity-80'>
        Digital Travel Journal
      </div>

      <video
        className='absolute top-0 left-0 w-full h-full object-cover'
        autoPlay
        muted
        loop
        preload='auto'
        playsInline
      >
        <source src='/globe-video-1.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Glass Effect Overlay */}
      <div
        className='absolute top-0 left-0 h-full w-1/2 bg-white bg-opacity-10 backdrop-blur-md backdrop-filter z-10'
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
      ></div>

      <div className='z-20 text-white text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[70%]'>
        <h1 className='text-3xl md:text-5xl lg:text-7xl mb-16'>
          Turn Your Adventures into Timeless Stories
        </h1>
        <Link
          href='/explore'
          className='bg-gradient-to-r from-[#D92F91] to-[#800080] hover:from-[#C71585] hover:to-[#4B0082] px-16 py-3 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out'
        >
          Begin Your Journey
        </Link>
      </div>
    </div>
  );
}
