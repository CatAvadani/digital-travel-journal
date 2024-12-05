'use client';
import { useState } from 'react';

interface SearchLocationProps {
  onSearch: (searchQuery: string) => void;
}

export default function SearchLocation({ onSearch }: SearchLocationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className='absolute top-2 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4'>
      <div className='flex'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search city or country'
          className='w-full p-2 rounded-l-md border border-gray-300'
          onKeyDown={(e) => e.key === 'Enter' && onSearch(searchQuery)}
        />
        <button
          onClick={() => onSearch(searchQuery)}
          className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] text-white p-2 rounded-r-md'
        >
          Search
        </button>
      </div>
    </div>
  );
}
