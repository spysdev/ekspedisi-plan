"use client";
import React, { useEffect, useState } from 'react';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold">Ekspedisi Plan</h1>
        <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main className="min-h-screen">{children}</main>
    </>
  );
}
