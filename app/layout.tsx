import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Digital Travel Journal',
  description:
    'A web application designed for users to document their travel experiences',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen `}
      >
        <Header />
        <main className='flex flex-1  gap-8 items-center justify-center'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
