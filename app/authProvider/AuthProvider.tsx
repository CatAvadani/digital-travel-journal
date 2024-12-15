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

const AUTHENTICATED_ROUTES = [
  '/mapView',
  '/dashboard',
  '/dashboard/myTrips',
  '/dashboard/postcard-creator',
  '/dashboard/statistics',
  '/dashboard/settings',
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, setError, initializeAuth } = useAuthStore();
  const { clearEntries } = useEntryStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        setError(null);

        const accessedRoute = sessionStorage.getItem('accessedRoute');
        if (pathname === '/login' && accessedRoute) {
          router.push(accessedRoute);
          localStorage.removeItem('accessedRoute');
        } else if (pathname === '/login') {
          router.push('/dashboard');
        }
      } else {
        setUser(null);
        clearEntries();

        if (AUTHENTICATED_ROUTES.includes(pathname)) {
          localStorage.setItem('accessedRoute', pathname);
          router.push('/login');
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setError, router, pathname, clearEntries]);

  return <>{children}</>;
};
