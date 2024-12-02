'use client';

import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { useAuthStore } from '@/app/store/useAuthStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import router from 'next/router';
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
  }, [loading, user, router]);

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

  return (
    <div className='text-white'>
      <h1 className='text-2xl font-bold mb-4'>{entry.title}</h1>
      <p>
        <b>Date:</b> {entry.date}
      </p>
      <p>
        <b>City:</b> {entry.city}
      </p>
      <p>
        <b>Country:</b> {entry.country}
      </p>
      <p>
        <b>Description:</b> {entry.description}
      </p>
      <Image
        height={300}
        width={300}
        src={entry.image}
        alt={entry.title}
        className='w-full h-auto mt-4 rounded-md'
      />
    </div>
  );
}
