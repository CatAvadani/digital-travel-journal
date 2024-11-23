'use client';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useAuthStore } from '../lib/useAuthStore';

// Dynamically load the Map component to ensure client-side rendering
const Map = dynamic(() => import('../components/map'), { ssr: false });

export default function Explore() {
  const { user } = useAuthStore();
  if (!user) {
    redirect('/login');
  }

  return <Map />;
}
