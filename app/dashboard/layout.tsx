'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BreadcrumbsNavigation from '../components/BreadCrumbsNavigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Trips', href: '/dashboard/myTrips' },
    { name: 'Statistics', href: '/dashboard/statistics' },
    { name: 'Settings', href: '/dashboard/settings' },
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
            <li key={item.href} className='mb-2 px-2 my-4'>
              <Link
                href={item.href}
                className={`hover:underline ${
                  pathname === item.href ? 'text-blue-500 font-bold' : ''
                }`}
              >
                {item.name}
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
