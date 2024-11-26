import Link from 'next/link';
import { useEffect, useState } from 'react';
import useEntryStore from '../store/useEntryStore';

export default function AddNewEntryForm() {
  const { selectedCoordinates, addEntry } = useEntryStore();

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
    if (selectedCoordinates) {
      setFormData((prev) => ({
        ...prev,
        location: `${selectedCoordinates[1].toFixed(
          4
        )}, ${selectedCoordinates[0].toFixed(4)}`,
      }));
    }
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCoordinates) {
      alert('Please select a location on the map.');
      return;
    }

    const newEntry = {
      ...formData,
      id: Date.now().toString(),
      coordinates: selectedCoordinates,
    };

    addEntry(newEntry);

    // Reset the form
    setFormData({
      id: '',
      title: '',
      date: '',
      location: '',
      image: null,
      description: '',
    });
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
          className='bg-gradient-to-r from-[#D92F91] to-[#800080] hover:from-[#C71585] hover:to-[#4B0082] px-16 py-3 rounded-md text-white shadow-lg transition-all duration-300 ease-in-out'
        >
          Submit
        </button>
      </form>
      <Link
        href='/'
        className='bg-gradient-to-r from-[#d92f8a] to-[#800080] hover:from-[#C71585] hover:to-[#4B0082] px-16 py-3 rounded-md text-white shadow-lg transition-all duration-300 ease-in-out text-center'
      >
        Home
      </Link>
    </div>
  );
}
