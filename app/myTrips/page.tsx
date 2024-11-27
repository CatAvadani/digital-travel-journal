'use client';
import { redirect } from 'next/navigation';
import EntryCard from '../components/EntryCard';
import { useAuthStore } from '../store/useAuthStore';
import useEntryStore from '../store/useEntryStore';

export default function MyTrips() {
  const { user, loading } = useAuthStore();
  const { entries } = useEntryStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirect('/login');
  }

  return (
    <div className=' flex flex-col gap-2 mt-28 bg-white/5 w-[80%] '>
      {entries &&
        entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)}
    </div>
  );
}
