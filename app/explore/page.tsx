'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../lib/useAuthStore';

// Dynamically load the Map component to ensure client-side rendering
const Map = dynamic(() => import('../components/map'), { ssr: false });

export default function Explore() {
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
    }
  }, [loading, user]);

  // Show loading screen while resolving authentication state
  if (loading || !user) {
    return (
      <div className='z-50 flex justify-center items-center h-screen text-white text-xl'>
        <p>Loading...</p>
      </div>
    );
  }

  // Render Map component once authentication is resolved
  return <Map />;
}
