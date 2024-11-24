'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../lib/useAuthStore';

// Dynamically load the Map component to ensure client-side rendering
const Map = dynamic(() => import('../components/map'), { ssr: false });

export default function Explore() {
  const { user, loading } = useAuthStore();
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAuthResolved(true);
    }
  }, [loading]);

  if (loading || !isAuthResolved) {
    return (
      <div className='z-50 flex justify-center items-center h-screen text-white text-xl'>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    redirect('/login');
  }

  return <Map />;
}
