'use client';
import { useEffect, useState } from 'react';
import FormInput from './ui/FormInput';

export default function EditModal({ entry, onClose, onSubmit, isOpen }) {
  const [formData, setFormData] = useState(entry || {});

  useEffect(() => {
    if (entry) {
      setFormData(entry); // Update formData when entry changes
    }
  }, [entry]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen || !entry) {
    return null; // Ensure modal only renders when open and entry exists
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50'>
      <div className='bg-black py-4 px-6 rounded-md shadow-md w-[90%] sm:w-[400px]'>
        <h2 className='text-xl font-bold mb-4'>Edit Entry</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          <FormInput
            id='image'
            label='Image URL'
            value={formData.image || ''}
            onChange={handleChange}
          />
          <textarea
            id='description'
            value={formData.description || ''}
            placeholder='Write your experience here...'
            onChange={handleChange}
            className='block w-full p-2 bg-white/10 rounded-md'
            rows={4}
          />
          <div className='flex justify-center items-center gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 px-4 py-2 rounded-md'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-pink-500 px-4 py-2 text-white rounded-md'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
