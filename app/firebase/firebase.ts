import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const API_KEY_AUTH = process.env.NEXT_PUBLIC_API_KEY_AUTH;
const API_KEY_ID = process.env.NEXT_PUBLIC_API_KEY_ID;
const firebaseConfig = {
  apiKey: `${API_KEY_AUTH}`,
  authDomain: 'digital-travel-journal.firebaseapp.com',
  projectId: 'digital-travel-journal',
  storageBucket: 'digital-travel-journal.firebasestorage.app',
  messagingSenderId: '261793694513',
  appId: `${API_KEY_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
