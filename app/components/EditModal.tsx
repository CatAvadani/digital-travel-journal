'use client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { storage } from '../firebase/firebase';
import { Entry } from '../store/useEntryStore';
import FormInput from './ui/FormInput';
import SimpleButton from './ui/SimpleButton';

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

      if (files[0].size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB. Please choose a smaller file.');
        return;
      }

      setIsUploading(true);

      try {
        const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        setFormData((prev) => ({ ...prev, image: downloadURL }));
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload the image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.date ||
      !formData.city ||
      !formData.country
    ) {
      toast.error('Please fill all the required fields');
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen || !entry) {
    return null;
  }

  return (
    <div
      role='dialog'
      aria-label='Edit Entry Form'
      aria-hidden={!isOpen}
      className='fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50'
    >
      <div className='bg-[#30193A] p-10 rounded-md shadow-md w-[90%] sm:w-[500px]'>
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
          {/* City and Country - Grid Layout */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <FormInput
              id='city'
              label='City'
              value={formData.city || ''}
              placeholder='Göteborg'
              onChange={handleChange}
            />
            <FormInput
              id='country'
              label='Country'
              value={formData.country || ''}
              placeholder='Sweden'
              onChange={handleChange}
            />
          </div>
          <div>
            <FormInput
              id='upload'
              type='file'
              label='Upload New Image'
              onChange={handleChange}
              disabled={isUploading}
            />
            {isUploading && (
              <p className='text-sm text-pink-500'>Uploading image...</p>
            )}
          </div>
          <textarea
            id='description'
            value={formData.description || ''}
            placeholder='Write your experience here...'
            onChange={handleChange}
            className='block w-full p-2 bg-white/10 text-white/80 rounded-md
            '
            rows={4}
          />
          <div className='flex justify-center items-center gap-4 w-full'>
            <SimpleButton
              text='Cancel'
              onClick={onClose}
              backgroundColor='bg-gray-200'
              textColor='text-black'
              className='hover:bg-gray-300/80 w-full'
            />
            <SimpleButton
              type='submit'
              text={isUploading ? 'Saving...' : 'Save'}
              backgroundColor='bg-[#E91E63]'
              textColor='text-white'
              className='hover:bg-[#eb3473] w-full '
              disabled={isUploading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
