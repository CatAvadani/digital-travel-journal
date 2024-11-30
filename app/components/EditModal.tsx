'use client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { storage } from '../firebase/firebase';
import { Entry } from '../store/useEntryStore';
import FormInput from './ui/FormInput';

interface EditModalProps {
  entry: Entry | null;
  onClose: () => void;
  onSubmit: (entry: Entry) => void;
  isOpen: boolean;
}

export default function EditModal({
  entry,
  onClose,
  onSubmit,
  isOpen,
}: EditModalProps) {
  const [formData, setFormData] = useState(entry || ({} as Entry));
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (entry) {
      setFormData(entry);
    }
  }, [entry]);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, files } = e.target as HTMLInputElement & {
      files?: FileList;
    };

    if (id === 'upload' && files && files[0]) {
      const file = files[0];
      setIsUploading(true);

      try {
        const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        setFormData((prev) => ({ ...prev, image: downloadURL }));
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
      }
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen || !entry) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50'>
      <div className='bg-[#30193A] p-10 rounded-md shadow-md w-[90%] sm:w-[400px]'>
        <form onSubmit={handleSubmit} className='relative flex flex-col gap-4'>
          <h2 className='text-xl font-bold mb-4 text-white'>Edit Entry</h2>
          <button
            onClick={onClose}
            className='absolute top-0 right-0 text-white/80 hover:text-white'
          >
            <X size={24} />
          </button>
          <FormInput
            id='title'
            label='Title'
            value={formData.title || ''}
            placeholder='Trip to Stockholm'
            onChange={handleChange}
          />
          <FormInput
            id='date'
            label='Date'
            type='date'
            value={formData.date || ''}
            onChange={handleChange}
          />
          <FormInput
            id='location'
            label='Location'
            value={formData.location || ''}
            onChange={handleChange}
          />
          <div>
            <FormInput
              id='upload'
              type='file'
              label='Upload New Image'
              onChange={handleChange}
              disabled={isUploading}
            />
            {isUploading && (
              <p className='text-sm text-blue-500'>Uploading image...</p>
            )}
          </div>
          <textarea
            id='description'
            value={formData.description || ''}
            placeholder='Write your experience here...'
            onChange={handleChange}
            className='block w-full p-2 bg-white rounded-md'
            rows={4}
          />
          <div className='flex justify-center items-center gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 px-4 py-2 rounded-md w-full hover:bg-gray-300/90'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-[#E91E63] w-full px-4 py-2 text-white rounded-md hover:bg-[#E91E63]/90'
              disabled={isUploading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
