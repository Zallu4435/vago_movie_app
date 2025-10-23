import { useState, useEffect } from 'react';
import { useDebounce } from '@hooks/useDebounce';
import { SEARCH_DEBOUNCE_DELAY } from '@utils/constants';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_DELAY);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies... (e.g., Batman, Inception)"
          className="w-full pl-12 pr-24 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200 transition-all"
        />

        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
          {isLoading && (
            <div className="h-5 w-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
          )}
          
          {query && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {query && debouncedQuery !== query && (
        <p className="mt-2 text-sm text-gray-500 text-center">
          Searching for "{query}"...
        </p>
      )}
    </div>
  );
};