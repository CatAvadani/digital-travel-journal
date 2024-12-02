'use client';

import EntryMap from '@/app/components/EntryMap';
import ImagesGrid from '@/app/components/ImagesGrid';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { useAuthStore } from '@/app/store/useAuthStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MapPin } from 'react-feather';
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
    <div className='max-w-7xl mx-auto p-6 text-white mt-20 w-full'>
      {/* Hero Section */}
      <div className='relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg mb-8'>
        <Image
          src={entry.image}
          alt={entry.title}
          layout='fill'
          objectFit='cover'
          className='brightness-50'
        />
        <div className='absolute bottom-6 left-6'>
          <h1 className='text-4xl font-bold'>{entry.title}</h1>
          <p className='text-lg'>{entry.date}</p>
        </div>
      </div>

      {/* Details and Map */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Left: Trip Details */}
        <div className='p-6 bg-black/30 md:col-span-2 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Details</h2>
          <p className='flex items-center gap-2'>
            <MapPin className='text-[#E91E63]' /> {entry.city}, {entry.country}
          </p>
          <p className='mt-4'>{entry.description}</p>
          <p className='mt-4 text-sm text-gray-400'>Weather: Sunny, 22°C</p>
          <div className='flex gap-2 mt-4'>
            <span className='bg-[#E91E63] text-white px-2 py-1 rounded-full text-sm'>
              #Adventure
            </span>
            <span className='bg-[#E91E63] text-white px-2 py-1 rounded-full text-sm'>
              #Cultural
            </span>
          </div>
        </div>

        {/* Right: Map */}
        <div className='h-[300px] rounded-lg shadow-lg overflow-hidden bg-black/30'>
          <EntryMap coordinates={entry.coordinates} />
        </div>
      </div>

      {/* Photo Gallery */}
      <div className='mt-10'>
        <h2 className='text-2xl font-semibold mb-4'>Photos of {entry.city}</h2>
        <ImagesGrid images={images} />
      </div>

      {/* Back Button */}
      <div className='mt-8'>
        <Link href='/myTrips'>
          <p className='text-[#E91E63] hover:underline'>← Back to My Trips</p>
        </Link>
      </div>
    </div>
  );
}
