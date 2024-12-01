'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

// Dynamically load the Map component
const LazyMap = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function MapView() {
  const { user, loading } = useAuthStore();
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
    } else if (!loading && user) {
      setShowMap(true);
    }
  }, [loading, user]);

  return showMap ? <LazyMap /> : null;
}
