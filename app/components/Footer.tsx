import Link from 'next/link';

const socialLinks = [
  { href: '/facebook', label: 'Facebook' },
  { href: '/instagram', label: 'Instagram' },
  { href: '/twitter', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className='absolute bottom-8 left-32 z-50 text-white'>
      <ul className=' flex justify-center items-center gap-3'>
        {socialLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className=' font-thin'>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
