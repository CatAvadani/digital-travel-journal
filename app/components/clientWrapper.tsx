'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './header';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const pathname = usePathname();
  const isExplorePage = pathname === '/explore';

  return (
    <>
      {!isExplorePage && <Header />}
      <main className='flex flex-grow  items-center justify-center defaultBackground'>
        {children}
      </main>
    </>
  );
}
