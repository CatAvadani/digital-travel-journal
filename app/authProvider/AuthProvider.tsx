'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { useAuthStore } from '../store/useAuthStore';
import useEntryStore from '../store/useEntryStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, setError, loading } = useAuthStore();
  const { clearEntries } = useEntryStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        setError(null);

        if (pathname === '/login') {
          router.push('/mapView');
        }
      } else {
        setUser(null);
        clearEntries();
        if (pathname !== '/login') {
          router.push('/login');
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setError, router, pathname, clearEntries]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator until auth state is ready
  }

  return <>{children}</>;
};
