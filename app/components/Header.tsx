'use client';
import { AlignRight, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../lib/useAuthStore';

const links = [
  { href: '/myAdventures', label: 'My Adventures' },
  { href: '/explore', label: 'Explore' },
];

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed z-40 w-full flex justify-between items-center p-5 pb-8 text-white md:px-10 transition-all duration-300 ${
        isScrolled ? 'bg-black/80' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link href='/' className=' text-xl md:text-2xl font-bold text-white'>
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
        <div className='absolute top-16 right-4 bg-black shadow-lg rounded-lg w-64 p-5 z-50 md:hidden'>
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
