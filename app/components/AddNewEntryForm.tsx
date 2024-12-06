import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { db, storage } from '../firebase/firebase';
import { useAuthStore } from '../store/useAuthStore';
import useEntryStore from '../store/useEntryStore';
import { ValidationEntrySchema } from '../validationSchemas/validationEntrySchema';
import FormInput from './ui/FormInput';

export default function AddNewEntryForm() {
  const { selectedCoordinates, addEntry } = useEntryStore();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    city: '',
    country: '',
    image: null as File | null,
    description: '',
  });

  useEffect(() => {
    // Update the location field when coordinates change
    setFormData((prev) => ({
      ...prev,
      location: selectedCoordinates
        ? `${selectedCoordinates[1].toFixed(
            4
          )}, ${selectedCoordinates[0].toFixed(4)}`
        : '',
    }));
  }, [selectedCoordinates]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const validateForm = () => {
    const result = ValidationEntrySchema.safeParse({
      ...formData,
      image: formData.image,
    });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!selectedCoordinates) {
      toast.error('Please select a location on the map.');
      return;
    }

    if (!user) {
      toast.error('Please login to add an entry');
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = '';
      if (formData.image) {
        const imageRef = ref(
          storage,
          `images/${user.uid}${Date.now()}-${formData.image.name}`
        );
        const snapshot = await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const newEntry = {
        userId: user.uid,
        title: formData.title,
        date: formData.date,
        city: formData.city,
        country: formData.country,
        image: imageUrl,
        description: formData.description,
        coordinates: selectedCoordinates,
      };

      // Add document to Firestore and get its ID
      const docRef = await addDoc(collection(db, 'entries'), newEntry);

      // Use the Firestore document ID as the `id` field
      addEntry({ ...newEntry, id: docRef.id });

      toast.success('Entry added successfully!');

      // Reset the form
      setFormData({
        id: '',
        title: '',
        date: '',
        city: '',
        country: '',
        image: null,
        description: '',
      });
    } catch (error) {
      console.error('Error adding entry:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-transparent my-4 text-white px-4 py-4 flex flex-col gap-2  sm:h-[96vh]'>
      <h2 className='text-xl font-bold'>Add New Entry</h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 mx-auto  text-white w-full'
      >
        <div>
          <FormInput
            id='title'
            label='Title'
            value={formData.title}
            placeholder='Entry Title'
            onChange={handleChange}
            disabled={isLoading}
            maxLength={30}
          />
          {errors.title && <p className='text-red-500'>{errors.title}</p>}
        </div>
        <div>
          <FormInput
            id='date'
            label='Date'
            type='date'
            value={formData.date}
            placeholder='YYYY-MM-DD'
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.date && <p className='text-red-500'>{errors.date}</p>}
        </div>
        <div className='flex items-center gap-2 w-full'>
          <div className='flex-1'>
            <FormInput
              id='city'
              label='City'
              value={formData.city}
              placeholder='City Name'
              onChange={handleChange}
              maxLength={30}
            />
            {errors.city && <p className='text-red-500'>{errors.city}</p>}
          </div>
          <div className='flex-1'>
            <FormInput
              id='country'
              label='Country'
              value={formData.country}
              placeholder='Country Name'
              onChange={handleChange}
              maxLength={30}
            />
            {errors.country && <p className='text-red-500'>{errors.country}</p>}
          </div>
        </div>
        <div>
          <FormInput
            id='upload'
            label='Upload Image'
            type='file'
            onChange={handleImageChange}
            disabled={isLoading}
          />
          {errors.image && <p className='text-red-500'>{errors.image}</p>}
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
            placeholder='Write your experience here...'
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading}
            maxLength={500}
            className='block w-full p-2 text-white bg-white/10 rounded-md shadow-sm '
            rows={4}
          />
          {errors.description && (
            <p className='text-red-500'>{errors.description}</p>
          )}
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] px-16 py-3 rounded-md text-white shadow-lg transition-all duration-300 ease-in-out mb-2 '
        >
          {isLoading ? (
            'Saving...'
          ) : (
            <div className='flex justify-center items-center gap-2'>
              <Plus size={20} /> Add Entry
            </div>
          )}
        </button>
      </form>
      <Link
        href='/'
        className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] px-16 py-3 rounded-md text-white shadow-lg transition-all duration-300 ease-in-out text-center'
      >
        Home
      </Link>
      <Link
        href='/myTrips'
        className=' flex justify-center items-center gap-2 text-white  mt-4'
      >
        <p className=' font-semibold hover:underline'> My Trips </p>
        <ArrowRight size={20} className=' hover:translate-x-1 transition-all' />
      </Link>
    </div>
  );
}
