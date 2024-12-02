'use client';

import EntryMap from '@/app/components/EntryMap';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { useAuthStore } from '@/app/store/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  }, [entryId, entries, fetchEntries]);

  if (!entry) {
    return <LoadingSpinner />;
  }
  const images = [
    '/globe-img.jpeg',
    '/globe-img.jpeg',
    '/globe-img.jpeg',
    '/globe-img.jpeg',
    '/globe-img.jpeg',
    '/globe-img.jpeg',
    '/globe-img.jpeg',
    '/globe-img.jpeg',
  ];

  return (
    <div className='text-white w-[90%] mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 max-w-7xl mt-20'>
      {/* Image Section */}
      <div className='relative col-span-6 md:col-span-4 h-[300px] overflow-hidden rounded-md'>
        <Image
          src={entry.image}
          alt={entry.title}
          layout='fill'
          objectFit='cover'
          className='brightness-75'
        />
        <div className='absolute bottom-4 left-4 text-white'>
          <h1 className='text-3xl font-bold'>{entry.title}</h1>
          <p className='text-sm'>{entry.date}</p>
        </div>
      </div>

      {/* Map Section */}
      <div className='col-span-6 md:col-span-2 h-[300px] rounded-md shadow-md bg-white/10 overflow-hidden'>
        <EntryMap coordinates={entry.coordinates} />
      </div>

      {/* Details Section & Images */}
      <div className='col-span-6 grid grid-cols-3 gap-4'>
        {/* Details Section */}
        <div className='col-span-1 p-4 bg-white/5 rounded-md shadow-md'>
          <p className='text-lg font-medium'>
            {entry.city}, {entry.country}
          </p>
          <p className='mt-4 text-sm text-gray-300'>{entry.description}</p>
        </div>

        {/* Scrollable Row of Images */}
        <div className='col-span-2 p-4 bg-white/5 rounded-md shadow-md'>
          <h2 className='text-lg font-bold mb-4'>Photos of {entry.city}</h2>
          <div className='flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300'>
            {images.map((image, index) => (
              <div
                key={index}
                className='flex-shrink-0 w-[250px] h-[150px] overflow-hidden rounded-lg shadow-md'
              >
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={250}
                  height={150}
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=''>
        <Link href={'/myTrips'}>Go Back to My Trips</Link>
      </div>
    </div>
  );
}
