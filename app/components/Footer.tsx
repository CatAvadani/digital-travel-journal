import Link from 'next/link';
import { Dribbble, Facebook, GitHub, Instagram } from 'react-feather';

const socialLinks = [
  {
    href: 'https://www.facebook.com/',
    icon: <Facebook className='sm:size-6' />,
    label: 'Visit our Facebook page',
  },
  {
    href: 'https://www.instagram.com/',
    icon: <Instagram className='sm:size-6' />,
    label: 'Visit our Instagram profile',
  },
  {
    href: 'https://dribbble.com/',
    icon: <Dribbble className='sm:size-6' />,
    label: 'Visit our Dribbble profile',
  },
  {
    href: 'https://github.com/CatAvadani',
    icon: <GitHub className='sm:size-6' />,
    label: 'Visit our Github profile',
  },
];

export default function Footer() {
  return (
    <footer
      className='absolute flex justify-between gap-8 items-center bottom-10 lg:bottom-10
    sm:left-24 md:left-32 z-50 text-white'
    >
      <div className='w-8 ml-4 lg:w-32 h-[0.1px] border-b border--white'></div>
      <ul className='flex justify-center items-center gap-3 sm:gap-5  rounded-full'>
        {socialLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className='font-normal text-white/70 hover:text-white transition-all'
              aria-label={link.label}
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
