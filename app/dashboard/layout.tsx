'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, Globe, Layout, Settings } from 'react-feather';
import BreadcrumbsNavigation from '../components/BreadCrumbsNavigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <Layout /> },
    { name: 'My Trips', href: '/dashboard/myTrips', icon: <Globe /> },
    { name: 'Statistics', href: '/dashboard/statistics', icon: <BarChart2 /> },
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
    <main className='text-white grid grid-cols-8 w-full min-h-full mt-52 mx-6'>
      {/* Sidebar */}
      <aside className='col-span-2 px-6 bg-black/30 rounded-md mt-2'>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href} className='mb-2 my-4 w-full'>
              <Link
                href={item.href}
                className={`flex  justify-start items-center gap-4 w-full p-2 rounded-md text-lg ${
                  pathname === item.href
                    ? 'bg-gradient-to-r  from-[#E91E63] to-[#4B0082] text-white'
                    : 'bg-transparent hover:bg-gradient-to-r  from-[#E91E63]/50 to-[#4B0082]/50 text-white transition-all duration-300 ease-in-out'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <section className=' col-span-6 p-4'>
        <BreadcrumbsNavigation paths={breadcrumbs} />
        {children}
      </section>
    </main>
  );
}
