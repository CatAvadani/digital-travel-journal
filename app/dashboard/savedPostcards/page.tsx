'use client';

import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { fetchSavedPostcards } from '@/app/store/firestoreHelpers';
import { useAuthStore } from '@/app/store/useAuthStore';
import * as htmlToImage from 'html-to-image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import './styles.css';

interface Postcard {
  id: string;
  image: string | null;
  template: number;
  message: string;
  shareableURL?: string;
}

export default function SavedPostcards() {
  const { user } = useAuthStore();
  const [postcards, setPostcards] = useState<Postcard[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGenerateImage = async (postcardId: string) => {
    const elementId = `postcard-${postcardId}`;
    const element = document.getElementById(elementId);

    if (!element) {
      console.error(`Element with ID ${elementId} not found.`);
      toast.error('Postcard not found. Please refresh and try again.');
      return null;
    }

    try {
      const dataUrl = await htmlToImage.toPng(element, {
        backgroundColor: 'white',
      });
      console.log('Generated Image URL:', dataUrl); // Check if this logs a valid Base64 URL
      return dataUrl;
    } catch (error) {
      console.error('Failed to generate image:', error);
      toast.error('Failed to generate a sharable image.');
      return null;
    }
  };

  const handleShare = async (postcardId: string) => {
    const generatedImageUrl = await handleGenerateImage(postcardId);

    if (generatedImageUrl) {
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        generatedImageUrl
      )}`;
      console.log('Facebook Share URL:', facebookShareUrl);
      window.open(facebookShareUrl, '_blank');
    } else {
      console.error('Failed to generate a shareable image');
      toast.error(
        'Failed to generate a shareable image. Please check your network or try again later.'
      );
    }
  };

  useEffect(() => {
    if (user) {
      const loadPostcards = async () => {
        try {
          setLoading(true);
          const fetchedPostcards = await fetchSavedPostcards(user.uid);
          setPostcards(fetchedPostcards);
        } catch (error) {
          console.error('Failed to load postcards:', error);
        } finally {
          setLoading(false);
        }
      };

      loadPostcards();
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (postcards.length === 0) {
    return (
      <div className='text-center text-white'>
        <h2 className='text-lg font-bold mb-4'>No Saved Postcards</h2>
        <p>Create a postcard to see it here!</p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>My Saved Postcards</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {postcards.map((postcard) => (
          <div
            id={`postcard-${postcard.id}`} // Correctly set the ID here
            key={postcard.id}
            className={`rounded-md shadow-md p-4 bg-white relative template-${postcard.template}`}
          >
            <img
              src={postcard.image}
              alt='Postcard'
              className='w-full h-48 object-cover rounded-md mb-2'
            />
            <p className='absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded-md'>
              {postcard.message}
            </p>
            <button
              className='absolute -bottom-20 bg-blue-500 text-white px-4 py-2 rounded-md'
              onClick={() => handleShare(postcard.id)} // Pass the correct postcard ID
            >
              Share on Facebook
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
