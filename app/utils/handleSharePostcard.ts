import { User } from 'firebase/auth';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import * as htmlToImage from 'html-to-image';
import toast from 'react-hot-toast';
import { Postcard } from '../store/firestoreHelpers';

export const handleSharePostcard = async (
  postcardId: string,
  user: User,
  updatePostcard: (id: string, data: Partial<Postcard>) => Promise<void>
) => {
  // Target the entire postcard container (including image, template, and message)
  const element = document.getElementById(`postcard-${postcardId}`);

  if (!element) {
    toast.error('Postcard not found. Please refresh and try again.');
    return;
  }

  try {
    // Generate the image of the entire postcard
    const dataUrl = await htmlToImage.toPng(element, {
      backgroundColor: 'white', // Add a consistent background if needed
      quality: 1,
      pixelRatio: 2,
    });

    // Upload the generated image to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `shared_postcards/${postcardId}.png`);
    await uploadString(storageRef, dataUrl, 'data_url');

    // Get the shareable URL
    const shareableURL = await getDownloadURL(storageRef);

    // Save the shareable URL in Firestore
    await updatePostcard(postcardId, { shareableURL });

    // Open the Facebook share dialog
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareableURL
    )}`;
    window.open(facebookShareUrl, '_blank', 'width=600,height=400');

    toast.success('Postcard shared successfully!');
  } catch (error) {
    console.error('Sharing failed:', error);
    toast.error('Failed to share postcard. Please try again.');
  }
};
