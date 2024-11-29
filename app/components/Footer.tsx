import Link from 'next/link';
import { CgDribbble } from 'react-icons/cg';
import { FaInstagram } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { SiSquarespace } from 'react-icons/si';

const socialLinks = [
  { href: '/facebook', icon: <FiFacebook className='sm:size-6' /> },
  { href: '/instagram', icon: <FaInstagram className='sm:size-6' /> },
  { href: '/squarespace', icon: <SiSquarespace className=' sm:size-6' /> },
  { href: '/dribbble', icon: <CgDribbble className='sm:size-6' /> },
];

export default function Footer() {
  return (
    <footer
      className='absolute flex justify-between gap-8 items-center bottom-10 lg:bottom-10
    sm:left-24 md:left-32 z-50 text-white'
    >
      <div className='w-4 ml-4 lg:w-32 h-[0.1px] border-b border--white'></div>
      <ul className=' flex justify-center items-center gap-3'>
        {socialLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className=' font-normal hover:text-white/70 transition-all'
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
