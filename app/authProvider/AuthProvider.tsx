import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { useAuthStore } from '../lib/store';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, setError } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        setError(null);
        router.push('/explore');
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setError, router]);

  return <>{children}</>;
};
