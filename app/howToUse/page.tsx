import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import GlassCard from '../components/GlassCard';
import cardData from '../data/cardData';

export default function HowToUse() {
  return (
    <main>
      <section
        id='top-section'
        className=' text-white text-center flex flex-col gap-4 sm:gap-10 mt-28 sm:mt-40 max-w-[90%] mx-auto'
      >
        <h1 className='text-2xl sm:text-3xl max-w-sm sm:max-w-3xl mx-auto font-bold leading-relaxed sm:leading-normal tracking-wide'>
          Easily Document Your Travel <br /> Adventures
        </h1>
        <p className='text-normal sm:text-lg sm:max-w-3xl text-center mx-auto text-white/80 max-w-sm mb-4'>
          Creating and managing your travel entries is simple and intuitive.
          Capture your experiences with photos, locations, and personal notes.
        </p>
        <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
          {cardData.map((card) => (
            <GlassCard key={card.title} {...card} />
          ))}
        </div>
      </section>
      <section className='flex justify-center items-center gap-10 py-10 sm:py-16 '>
        <Link
          href='/mapView'
          className='bg-gradient-to-r  from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] px-4 sm:px-16 py-3 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out'
        >
          Get Started
        </Link>
        <Link
          href={'#'}
          className=' text-white/80 block hover:underline text-sm  
        '
        >
          Learn More <ArrowRight className='size-6 inline' />
        </Link>
      </section>
      <section
        id='bottom-section'
        className=' text-white text-center flex flex-col gap-4 sm:gap-10 mt-28 max-w-[90%] mx-auto'
      >
        <h1 className='text-2xl sm:text-3xl max-w-sm sm:max-w-3xl mx-auto font-bold leading-relaxed sm:leading-normal tracking-wide'>
          Discover Your Travel Adventures <br /> Like Never Before
        </h1>
        <p className='text-normal sm:text-lg sm:max-w-3xl text-center mx-auto text-white/80 max-w-sm mb-4'>
          Our platform allows you to visualize your travel experiences on a map,
          making it easy to see where you&apos;ve been and what you&apos;ve
          done.
        </p>

        <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
          {cardData.map((card) => (
            <GlassCard key={card.title} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
}
