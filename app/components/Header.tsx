'use client';
import { AlignRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const links = [
  { href: '/myTrips', label: 'My Trips' },
  { href: '/mapView', label: 'Map View' },
  { href: '/howToUse', label: 'How to Use' },
];

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

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

  const isMapViewPage = pathname === '/mapView';
  const isHomePage = pathname === '/';

  return (
    <header
      className={`fixed z-50 w-full flex justify-between items-center p-5 pb-8 text-white md:px-10 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/30 backdrop-blur-lg backdrop-filter'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link
        href='/'
        className='flex justify-center items-center gap-6 text-base md:text-3xl font-bold text-white'
      >
        <Image
          src='/Zantic.svg'
          className='object-cover size-10 sm:size-12 ml-2'
          width={40}
          height={40}
          alt='logo'
        />
        {!isMapViewPage && !isHomePage && (
          <span className=' tracking-wider'>Digital Travel Journal</span>
        )}
      </Link>

      {/* Mobile Menu Icon */}
      <button className='md:hidden'>
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
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className='absolute top-16 right-4 bg-white bg-opacity-10 backdrop-blur-lg backdrop-filter shadow-lg rounded-lg w-64 p-5 z-50 md:hidden'>
          <ul className='space-y-4'>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block text-white p-2 rounded-md ${
                    pathname.startsWith(link.href)
                      ? 'bg-gray-400/10 font-bold text-white/80'
                      : 'hover:bg-gray-400/10'
                  }`}
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
        </nav>
      )}

      {/* Desktop Menu */}
      <nav className='hidden md:flex items-center gap-8'>
        <ul className='flex items-center gap-6'>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-4 py-2 rounded-full transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'font-bold text-white/80'
                    : 'hover:text-gray-200'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 bottom-[-2px] w-full h-[2px] bg-white/80 transform transition-all duration-300 ${
                    pathname.startsWith(link.href) ? 'scale-x-110' : 'scale-x-0'
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>
        {user ? (
          <button
            onClick={logout}
            className='bg-white bg-opacity-10 backdrop-blur-lg backdrop-filter rounded-full shadow-lg px-4 py-2 flex items-center justify-center m-0'
          >
            Logout
          </button>
        ) : (
          <Link
            href='/login'
            className='bg-white bg-opacity-10 backdrop-blur-lg backdrop-filter rounded-full shadow-lg px-6 py-2 flex items-center justify-center'
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
