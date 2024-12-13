'use client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { storage } from '../firebase/firebase';
import { Entry } from '../interfaces/entry';
import { ValidationEntrySchema } from '../validationSchemas/validationEntrySchema';
import FormInput from './ui/FormInput';
import SimpleButton from './ui/SimpleButton';

interface EditModalProps {
  entry: Entry | null;
  onClose: () => void;
  onSubmit: (entry: Entry) => void;
  isOpen: boolean;
}

const PartialValidationEntrySchema = ValidationEntrySchema.partial();

export default function EditModal({
  entry,
  onClose,
  onSubmit,
  isOpen,
}: EditModalProps) {
  const [formData, setFormData] = useState<Partial<Entry>>(entry || {});
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (entry) {
      setFormData(entry);
      setErrors({});
    }
  }, [entry]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = () => {
    const result = PartialValidationEntrySchema.safeParse(formData);

    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          zodErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(zodErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, files } = e.target as HTMLInputElement & {
      files?: FileList;
    };

    if (id === 'upload' && files && files[0]) {
      const file = files[0];

      if (file.size > 5 * 1024 * 1024) {
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

      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[id];
        return updatedErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please correct the highlighted errors.');
      return;
    }

    if (!entry) return;

    const updatedFields = Object.keys(formData).reduce((acc, key) => {
      if (formData[key as keyof Entry] !== entry[key as keyof Entry]) {
        acc[key] = formData[key as keyof Entry];
      }
      return acc;
    }, {} as Record<string, string | [number, number] | undefined>);

    if (Object.keys(updatedFields).length === 0) {
      toast.error('No changes detected.');
      return;
    }

    onSubmit({ ...entry, ...updatedFields });
  };

  if (!isOpen || !entry) {
    return null;
  }

  return (
    <div
      role='dialog'
      aria-label='Edit Entry Form'
      aria-hidden={!isOpen}
      className='fixed inset-0 top-20
       flex items-center justify-center bg-black/20 backdrop-blur-sm z-50'
    >
      <div className='bg-[#2C1735] px-2 py-4 sm:px-10 sm:py-6 rounded-md shadow-md w-[90%] sm:w-[500px]'>
        <form
          onSubmit={handleSubmit}
          className='relative flex flex-col gap-2 sm:gap-4 w-full'
        >
          <h2 className='text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-white'>
            Edit Trip Details
          </h2>
          <button
            onClick={() => {
              onClose();
              setFormData(entry || {});
              setErrors({});
            }}
            className='absolute top-0 right-0 text-white/80 hover:scale-110 hover:text-white bg-[#110915]/50 border border-white/20 backdrop-blur-lg p-2 rounded-full'
          >
            <X className='size-4 sm:size-6' />
          </button>
          <FormInput
            id='title'
            label='Title'
            value={formData.title || ''}
            placeholder='Trip to Stockholm'
            onChange={handleChange}
            maxLength={30}
          />
          {errors.title && <p className='text-red-500'>{errors.title}</p>}
          <FormInput
            id='date'
            label='Date'
            type='date'
            value={formData.date || ''}
            onChange={handleChange}
            maxLength={30}
          />
          {errors.date && <p className='text-red-500'>{errors.date}</p>}
          <div className='flex items-center gap-2 w-full'>
            <div className='flex-1'>
              <FormInput
                id='city'
                label='City'
                value={formData.city || ''}
                placeholder='Göteborg'
                onChange={handleChange}
                maxLength={30}
              />
              {errors.city && <p className='text-red-500'>{errors.city}</p>}
            </div>
            <div className='flex-1'>
              <FormInput
                id='country'
                label='Country'
                value={formData.country || ''}
                placeholder='Sweden'
                onChange={handleChange}
                maxLength={30}
              />
              {errors.country && (
                <p className='text-red-500'>{errors.country}</p>
              )}
            </div>
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
          <div>
            <label
              htmlFor='description'
              className='block text-base font-medium text-white'
            >
              Description
            </label>
            <textarea
              id='description'
              value={formData.description || ''}
              placeholder='Write your experience here...'
              onChange={handleChange}
              className='block w-full p-2 bg-[#110915]/50 text-white/80 rounded-md'
              rows={3}
              maxLength={500}
            />
            {errors.description && (
              <p className='text-red-500'>{errors.description}</p>
            )}
          </div>
          <div className='flex justify-center items-center gap-4 w-full'>
            <SimpleButton
              text='Cancel'
              onClick={() => {
                onClose();
                setFormData(entry || {});
                setErrors({});
              }}
              backgroundColor='bg-gray-200'
              textColor='text-black'
              className='hover:bg-gray-300/80 w-full'
            />
            <SimpleButton
              type='submit'
              text={isUploading ? 'Saving...' : 'Save'}
              backgroundColor='bg-gradient-to-r from-[#E91E63] to-[#4B0082] '
              textColor='text-white'
              className=' hover:from-[#E91E63]/80 hover:to-[#4B0082]/80 w-full'
              disabled={isUploading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
