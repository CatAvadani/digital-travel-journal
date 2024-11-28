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
