import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { create } from 'zustand';
import { auth } from '../firebase/firebase';
import { createUserDoc } from './firestoreHelpers';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  signUp: (
    email: string,
    password: string,
    router: ReturnType<typeof useRouter>
  ) => Promise<void>;
  signIn: (
    email: string,
    password: string,
    router: ReturnType<typeof useRouter>
  ) => Promise<void>;
  logout: () => Promise<void>;

  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  setUser: (user: User | null) => set({ user }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  signUp: async (email, password, router) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserDoc(userCredential.user);

      set({ user: userCredential.user, loading: false });
      router.push('/mapView');
    } catch (error) {
      if (error instanceof FirebaseError) {
        set({ error: error.code, loading: false });
      } else {
        set({ error: 'auth/unknown-error', loading: false });
      }
    }
  },

  signIn: async (email, password, router) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      set({ user: userCredential.user, loading: false });
      router.push('/mapView');
    } catch (error) {
      if (error instanceof FirebaseError) {
        set({ error: error.code, loading: false });
      } else {
        set({ error: 'auth/unknown-error', loading: false });
      }
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await auth.signOut();
      set({ user: null, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },

  initializeAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
}));
