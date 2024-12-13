'use client';

import { fetchImages, getCorrectCoordinates } from '@/app/api/apiImagesRequest';
import { getWeatherData } from '@/app/api/apiOpenWeatherMap';
import EntryMap from '@/app/components/EntryMap';
import ImagesGrid from '@/app/components/ImagesGrid';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { Entry } from '@/app/interfaces/entry';
import { WeatherData } from '@/app/interfaces/weatherData';
import { useAuthStore } from '@/app/store/useAuthStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin } from 'react-feather';
import useEntryStore from '../../../store/useEntryStore';

export default function EntryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [entryId, setEntryId] = useState<string | null>(null);
  const [entry, setEntry] = useState<Entry | null>(null);
  const { entries, fetchEntries } = useEntryStore();
  const { user, loading } = useAuthStore();
  const navigate = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchImagesByLocation = async () => {
      if (entry && entry.city) {
        const fetchedImages = await fetchImages(entry.city);
        setImages(fetchedImages);
      }
    };

    fetchImagesByLocation();
  }, [entry]);

  useEffect(() => {
    const getWeatherByCoordinates = async () => {
      if (entry && entry.coordinates) {
        const [lat, lon] = getCorrectCoordinates(entry.coordinates);
        try {
          const data = await getWeatherData(lat, lon);
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setWeatherData(null);
        }
      }
    };

    getWeatherByCoordinates();
  }, [entry]);

  useEffect(() => {
    const unwrapParams = async () => {
      const { id } = await params;
      setEntryId(id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!loading && !user) {
      navigate.push('/login');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const fetchEntryDetails = async () => {
      if (!entryId) return;

      // Check if the entry is already in the store
      const existingEntry = entries.find((entry) => entry.id === entryId);
      if (existingEntry) {
        setEntry(existingEntry);
      } else {
        const userId = user?.uid;
        if (userId) {
          fetchEntries(userId);
        }

        const fetchedEntry = useEntryStore
          .getState()
          .entries.find((entry) => entry.id === entryId);
        if (fetchedEntry) setEntry(fetchedEntry);
      }
    };

    fetchEntryDetails();
  }, [entryId, entries, fetchEntries, user]);

  if (!entry) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=' mx-auto text-white w-full'
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='relative h-[400px] w-full rounded-md overflow-hidden shadow-lg mb-8'
      >
        <Image
          src={entry.image}
          alt={entry.title}
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

      {/* Details and Map */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Left: Trip Details */}
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
              <p className=' font-bold'>Weather:</p>
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

        {/* Right: Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='h-[300px] rounded-md shadow-lg overflow-hidden bg-black/30'
        >
          <EntryMap coordinates={entry.coordinates} />
        </motion.div>
      </div>

      {/* Photo Gallery */}
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

      {/* Back Button */}
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
