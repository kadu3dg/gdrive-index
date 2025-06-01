'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <SearchContext.Provider 
      value={{ 
        searchTerm, 
        setSearchTerm, 
        isSearching, 
        setIsSearching, 
        searchResults, 
        setSearchResults 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 