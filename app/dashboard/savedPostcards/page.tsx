'use client';

import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { db } from '@/app/firebase/firebase';
import { fetchSavedPostcards } from '@/app/store/firestoreHelpers';
import { useAuthStore } from '@/app/store/useAuthStore';
import { handleSharePostcard } from '@/app/utils/handleSharePostcard';
import { doc, updateDoc } from 'firebase/firestore';
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

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>My Saved Postcards</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {postcards.map((postcard) => (
          <div
            id={`postcard-${postcard.id}`}
            key={postcard.id}
            className={`rounded-md relative `}
          >
            <Image
              src={postcard.image || ' '}
              alt='Postcard'
              height={100}
              width={100}
              className='w-full h-full object-cover rounded-md mb-2'
            />

            <button
              className='absolute -bottom-40 bg-blue-500 text-white px-4 py-2 rounded-md'
              onClick={() => handleShare(postcard.id)}
            >
              Share on Facebook
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
