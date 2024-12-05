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
    <main className='relative pb-28 sm:max-w-7xl mt-6'>
      <motion.section
        ref={ref}
        initial='hidden'
        animate={mainControls}
        variants={containerVariants}
        id='top-section'
        className='text-white text-center flex flex-col gap-4 sm:gap-10 mt-28 sm:mt-40 max-w-[90%] mx-auto'
      >
        <motion.h1
          variants={itemVariants}
          className='text-2xl sm:text-3xl max-w-sm sm:max-w-3xl mx-auto font-bold leading-relaxed sm:leading-normal tracking-wide'
        >
          Easily Document Your Travel <br /> Adventures
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className='text-normal sm:text-lg sm:max-w-3xl text-center mx-auto text-white/80 max-w-sm mb-4'
        >
          Creating and managing your travel entries is simple and intuitive.
          Capture your experiences with photos, locations, and personal notes.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className='flex flex-col md:flex-row justify-center items-center gap-3'
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
        className='flex justify-center items-center gap-10 py-10 sm:py-16'
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href='/mapView'
            className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] px-4 sm:px-16 py-2 sm:py-3 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out'
          >
            Get Started
          </Link>
        </motion.div>

        <Link
          href='#bottom-section'
          className='text-white/80 block hover:underline text-base'
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
        className='text-white text-center flex flex-col gap-4 sm:gap-10 mt-10 max-w-[90%] mx-auto'
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

        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href='/login'
            className='text-pink-500 block hover:underline font-bold text-base sm:text-lg text-center'
          >
            Sign Up Now <ArrowRight className='size-6 inline' />
          </Link>
        </motion.div>
      </motion.section>

      <Footer positionClass='left-1/2 -translate-x-1/2 bottom-10' />
    </main>
  );
}
