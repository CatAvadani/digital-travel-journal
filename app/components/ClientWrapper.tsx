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
  const isHomePage = pathname === '/';

  return (
    <>
      {!isMapViewPage && <Header />}
      <main
        className={`flex flex-grow items-center justify-center ${
          isHomePage ? '' : 'defaultBackground bg-no-repeat'
        }`}
      >
        {children}
      </main>
    </>
  );
}
