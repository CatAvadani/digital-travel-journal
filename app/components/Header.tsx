'use client';
import Link from 'next/link';
import { useAuthStore } from '../lib/store';

const links = [
  { href: '/myAdventures', label: 'My Adventures' },
  { href: '/explore', label: 'Explore' },
];

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className='flex justify-between py-4 px-10 bg-gray-300'>
      <Link href='/' className='text-2xl'>
        Digital Travel Journal
      </Link>
      <div className='flex gap-5 justify-center items-center'>
        <ul className='flex justify-evenly gap-5'>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        {user ? (
          <button
            onClick={logout}
            className='border border-white px-4 py-2 rounded-md'
          >
            Logout
          </button>
        ) : (
          <Link
            href='/login'
            className='border border-white px-4 py-2 rounded-md'
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
