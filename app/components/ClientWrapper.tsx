'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './Header';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const pathname = usePathname();
  const isMapViewPage = pathname === '/mapView';

  return (
    <>
      {!isMapViewPage && <Header />}
      <main className='flex flex-grow  items-center justify-center defaultBackground'>
        {children}
      </main>
    </>
  );
}