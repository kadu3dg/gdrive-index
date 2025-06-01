'use client';

import Link from 'next/link';
import { ThemeSelector } from './ThemeSelector';

export function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            DW GDINDEX
          </Link>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
} 