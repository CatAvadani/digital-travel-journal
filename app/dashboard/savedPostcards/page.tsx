'use client';

import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { db } from '@/app/firebase/firebase';
import { fetchSavedPostcards } from '@/app/store/firestoreHelpers';
import { useAuthStore } from '@/app/store/useAuthStore';
import { handleSharePostcard } from '@/app/utils/handleSharePostcard';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
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

  const updatePostcard = async (
    postcardId: string,
    data: Partial<Postcard>
  ) => {
    try {
      const postcardRef = doc(db, 'postcards', postcardId);
      await updateDoc(postcardRef, data);

      setPostcards((prev) =>
        prev.map((postcard) =>
          postcard.id === postcardId ? { ...postcard, ...data } : postcard
        )
      );
    } catch (error) {
      console.error('Failed to update postcard:', error);
      toast.error('Failed to update postcard');
    }
  };

  const handleShare = (postcardId: string) => {
    if (!user) {
      toast.error('Please log in to share postcards');
      return;
    }

    handleSharePostcard(postcardId, user, updatePostcard);
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

  const removePost = async (postcardId: string) => {
    try {
      const postcardRef = doc(db, 'postcards', postcardId);
      await deleteDoc(postcardRef);

      const newPostcards = postcards.filter(
        (postcard) => postcard.id !== postcardId
      );
      setPostcards(newPostcards);

      toast.success('Postcard deleted successfully!');
    } catch (error) {
      console.error('Failed to delete postcard:', error);
      toast.error('Failed to delete postcard. Please try again.');
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4 text-white'>My Saved Postcards</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {postcards.map((postcard) => (
          <div
            key={postcard.id}
            className='bg-black/30 rounded-md overflow-hidden flex flex-col'
          >
            {/* Image Section */}
            <div className='relative w-full h-48'>
              <Image
                id={`postcard-${postcard.id}`}
                src={postcard.image || '/globe-img.jpeg'}
                alt='Postcard'
                fill
                className='object-contain'
              />
            </div>

            <div className='p-4 flex flex-col gap-3'>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleShare(postcard.id)}
                  className='flex-1 bg-gradient-to-r from-[#E91E63] to-[#4B0082] text-white py-2 rounded-md text-sm font-medium hover:from-[#E91E63]/80 hover:to-[#4B0082]/80 transition duration-300'
                >
                  Share on Facebook
                </button>
                <button
                  onClick={() => removePost(postcard.id)}
                  className='flex-1 border-2 border-[#4B0082] text-white py-2 rounded-md text-sm font-medium hover:bg-[#4B0082]/30 transition duration-300'
                >
                  Delete Postcard
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
