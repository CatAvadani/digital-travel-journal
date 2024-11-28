'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EntryCard from '../components/EntryCard';
import { useAuthStore } from '../store/useAuthStore';
import useEntryStore from '../store/useEntryStore';

export default function MyTrips() {
  const { user, loading } = useAuthStore();
  const { entries, fetchEntries, deleteEntry } = useEntryStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchEntries(user.uid);
    }
  }, [user, fetchEntries]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  return (
    <div className=' flex flex-col gap-2 sm:mt-40 w-[92%] sm:w-[80%] '>
      <div className='flex justify-between items-center mb-4 text-base font-bold text-white bg-white/10 p-2 rounded-md'>
        <div className=' w-1/2 items-start '>
          <h1>My Trips</h1>
        </div>
        <div className=' hidden sm:flex sm:items-start  w-1/2'>
          <p>Date</p>
        </div>
      </div>
      {entries.length === 0 ? (
        <p className=' text-white'>
          No trips found. Add a trip to get started!
        </p>
      ) : (
        entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onDelete={() => deleteEntry(entry.id)}
          />
        ))
      )}
    </div>
  );
}
