import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import ClientWrapper from './components/ClientWrapper';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Digital Travel Journal',
  description:
    'A web application designed for users to document their travel experiences',
};

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Head>
        <title>Digital Travel Journal</title>
        <Link rel='icon' href='/favicon.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon.png' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <body
        className={`${dmSans.className} antialiased flex flex-col  h-full min-h-screen`}
      >
        <Providers>
          <ClientWrapper>
            {children}
            <Toaster
              position='top-right'
              toastOptions={{
                success: {
                  style: {
                    background: '#0f6d0d',
                    color: 'white',
                  },
                  iconTheme: {
                    primary: 'white',
                    secondary: 'black',
                  },
                },
                error: {
                  style: {
                    background: '#E91E63',
                    color: 'white',
                  },
                  iconTheme: {
                    primary: 'white',
                    secondary: 'black',
                  },
                },
                duration: 3000,
              }}
            />
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
