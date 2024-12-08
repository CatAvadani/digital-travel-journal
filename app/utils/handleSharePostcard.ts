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
  user: any,
  updatePostcard: (id: string, data: Partial<Postcard>) => Promise<void>
) => {
  const element = document.getElementById(`postcard-${postcardId}`);

  if (!element) {
    toast.error('Postcard not found. Please refresh and try again.');
    return;
  }

  try {
    // Generate image
    const dataUrl = await htmlToImage.toPng(element, {
      backgroundColor: 'white',
      quality: 1, // Highest quality
      pixelRatio: 2, // Higher resolution
    });

    // Upload to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `shared_postcards/${postcardId}.png`);

    await uploadString(storageRef, dataUrl, 'data_url');
    const shareableURL = await getDownloadURL(storageRef);

    // Update postcard with shareable URL
    await updatePostcard(postcardId, { shareableURL });

    // Facebook sharing
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
