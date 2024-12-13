'use client';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Eye,
  Grid,
  Image as ImageIcon,
  MapPin,
  Settings,
  TrendingUp,
} from 'react-feather';
import BreadcrumbsNavigation from '../components/BreadCrumbsNavigation';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuthStore } from '../store/useAuthStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const { user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  const menuItems = [
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

  const breadcrumbs = [
    { name: 'Dashboard', href: '/dashboard' },
    ...(pathname.includes('/myTrips')
      ? [
          { name: 'My Trips', href: '/dashboard/myTrips' },
          ...(params.id
            ? [
                {
                  name: `Trip Details`,
                  href: undefined,
                },
              ]
            : []),
        ]
      : []),
    ...(pathname.includes('/dashboard/postcard-creator')
      ? [{ name: 'Postcard Creator', href: '/dashboard/postcard-creator' }]
      : []),
    ...(pathname.includes('/statistics')
      ? [{ name: 'Statistics', href: '/dashboard/statistics' }]
      : []),
    ...(pathname.includes('/settings')
      ? [{ name: 'Settings', href: '/dashboard/settings' }]
      : []),
    ...(pathname.includes('/savedPostcards')
      ? [{ name: 'View Your Postcards', href: '/dashboard/savedPostcards' }]
      : []),
  ];

  return (
    <main className='text-white flex flex-col md:grid md:grid-cols-8 w-full min-h-screen mt-28 mx-6 relative'>
      <aside
        className={`hidden md:flex top-30 w-full md:top-0 left-0 z-40 md:col-span-2 bg-black md:bg-black/30 rounded-md h-screen transition-transform duration-300 ease-in-out md:translate-x-0 px-6`}
      >
        <ul className='w-full'>
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

      <section className='col-span-6 p-4 min-h-screen bg-black/10 rounded-md md:relative z-10'>
        <BreadcrumbsNavigation paths={breadcrumbs} />
        {children}
      </section>
    </main>
  );
}
