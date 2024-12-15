'use client';

import EntryMap from '@/app/components/EntryMap';
import ImagesGrid from '@/app/components/ImagesGrid';
import { Entry } from '@/app/interfaces/entry';
import { WeatherData } from '@/app/interfaces/weatherData';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'react-feather';

interface EntryDetailsClientProps {
  entry: Entry;
  images: string[];
  weatherData: WeatherData | null;
}

export default function EntryDetailsClient({
  entry,
  images,
  weatherData,
}: EntryDetailsClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='mx-auto text-white w-full'
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='relative h-[400px] w-full rounded-md overflow-hidden shadow-lg mb-8'
      >
        <Image
          src={entry.image}
          alt=''
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={true}
          className='object-cover'
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-white/20 rounded-md backdrop-blur-xl px-8 py-2'
        >
          <h1 className='text-xl sm:text-4xl font-bold'>{entry.title}</h1>
          <p className='text-lg'>{entry.date}</p>
        </motion.div>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='p-6 bg-black/20 md:col-span-2 rounded-md'
        >
          <h2 className='text-2xl font-semibold mb-4'>Details</h2>
          <p className='flex items-center gap-2'>
            <MapPin className='text-[#E91E63]' /> {entry.city}, {entry.country}
          </p>
          <p className='mt-4'>{entry.description}</p>
          {weatherData ? (
            <div className='mt-4 flex items-center justify-start gap-4 text-lg text-white/80'>
              <h2 className='font-bold'>Weather:</h2>
              <p className='capitalize'>{weatherData.weather[0].description}</p>
              <p className='font-normal'>
                {Math.floor(weatherData.main.temp)}°C
              </p>
            </div>
          ) : (
            <p className='mt-4 text-sm text-white/80'>
              Weather data unavailable
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='h-[300px] rounded-md shadow-lg overflow-hidden bg-black/30'
        >
          <EntryMap coordinates={entry.coordinates} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className='mt-10'
      >
        <h2 className='text-2xl font-semibold mb-4 pl-6'>
          Photos of {entry.city}
        </h2>
        <ImagesGrid images={images} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className='mt-8'
      >
        <Link href='/dashboard'>
          <p className='text-white/80 hover:underline flex justify-start items-center gap-2'>
            <ArrowLeft /> Back to Dashboard
          </p>
        </Link>
      </motion.div>
    </motion.div>
  );
}
