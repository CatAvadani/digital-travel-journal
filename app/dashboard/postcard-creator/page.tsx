'use client';

import SimpleButton from '@/app/components/ui/SimpleButton';
import { savePostcard, uploadToFirebase } from '@/app/store/firestoreHelpers';
import { useAuthStore } from '@/app/store/useAuthStore';
import * as htmlToImage from 'html-to-image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import useEntryStore from '../../store/useEntryStore';
import './styles.css';

interface PostcardData {
  selectedImage: string | null;
  selectedTemplate: number;
  message: string;
}

export default function PostcardCreator() {
  const { entries, fetchEntries } = useEntryStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const postcardRef = useRef<HTMLDivElement>(null);

  const [postcardData, setPostcardData] = useState<PostcardData>({
    selectedImage: null,
    selectedTemplate: 0,
    message: '',
  });

  const postcardTemplates = [
    { id: 1, name: 'Classic', className: 'template-classic' },
    { id: 2, name: 'Modern', className: 'template-modern' },
    { id: 3, name: 'Elegant', className: 'template-elegant' },
  ];

  useEffect(() => {
    if (user) fetchEntries(user.uid);
  }, [user, fetchEntries]);

  const handleSavePostcard = async () => {
    const { selectedImage, selectedTemplate, message } = postcardData;

    if (!selectedImage || !selectedTemplate || !message) {
      toast.error('Please select an image, template, and write a message.');
      return;
    }

    if (!user) {
      toast.error('You need to log in to save postcards.');
      return;
    }

    try {
      const dataUrl = await htmlToImage.toPng(postcardRef.current!);

      const uploadedUrl = await uploadToFirebase(dataUrl);

      if (!uploadedUrl) {
        toast.error('Failed to upload postcard image. Please try again.');
        return;
      }

      await savePostcard({
        userId: user.uid,
        image: uploadedUrl,
        template: selectedTemplate,
        message,
      });

      toast.success('Postcard saved successfully!');
      resetFields();
    } catch (error) {
      toast.error('Failed to save postcard. Please try again later.');
      console.error(error);
    }
  };

  const resetFields = () => {
    setPostcardData({ selectedImage: null, selectedTemplate: 0, message: '' });
  };

  const updateField = <Key extends keyof PostcardData>(
    field: Key,
    value: PostcardData[Key]
  ) => {
    setPostcardData((prev) => ({ ...prev, [field]: value }));
  };

  const { selectedImage, selectedTemplate, message } = postcardData;

  return (
    <div className='p-1 md:p-4 text-white h-full'>
      <h1 className='text-lg md:text-2xl font-bold mb-4'>
        Choose your favorite photo, pick a template, and add a message to create
        your unique postcard.
      </h1>

      <div className='flex flex-col gap-4'>
        <div className='rounded-md'>
          <h2 className='text-lg font-semibold py-4'>Choose an Image</h2>
          <div className='grid gap-3 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] max-h-[250px] overflow-y-scroll bg-black/30 rounded-md border border-white/10 p-4'>
            {entries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => updateField('selectedImage', entry.image)}
                className={`relative w-full h-[100px] cursor-pointer ${
                  selectedImage === entry.image ? 'ring-4 ring-[#4B0082]' : ''
                }`}
              >
                <Image
                  src={entry.image}
                  alt={entry.title}
                  width={100}
                  height={100}
                  className='rounded-md shadow-md h-full w-full object-cover'
                />
                <div className='absolute top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center p-4 text-sm font-semibold'>
                  {entry.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Selector */}
        <div className='py-4'>
          <h2 className='text-lg font-semibold mb-6'>Choose a Template</h2>
          <div className='grid grid-cols-3 gap-2 w-full md:w-[50%]'>
            {postcardTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => updateField('selectedTemplate', template.id)}
                className={`px-4 py-2 rounded-md cursor-pointer shadow-md ${
                  selectedTemplate === template.id
                    ? 'ring-4 ring-[#4B0082]'
                    : 'bg-gradient-to-r from-[#E91E63] to-[#4B0082]'
                }`}
              >
                <p>{template.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Postcard Preview */}
      <div className='mt-6'>
        <h2 className='text-lg font-semibold my-4'>Preview Image</h2>
        {selectedImage && (
          <div
            ref={postcardRef}
            className={`w-full max-w-md self-start my-8 p-4 bg-white rounded-md shadow-lg relative ${
              postcardTemplates.find((t) => t.id === selectedTemplate)
                ?.className
            }`}
          >
            <Image
              src={selectedImage}
              alt='Selected'
              width={100}
              height={100}
              className='w-full h-48 object-cover rounded-md'
            />
            <textarea
              value={message}
              onChange={(e) => updateField('message', e.target.value)}
              placeholder='Write your message here...'
              className='absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded-md w-[90%]'
            />
          </div>
        )}
      </div>

      <div className='mt-6 flex gap-4'>
        <SimpleButton
          text='Save Postcard'
          onClick={handleSavePostcard}
          backgroundColor='bg-gradient-to-r from-[#E91E63] to-[#4B0082]'
        />
        <button
          className='border-4 border-[#4B0082] px-4 py-2 rounded-md'
          onClick={resetFields}
        >
          Cancel
        </button>
        <SimpleButton
          text='View Saved Postcards'
          backgroundColor='bg-gradient-to-r from-[#E91E63] to-[#4B0082]'
          onClick={() => router.push('/dashboard/savedPostcards')}
        ></SimpleButton>
      </div>
    </div>
  );
}
