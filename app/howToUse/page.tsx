import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import InstructionsCard from '../components/InstructionsCard';
import cardData from '../data/cardData';
import { instructionsData } from '../data/instructionsData';

export default function HowToUse() {
  return (
    <main className='relative pb-28 sm:max-w-7xl mt-6'>
      <section
        id='top-section'
        className='text-white text-center flex flex-col gap-4 sm:gap-10 mt-28 sm:mt-40 max-w-[90%] mx-auto '
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
      <section className='flex justify-center items-center gap-10 py-10 sm:py-16'>
        <Link
          href='/mapView'
          className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] px-4 sm:px-16 py-2 sm:py-3 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out'
        >
          Get Started
        </Link>
        <Link
          href='#bottom-section'
          className='text-white/80 block hover:underline text-base'
        >
          Learn More <ArrowRight className='size-6 inline' />
        </Link>
      </section>
      <section
        id='bottom-section'
        className='text-white text-center  flex flex-col gap-4 sm:gap-10 mt-10 max-w-[90%] mx-auto'
      >
        <h1 className='text-2xl sm:text-3xl max-w-sm sm:max-w-3xl mx-auto font-bold leading-relaxed sm:leading-normal tracking-wide'>
          Discover Your Travel Adventures <br /> Like Never Before
        </h1>
        <p className='text-normal sm:text-lg sm:max-w-3xl text-center mx-auto text-white/80 max-w-sm mb-4'>
          Our platform allows you to visualize your travel experiences on a map,
          making it easy to see where you&apos;ve been and what you&apos;ve
          done.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          {instructionsData.map((card) => (
            <InstructionsCard key={card.id} {...card} />
          ))}
        </div>
        <Link
          href='/login  '
          className='text-pink-500 block hover:underline font-bold text-base sm:text-lg text-center '
        >
          Sign Up Now <ArrowRight className='size-6 inline' />
        </Link>
      </section>
      <Footer positionClass='left-1/2 -translate-x-1/2 bottom-10' />
    </main>
  );
}
