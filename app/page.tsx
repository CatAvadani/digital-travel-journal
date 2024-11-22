import GlassCard from './components/glassCard';
import cardData from './data/cardData';

export default function Home() {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
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
      <div className=' z-10 text-white text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[70%]'>
        <h1 className='text-3xl md:text-5xl lg:text-7xl mb-16'>
          {' '}
          Turn Your Adventures into Timeless Stories
        </h1>

        <button className='bg-gradient-to-r from-[#D92F91] to-[#800080] hover:from-[#C71585] hover:to-[#4B0082] px-16 py-3 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out '>
          Begin Your Journey
        </button>
      </div>
      <div className='absolute -bottom-10 w-full flex justify-center gap-4'>
        {cardData.map((item) => (
          <GlassCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
      {/* <div className='absolute inset-0 bg-black opacity-20 z-0'></div> */}
    </div>
  );
}
