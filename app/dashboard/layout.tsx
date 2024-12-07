'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  MapPin,
  Settings,
  TrendingUp,
} from 'react-feather';
import BreadcrumbsNavigation from '../components/BreadCrumbsNavigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Grid className='size-4 md:size-6' />,
    },
    { name: 'My Trips', href: '/dashboard/myTrips', icon: <MapPin /> },
    { name: 'Statistics', href: '/dashboard/statistics', icon: <TrendingUp /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings /> },
  ];

  const breadcrumbs = [
    { name: 'Dashboard', href: '/dashboard' },
    ...(pathname.includes('/myTrips')
      ? [{ name: 'My Trips', href: '/dashboard/myTrips' }]
      : []),
    ...(pathname.includes('/statistics')
      ? [{ name: 'Statistics', href: '/dashboard/statistics' }]
      : []),
    ...(pathname.includes('/settings')
      ? [{ name: 'Settings', href: '/dashboard/settings' }]
      : []),
    ...(pathname.includes('/myTrips/') ? [{ name: 'Trip Details' }] : []),
  ];

  return (
    <main className='text-white flex flex-col md:grid md:grid-cols-8 w-full min-h-screen mt-28 mx-6 relative'>
      <button
        className='block md:hidden fixed top-20 left-7 z-50 bg-gradient-to-r from-[#E91E63] to-[#4B0082] text-white p-2 rounded-md'
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
      >
        {isExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <aside
        className={`fixed md:relative top-30 w-[70%] md:w-full md:top-0 left-0 z-40 md:col-span-2 bg-black md:bg-black/30 rounded-md h-screen transition-transform duration-300 ease-in-out ${
          isExpanded ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 px-6`}
      >
        <ul>
          {menuItems.map((item) => (
            <li key={item.href} className='mb-2 my-4 w-full'>
              <Link
                href={item.href}
                className={`flex justify-start items-center gap-4 w-full p-2 rounded-md text-sm md:text-lg ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-[#E91E63] to-[#4B0082] text-white'
                    : 'bg-transparent hover:bg-gradient-to-r from-[#E91E63]/50 to-[#4B0082]/50 text-white transition-all duration-300 ease-in-out'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {isExpanded && (
        <div
          className='fixed inset-0 bg-black/50 z-30 md:hidden'
          onClick={() => setIsExpanded(false)}
          aria-hidden='true'
        />
      )}

      <section className='col-span-6 p-4 min-h-screen bg-black/10 rounded-md md:relative z-10'>
        <BreadcrumbsNavigation paths={breadcrumbs} />
        {children}
      </section>
    </main>
  );
}
