'use client';

import Link from 'next/link';

export default function BreadcrumbsNavigation({
  paths,
}: {
  paths: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label='Breadcrumb' className='mb-4'>
      <ol className='flex text-base text-white/80 space-x-2'>
        {paths.map((path, index) => (
          <li key={index} className='flex items-center'>
            {path.href ? (
              <Link href={path.href} className='hover:underline'>
                {path.name}
              </Link>
            ) : (
              <span className='text-pink-500'>{path.name}</span>
            )}
            {index < paths.length - 1 && <span className='mx-2'>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
