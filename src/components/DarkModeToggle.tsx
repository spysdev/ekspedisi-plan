// src/components/DarkModeToggle.tsx
import React from 'react';

interface DarkModeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function DarkModeToggle({ theme, toggleTheme }: DarkModeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
