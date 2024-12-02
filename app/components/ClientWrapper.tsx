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
      <main className='flex h-full items-center justify-center'>
        {children}
      </main>
    </>
  );
}
