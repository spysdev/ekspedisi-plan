// src/app/layout.tsx
import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Ekspedisi Plan',
  description: 'Aplikasi perencana perjalanan premium',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
