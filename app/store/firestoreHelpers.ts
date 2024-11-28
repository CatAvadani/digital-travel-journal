import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
