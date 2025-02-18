import { User } from 'firebase/auth';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import { Postcard } from '../interfaces/postCard';
export const handleSharePostcard = async (
  postcardId: string,
  user: User,
  updatePostcard: (id: string, data: Partial<Postcard>) => Promise<void>
) => {
  const element = document.getElementById(`postcard-${postcardId}`);

  if (!element) {
    toast.error('Postcard not found. Please refresh and try again.');
    return;
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      width: width,
      height: height,
      logging: true,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(
          `postcard-${postcardId}`
        );
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.width = `${width}px`;
          clonedElement.style.height = `${height}px`;
          clonedElement.style.opacity = '1';
          clonedElement.style.visibility = 'visible';
        }
      },
    });

    const dataUrl = canvas.toDataURL('image/png', 1.0);

    const storage = getStorage();
    const storageRef = ref(
      storage,
      `shared_postcards/${postcardId}_${Date.now()}.png`
    );
    await uploadString(storageRef, dataUrl, 'data_url');

    const shareableURL = await getDownloadURL(storageRef);

    await updatePostcard(postcardId, { shareableURL });

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
