'use client';

import { useState } from 'react';
import { useSearch } from '@/contexts/SearchContext';

export function SearchBar() {
  const { setSearchTerm, setIsSearching } = useSearch();
  const [inputValue, setInputValue] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsSearching(true);
    setSearchTerm(inputValue.trim());
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Buscar arquivos..."
        className="w-full px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                 text-gray-900 dark:text-gray-100"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1
                 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
} 