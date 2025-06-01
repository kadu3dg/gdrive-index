'use client';

import { SearchBar } from './SearchBar';
import { ThemeSelector } from './ThemeSelector';

export function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
              DW GDINDEX
            </h1>
            <div className="sm:hidden">
              <ThemeSelector />
            </div>
          </div>
          <div className="w-full flex items-center gap-4">
            <SearchBar />
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 