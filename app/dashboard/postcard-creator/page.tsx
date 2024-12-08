'use client';

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

  // Fetch entries when the component mounts
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
          <h2 className='text-lg font-semibold mb-2 p-4'>Choose an Image</h2>
          <div className='grid gap-2 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] max-h-[250px] overflow-y-scroll bg-black/30 rounded-md border border-white/10 p-4'>
            {entries.map((entry) => (
              <div key={entry.id} className='w-full h-[100px]'>
                <Image
                  src={entry.image}
                  alt={entry.title}
                  width={100}
                  height={100}
                  className={`cursor-pointer rounded-md shadow-md w-full h-full ${
                    selectedImage === entry.image
                      ? 'ring-4 ring-pink-500/50'
                      : ''
                  }`}
                  onClick={() => setSelectedImage(entry.image)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Template Selector */}
        <div className='p-4 rounded-md'>
          <h2 className='text-lg font-semibold mb-2'>Choose a Template</h2>
          <div className='grid grid-cols-3 gap-2 w-[50%]'>
            {postcardTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-4 rounded-md cursor-pointer shadow-md ${
                  selectedTemplate === template.id
                    ? 'ring-4 ring-[#4B0082]'
                    : 'bg-black/20'
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
      <div className='mt-8'>
        <h2 className='text-lg font-semibold mb-4'>Preview</h2>
        <div
          className={`w-full max-w-md  mx-auto p-4 bg-white rounded-md shadow-lg relative ${
            postcardTemplates.find((t) => t.id === selectedTemplate)?.className
          }`}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt='Selected'
              className='w-full h-48 object-cover rounded-md'
            />
          )}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Write your message here...'
            className='absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded-md w-[90%]'
          />
        </div>
      </div>

      {/* Actions */}
      <div className='mt-6 flex gap-4'>
        <button className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] px-6 py-2 rounded-md'>
          Download Postcard
        </button>
        <button className='bg-gray-700 px-6 py-2 rounded-md'>Cancel</button>
      </div>
    </div>
  );
}
