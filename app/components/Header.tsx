'use client';
import { AlignRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Eye,
  Grid,
  Image as ImageIcon,
  MapPin,
  Settings,
  TrendingUp,
} from 'react-feather';
import { useAuthStore } from '../store/useAuthStore';

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isMapViewPage = pathname === '/mapView';
  const isHomePage = pathname === '/';

  const mainLinks = [
    { href: '/mapView', label: 'Map View' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/howToUse', label: 'How to Use' },
  ];

  const dashboardLinks = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Grid className='size-4 md:size-6' />,
    },
    { name: 'My Trips', href: '/dashboard/myTrips', icon: <MapPin /> },
    {
      name: 'Postcard Creator',
      href: '/dashboard/postcard-creator',
      icon: <ImageIcon />,
    },
    {
      name: 'View Your Postcards',
      href: '/dashboard/savedPostcards',
      icon: <Eye />,
    },
    { name: 'Statistics', href: '/dashboard/statistics', icon: <TrendingUp /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings /> },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 w-full flex justify-between items-center p-5 pb-8 text-white md:px-10 transition-all duration-300 ${
        isScrolled && !isMenuOpen
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
          <span className='tracking-wider font-normal'>
            Digital Travel Journal
          </span>
        )}
      </Link>

      <button className='lg:hidden z-50'>
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

      <div
        className={`fixed inset-y-0 right-0 w-[80%] bg-black/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40`}
      >
        <div className='h-full overflow-y-auto pt-24 pb-8 px-6'>
          {/* Main Navigation */}
          <div className='mb-8'>
            <ul className='space-y-4'>
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block p-2 rounded-md ${
                      pathname.startsWith(link.href)
                        ? 'bg-gradient-to-r from-[#E91E63] to-[#4B0082] font-bold'
                        : 'hover:bg-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard Navigation */}
          {user && (
            <div className='mb-8'>
              <ul className='space-y-4'>
                {dashboardLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 p-2 rounded-md ${
                        pathname === link.href
                          ? 'bg-gradient-to-r from-[#E91E63] to-[#4B0082] font-bold'
                          : 'hover:bg-white/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Auth Button */}
          <div className='mt-auto px-2'>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className='w-full border-2 border-[#4B0082] px-4 py-2 rounded-md hover:bg-white/10 transition-colors'
              >
                Sign Out
              </button>
            ) : (
              <Link
                href='/login'
                className='block w-full text-center border-2 border-[#4B0082] px-4 py-2 rounded-md hover:bg-white/10'
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Desktop Menu */}
      <nav className='hidden lg:flex items-center gap-8'>
        <ul className='flex items-center gap-6'>
          {mainLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-4 py-2 rounded-full transition-colors text-base lg:text-lg ${
                  pathname.startsWith(link.href)
                    ? 'font-bold text-white/80 '
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
            Sign Out
          </button>
        ) : (
          <Link
            href='/login'
            className='bg-white bg-opacity-10 backdrop-blur-lg backdrop-filter rounded-full shadow-lg px-6 py-2 flex items-center justify-center'
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}
