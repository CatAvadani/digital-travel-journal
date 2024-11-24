import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { useAuthStore } from '../lib/useAuthStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, setError } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    // The onAuthStateChanged function listens for changes in the user's authentication state. When the user logs in, the function receives the user object, and when the user logs out, the function receives null.
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        setError(null);
        router.push('/mapView');
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setError, router]);

  return <>{children}</>;
};
