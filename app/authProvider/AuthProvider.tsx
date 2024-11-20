import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import useAuthStore from '../lib/store';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setLoading, setError } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setLoading(false);
    });
    // cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
};
