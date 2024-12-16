import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import ClientWrapper from './components/ClientWrapper';
import './globals.css';
import { Providers } from './providers';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Digital Travel Journal',
  description:
    'A web application designed for users to document their travel experiences',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${dmSans.className} antialiased flex flex-col h-full min-h-screen`}
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
