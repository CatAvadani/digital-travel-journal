'use client';

import EntryMap from '@/app/components/EntryMap';
import ImagesGrid from '@/app/components/ImagesGrid';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { useAuthStore } from '@/app/store/useAuthStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin } from 'react-feather';
import useEntryStore, { Entry } from '../../store/useEntryStore';

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

  const images = [
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1487622750296-6360190669a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1699566448055-671c8dbcc7ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1465070845512-2b2dbdc6df66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
    'https://plus.unsplash.com/premium_photo-1676139860329-4997a02843c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHx0cmF2ZWx8ZW58MHx8MHx8fDA%3D',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='max-w-7xl mx-auto p-6 text-white mt-20 w-full'
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg mb-8'
      >
        <Image
          src={entry.image}
          alt={entry.title}
          layout='fill'
          objectFit='cover'
          className='brightness-50'
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='absolute bottom-6 left-6'
        >
          <h1 className='text-4xl font-bold'>{entry.title}</h1>
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
          className='p-6 bg-black/20 md:col-span-2 rounded-lg'
        >
          <h2 className='text-2xl font-semibold mb-4'>Details</h2>
          <p className='flex items-center gap-2'>
            <MapPin className='text-[#E91E63]' /> {entry.city}, {entry.country}
          </p>
          <p className='mt-4'>{entry.description}</p>
          <p className='mt-4 text-sm text-white/80'>Weather: Sunny, 22°C</p>
        </motion.div>

        {/* Right: Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='h-[300px] rounded-lg shadow-lg overflow-hidden bg-black/30'
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
        <Link href='/myTrips'>
          <p className='text-white/80 hover:underline flex justify-start items-center gap-2'>
            <ArrowLeft /> Back to My Trips
          </p>
        </Link>
      </motion.div>
    </motion.div>
  );
}
