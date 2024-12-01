import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import ClientWrapper from './components/ClientWrapper';
import './globals.css';
import { Providers } from './providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
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
      <head>
        <link
          rel='preload'
          href='/fonts/GeistVF.woff'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
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
