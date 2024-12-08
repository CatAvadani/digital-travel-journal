'use client';

import SimpleButton from '@/app/components/ui/SimpleButton';
import { useAuthStore } from '@/app/store/useAuthStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useEntryStore from '../../store/useEntryStore';
import './styles.css';

export default function PostcardCreator() {
  const { entries, fetchEntries } = useEntryStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [message, setMessage] = useState('');
  const { user } = useAuthStore();

  const postcardTemplates = [
    { id: 1, name: 'Classic', className: 'template-classic' },
    { id: 2, name: 'Modern', className: 'template-modern' },
    { id: 3, name: 'Elegant', className: 'template-elegant' },
  ];

  useEffect(() => {
    if (user) {
      fetchEntries(user.uid);
    }
  }, [user, fetchEntries]);

  return (
    <div className='p-4 text-white h-full'>
      <h1 className='text-2xl font-bold mb-4'>Postcard Creator</h1>
      <div className='flex flex-col gap-4'>
        {/* Image Selector */}
        <div className='rounded-md'>
          <h2 className='text-lg font-semibold p-4'>Choose an Image</h2>
          <div className='grid gap-2 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] max-h-[250px] overflow-y-scroll bg-black/30 rounded-md border border-white/10 p-4'>
            {entries.map((entry) => (
              <div key={entry.id} className='w-full h-[100px]'>
                <Image
                  src={entry.image}
                  alt={entry.title}
                  width={100}
                  height={100}
                  className={`cursor-pointer rounded-md shadow-md w-full h-full ${
                    selectedImage === entry.image ? 'ring-4 ring-[#4B0082]' : ''
                  }`}
                  onClick={() => setSelectedImage(entry.image)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Template Selector */}
        <div className='py-4'>
          <h2 className='text-lg font-semibold mb-6'>Choose a Template</h2>
          <div className='grid grid-cols-3 gap-2 w-[50%]'>
            {postcardTemplates.map((template) => (
              <div
                key={template.id}
                className={`px-4 py-2 rounded-md cursor-pointer shadow-md ${
                  selectedTemplate === template.id
                    ? 'ring-4 ring-[#4B0082]'
                    : 'bg-gradient-to-r from-[#E91E63] to-[#4B0082]'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
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
            className={`w-full max-w-md self-start my-8 p-4 bg-white rounded-md shadow-lg relative ${
              postcardTemplates.find((t) => t.id === selectedTemplate)
                ?.className
            }`}
          >
            <img
              src={selectedImage}
              alt='Selected'
              className='w-full h-48 object-cover rounded-md'
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Write your message here...'
              className='absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded-md w-[90%]'
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className='mt-6 flex gap-4'>
        <SimpleButton
          text='Share Postcard'
          backgroundColor='bg-gradient-to-r from-[#E91E63] to-[#4B0082]'
        />

        <button className='border-4 border-[#4B0082] px-6 py-2 rounded-md'>
          Cancel
        </button>
      </div>
    </div>
  );
}
