import Link from 'next/link';
import { socialLinks } from '../data/socialMediaLinks';

interface FooterProps {
  positionClass?: string;
}

export default function Footer({ positionClass = '' }: FooterProps) {
  return (
    <footer
      className={`absolute flex justify-between gap-1 sm:gap-8 items-center text-white z-40 ${positionClass}`}
    >
      <div className='w-8 ml-4 sm:ml-0 lg:w-32 h-[0.1px] border-b border-white'></div>
      <ul className='flex justify-center items-center gap-2 sm:gap-5 rounded-full'>
        {socialLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
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
