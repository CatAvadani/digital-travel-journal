'use client';
import { PropsWithChildren } from 'react';
import { AuthProvider } from './authProvider/AuthProvider';

export function Providers({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
