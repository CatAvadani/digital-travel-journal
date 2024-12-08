import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const createUserDoc = async (user: User) => {
  const userDocRef = doc(db, 'users', user.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { email, createdAt });
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  }
};

export const fetchUserFromFirestore = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error('No such user in Firestore');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export interface Postcard {
  userId: string;
  image: string;
  template: number;
  message: string;
}

export const savePostcard = async ({
  userId,
  image,
  template,
  message,
}: Postcard) => {
  try {
    const docRef = await addDoc(collection(db, 'postcards'), {
      userId,
      image,
      template,
      message,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving postcard:', error);
    throw new Error('Failed to save postcard');
  }
};

export const fetchSavedPostcards = async (userId: string) => {
  try {
    const q = query(collection(db, 'postcards'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching postcards:', error);
    throw error;
  }
};
