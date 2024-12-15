'use client';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'react-feather';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import InstructionsCard from '../components/InstructionsCard';
import { cardData } from '../data/cardData';
import { instructionsData } from '../data/instructionsData';

export default function HowToUse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <main className='relative pb-28 sm:max-w-7xl w-full mt-6 sm:mt-28 mx-auto '>
      <motion.section
        ref={ref}
        initial='hidden'
        animate={mainControls}
        variants={containerVariants}
        id='top-section'
        className='w-full max-w-[90%] sm:max-w-full mx-auto text-center flex flex-col gap-4 sm:gap-10 mt-28 sm:mt-20 text-white'
      >
        <motion.h1
          variants={itemVariants}
          className='text-xl sm:text-3xl max-w-sm sm:max-w-3xl mx-auto font-bold leading-relaxed sm:leading-normal tracking-wide  drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]'
        >
          Easily Document Your Travel <br /> Adventures
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className='text-normal sm:text-lg sm:max-w-3xl text-center mx-auto text-white/80 max-w-sm mb-4  drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]'
        >
          Creating and managing your travel entries is simple and intuitive.
          Capture your experiences with photos, locations, and personal notes.
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mx-auto lg:gap-3 mb-6'
        >
          {cardData.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                },
              }}
              viewport={{ once: true }}
            >
              <GlassCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 0.6 },
        }}
        viewport={{ once: true }}
        className='flex justify-center items-center gap-4 sm:gap-10 py-10 sm:py-16'
      >
        <motion.div>
          <Link
            href='/mapView'
            className='primary-btn px-4 sm:px-16 py-2 sm:py-3 rounded-full text-white shadow-lg '
          >
            Get Started
          </Link>
        </motion.div>

        <Link
          href='#bottom-section'
          className='text-white/80 block hover:underline text-base drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]'
        >
          Learn More <ArrowRight className='size-6 inline' />
        </Link>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
          },
        }}
        viewport={{ once: true }}
        id='bottom-section'
        className='w-full max-w-[90%] sm:max-w-full mx-auto text-center flex flex-col gap-4 sm:gap-10 mt-28 text-white'
      >
        <h1 className='text-xl sm:text-3xl max-w-sm sm:max-w-3xl mx-auto font-bold leading-relaxed sm:leading-normal tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]'>
          Discover Your Travel Adventures <br /> Like Never Before
        </h1>

        <h2 className='text-normal sm:text-lg sm:max-w-3xl text-center mx-auto text-white/80 max-w-sm mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]'>
          Our platform allows you to visualize your travel experiences on a map,
          making it easy to see where you&apos;ve been and what you&apos;ve
          done.
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:mx-auto gap-3 mb-6'>
          {instructionsData.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: 'easeOut',
                },
              }}
              viewport={{ once: true }}
            >
              <InstructionsCard {...card} />
            </motion.div>
          ))}
        </div>

        <Link
          href='/login'
          className='text-pink-500 block hover:underline font-bold text-base sm:text-lg text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)'
        >
          Sign Up Now <ArrowRight className='size-6 inline' />
        </Link>
      </motion.section>

      <Footer positionClass='sm:left-1/2 sm:-translate-x-1/2 bottom-10' />
    </main>
  );
}
