'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { useAuthStore } from '../store/useAuthStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, setError, user } = useAuthStore();
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

        if (pathname !== '/login') {
          router.push('/login');
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setError, router, pathname]);

  if (user === null && pathname !== '/login') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
