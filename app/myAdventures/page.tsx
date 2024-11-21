'use client';
import { redirect } from 'next/navigation';
import { useAuthStore } from '../lib/store';

export default function MyAdventures() {
  const { user } = useAuthStore();
  if (!user) {
    redirect('/login');
  }
  return (
    <div>
      <h1 className='text-4xl'>My Adventures</h1>
    </div>
  );
}
