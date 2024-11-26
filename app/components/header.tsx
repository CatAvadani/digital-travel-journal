'use client';
import { AlignRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const links = [
  { href: '/myAdventures', label: 'My Adventures' },
  { href: '/mapView', label: 'Map View' },
];

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`fixed left-[50%] -translate-x-[50%] z-40 w-full  mx-auto flex justify-between items-center p-5 py-8 rounded-lg text-white md:px-16`}
    >
      {/* Logo */}
      <Link href='/' className=' text-xl md:text-2xl font-bold text-white'>
        <Image
          src='/Zantic.svg'
          className='object-cover size-10 sm:size-16'
          width={50}
          height={50}
          alt='logo'
        />
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
        <div className='absolute top-16 right-4   bg-white bg-opacity-10 backdrop-blur-lg backdrop-filter shadow-lg rounded-lg w-64 p-5 z-50 md:hidden'>
          <ul className='space-y-4'>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='block text-white hover:bg-gray-700 p-2 rounded-md'
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
                className='w-full border border-black px-4 py-2 rounded-md text-white hover:bg-gray-800 transition-colors'
              >
                Logout
              </button>
            ) : (
              <Link
                href='/login'
                className='w-full block text-center border border-black px-4 py-2 rounded-md text-white hover:bg-gray-800'
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
                className='text-white hover:text-gray-200 transition-colors'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {user ? (
          <button
            onClick={logout}
            className=' bg-white  bg-opacity-10 backdrop-blur-lg backdrop-filter rounded-full shadow-lg px-4 py-2 flex items-center justify-center'
          >
            Logout
          </button>
        ) : (
          <Link
            href='/login'
            className=' bg-white  bg-opacity-10 backdrop-blur-lg backdrop-filter rounded-full shadow-lg px-6 py-2 flex items-center justify-center'
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
