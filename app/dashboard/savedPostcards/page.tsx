'use client';

import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import SimpleButton from '@/app/components/ui/SimpleButton';
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
      <div className='grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2'>
        {postcards.map((postcard) => (
          <div
            key={postcard.id}
            className='rounded-md border border-white/10 bg-black/30 overflow-hidden shadow-lg flex flex-col p-2'
          >
            <div className=' w-full h-[200px] md:h-[300px] relative md:mb-4 -mt-10'>
              <Image
                id={`postcard-${postcard.id}`}
                src={postcard.image || '/globe-img.jpeg'}
                alt='Postcard'
                fill
                className='object-contain p-4'
                sizes='(max-width: 768px) 100vw, 250px'
              />
            </div>
            <div className='p-4 flex justify-between items-center gap-2'>
              <SimpleButton
                text='Share on Facebook'
                backgroundColor='bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#E91E63]/80 hover:to-[#4B0082]/80'
                className='flex-1 text-sm md:text-base'
                onClick={() => handleShare(postcard.id)}
              />
              <SimpleButton
                text='Delete Postcard'
                backgroundColor='border-4 border-[#4B0082] hover:bg-[#4B0082]/20'
                className='flex-1 text-sm md:text-base'
                onClick={() => removePost(postcard.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
