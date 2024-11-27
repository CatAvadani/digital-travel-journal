import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db, storage } from '../firebase/firebase';
import useEntryStore from '../store/useEntryStore';

export default function AddNewEntryForm() {
  const { selectedCoordinates, addEntry } = useEntryStore();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    location: '',
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
    if (
      !formData.title ||
      !formData.date ||
      !formData.location ||
      !formData.image ||
      !formData.description
    ) {
      alert('Please fill all the fields');
      return false;
    }

    if (formData.image && formData.image.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!selectedCoordinates) {
      alert('Please select a location on the map.');
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = '';
      if (formData.image) {
        const imageRef = ref(
          storage,
          `images/${Date.now()}-${formData.image.name}`
        );
        const snapshot = await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const newEntry = {
        id: Date.now().toString(),
        title: formData.title,
        date: formData.date,
        location: formData.location,
        image: imageUrl,
        description: formData.description,
        coordinates: selectedCoordinates,
      };

      await addDoc(collection(db, 'entries'), newEntry);

      addEntry(newEntry);

      alert('Entry added successfully!');

      // Reset the form
      setFormData({
        id: '',
        title: '',
        date: '',
        location: '',
        image: null,
        description: '',
      });
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('An error occurred while adding the entry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-transparent my-4 text-white px-4 py-6 flex flex-col gap-4  h-[96vh]'>
      <h2 className='text-xl font-bold'>Add New Entry</h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 mx-auto  text-white w-full'
      >
        <div>
          <label htmlFor='title' className='block text-sm font-medium  '>
            Title
          </label>
          <input
            type='text'
            id='title'
            placeholder='Trip to Stockholm'
            value={formData.title}
            onChange={handleChange}
            className='text-white mt-1 block w-full p-2  rounded-md  bg-white/10 focus:outline-none focus:ring-0'
          />
        </div>
        <div>
          <label htmlFor='date' className='block text-sm font-medium'>
            Date
          </label>
          <input
            type='date'
            id='date'
            value={formData.date}
            onChange={handleChange}
            placeholder='2021-12-31'
            className='mt-1 block w-full p-2 text-white bg-white/10  rounded-md shadow-sm focus:outline-none focus:ring-0'
          />
        </div>
        <div>
          <label htmlFor='location' className='block text-sm font-medium'>
            Location
          </label>
          <input
            id='location'
            value={formData.location}
            onChange={handleChange}
            className='mt-1 block w-full p-2 text-white bg-white/10 rounded-md shadow-sm focus:outline-none focus:ring-0'
            readOnly
          />
        </div>
        <div>
          <label htmlFor='image' className='block text-sm font-medium'>
            Upload Image
          </label>
          <input
            id='upload'
            type='file'
            placeholder='Upload Image'
            onChange={handleImageChange}
            className='mt-1 block w-full p-2 text-white/70 bg-white/10 rounded-md shadow-sm focus:outline-none focus:ring-0 '
          />
        </div>
        <div>
          <label htmlFor='location' className='block text-sm font-medium'>
            Description
          </label>
          <textarea
            id='description'
            placeholder='Write your experience here...'
            value={formData.description}
            onChange={handleChange}
            className='mt-1 block w-full p-2 text-white bg-white/10 rounded-md shadow-sm focus:outline-none focus:ring-0'
            rows={4}
          />
        </div>
        <button
          type='submit'
          className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] px-16 py-3 rounded-md text-white shadow-lg transition-all duration-300 ease-in-out flex justify-center items-center gap-2'
        >
          <Plus size={20} /> Add Entry
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
        className=' flex justify-center items-center gap-2 text-white  mt-8'
      >
        <p className=' font-semibold hover:underline'> My Trips </p>
        <ArrowRight size={20} className=' hover:translate-x-1 transition-all' />
      </Link>
    </div>
  );
}
