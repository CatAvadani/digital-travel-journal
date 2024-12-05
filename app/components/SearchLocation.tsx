'use client';
import { useState } from 'react';
import { Search, X } from 'react-feather';

interface SearchLocationProps {
  onSearch: (searchQuery: string) => void;
}

export default function SearchLocation({ onSearch }: SearchLocationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
    setSearchQuery('');
    setIsExpanded(false);
  };

  return (
    <div className='relative z-50'>
      {isExpanded ? (
        <div className='flex items-center max-w-md bg-white rounded-md shadow-md'>
          {/* Close Button */}

          {/* Input Field */}
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search city or country'
            className='w-full p-3 rounded-l-md  focus:outline-none'
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          {/* Search Button */}
          <button
            onClick={handleCollapse}
            className='cursor-pointer p-4'
            aria-label='Close search input'
          >
            <X size={20} />
          </button>
          <button
            onClick={handleSearch}
            className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] text-white p-4 rounded-r-md'
          >
            <Search size={20} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleExpand}
          className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] text-white p-4 rounded-md flex items-center justify-center shadow-md'
          aria-label='Expand search input'
        >
          <Search size={20} />
        </button>
      )}
    </div>
  );
}
