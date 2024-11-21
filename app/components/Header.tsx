'use client';
import { AlignRight, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '../lib/useAuthStore';

const links = [
  { href: '/myAdventures', label: 'My Adventures' },
  { href: '/explore', label: 'Explore' },
];

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='flex justify-between items-center py-4 px-6 bg-gray-300'>
      {/* Logo */}
      <Link href='/' className=' text-xl md:text-2xl font-bold'>
        Digital Travel Journal
      </Link>

      {/* Mobile Menu Icon */}
      <div className='md:hidden'>
        {isMenuOpen ? (
          <X
            className='cursor-pointer'
            size={28}
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <AlignRight
            className='cursor-pointer'
            size={28}
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute top-16 right-4 bg-white shadow-lg rounded-lg w-64 p-5 z-50 md:hidden'>
          <ul className='space-y-4'>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='block text-gray-800 hover:bg-gray-100 p-2 rounded-md'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className='mt-4'>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className='w-full border border-black px-4 py-2 rounded-md text-gray-800 hover:bg-gray-500 transition-colors'
              >
                Logout
              </button>
            ) : (
              <Link
                href='/login'
                className='w-full block text-center border border-black px-4 py-2 rounded-md text-gray-800 hover:bg-gray-200'
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <nav className='hidden md:flex items-center gap-8'>
        <ul className='flex items-center gap-6'>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='text-gray-800 hover:text-gray-600 transition-colors'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {user ? (
          <button
            onClick={logout}
            className='border border-white bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700'
          >
            Logout
          </button>
        ) : (
          <Link
            href='/login'
            className='border border-white bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700'
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
