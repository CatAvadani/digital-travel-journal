import Link from 'next/link';

const links = [
  { href: '/myAdventures', label: 'My Adventures' },
  { href: '/explore', label: 'Explore' },
];

export default function Header() {
  return (
    <header className="flex justify-between py-4 px-10 bg-gray-300">
      <Link href="/" className="text-2xl">
        Digital Travel Journal
      </Link>
      <div className="flex gap-5  justify-center items-center">
        <ul className=" flex justify-evenly gap-5 ">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <button className="border border-white px-4 py-2 rounded-md">
          Login
        </button>
      </div>
    </header>
  );
}
