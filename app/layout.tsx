import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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

const inter = Inter({
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
      <body
        className={`${inter.className} antialiased flex flex-col defaultBackground bg-no-repeat h-full min-h-screen`}
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
