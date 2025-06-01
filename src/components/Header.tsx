'use client';

import { SearchBar } from './SearchBar';
import { ThemeSelector } from './ThemeSelector';

export function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              DW GDINDEX
            </h1>
            <SearchBar />
          </div>
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
} 