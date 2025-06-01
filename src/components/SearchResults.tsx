'use client';

import { useSearch } from '@/contexts/SearchContext';
import { useEffect } from 'react';

export function SearchResults() {
  const { searchTerm, isSearching, searchResults, setSearchResults, setIsSearching } = useSearch();

  useEffect(() => {
    async function performSearch() {
      if (!searchTerm) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        // Aqui você deve implementar a chamada à sua API do Google Drive
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Erro ao buscar:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }

    if (searchTerm) {
      performSearch();
    }
  }, [searchTerm, setSearchResults, setIsSearching]);

  if (!searchTerm) return null;

  return (
    <div className="mt-4">
      {isSearching ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((item: any) => (
            <div
              key={item.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(item.modifiedTime).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Nenhum resultado encontrado para "{searchTerm}"
        </p>
      )}
    </div>
  );
} 