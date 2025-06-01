'use client';

import { useSearch } from '@/contexts/SearchContext';
import { useEffect } from 'react';
import Image from 'next/image';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size?: string;
  webContentLink?: string;
}

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
      setIsSearching(true);
      const debounceTimer = setTimeout(performSearch, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm, setSearchResults, setIsSearching]);

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('video')) return '🎥';
    if (mimeType.includes('image')) return '🖼️';
    if (mimeType.includes('audio')) return '🎵';
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('folder')) return '📁';
    return '📄';
  };

  const formatFileSize = (size?: string) => {
    if (!size) return '';
    const bytes = parseInt(size);
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  if (!searchTerm) return null;

  return (
    <div className="mt-4 px-4 sm:px-0">
      {isSearching ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((item: DriveFile) => (
            <a
              key={item.id}
              href={item.webContentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl" role="img" aria-label="file icon">
                  {getFileIcon(item.mimeType)}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {item.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>{new Date(item.modifiedTime).toLocaleDateString()}</span>
                    {item.size && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>{formatFileSize(item.size)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </a>
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