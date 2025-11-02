import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '@components/movies/SearchBar/SearchBar';
import { MovieList } from '@components/movies/MovieList/MovieList';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { EmptyState } from '@components/common/EmptyState/EmptyState';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { Pagination } from '@components/common/Pagination/Pagination';
import { useMovieSearch } from '@hooks/useMovieSearch';
import { MESSAGES } from '@utils/constants';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const urlPage = searchParams.get('page') || '1';
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const isRestoringRef = useRef(false);
  
  const {
    movies,
    isLoading,
    error,
    totalResults,
    currentPage,
    hasSearched,
    searchMovies,
  } = useMovieSearch();

  useEffect(() => {
    if (urlQuery) {
      isRestoringRef.current = true;
      setSearchQuery(urlQuery);
      searchMovies(urlQuery, parseInt(urlPage, 10));
      
      sessionStorage.setItem('lastSearch', urlQuery);
      sessionStorage.setItem('lastPage', urlPage);
      
      setTimeout(() => {
        isRestoringRef.current = false;
      }, 100);
    } else {
      const lastSearch = sessionStorage.getItem('lastSearch');
      const lastPage = sessionStorage.getItem('lastPage');
      
      if (lastSearch) {
        setSearchParams({ q: lastSearch, page: lastPage || '1' });
      }
    }
  }, [urlQuery, urlPage]);

  const handleSearch = useCallback((query: string) => {
    if (isRestoringRef.current) return;
    
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    
    if (trimmedQuery) {
      setSearchParams({ q: trimmedQuery, page: '1' });
    } else {
      sessionStorage.removeItem('lastSearch');
      sessionStorage.removeItem('lastPage');
      setSearchParams({});
      searchMovies('');
    }
  }, [setSearchParams, searchMovies]);

  const handlePageChange = useCallback((page: number) => {
    if (searchQuery) {
      searchMovies(searchQuery, page);
      setSearchParams({ q: searchQuery, page: page.toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchQuery, searchMovies, setSearchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 px-2">
            Discover Your Favorite Movies
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Search millions of movies and save your favorites
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} initialValue={searchQuery} />
        </div>

        {/* Search Results */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage 
              message={error} 
              onRetry={() => searchMovies(searchQuery, currentPage)} 
            />
          ) : !hasSearched ? (
            <EmptyState
              icon="🔍"
              title="Start Searching"
              message={MESSAGES.SEARCH_EMPTY}
            />
          ) : movies.length === 0 ? (
            <EmptyState
              icon="😕"
              title="No Results Found"
              message={MESSAGES.SEARCH_NO_RESULTS}
            />
          ) : (
            <>
              <div className="mb-6 sm:mb-8 px-2">
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  Found <span className="font-semibold text-gray-900">{totalResults}</span> results
                  {searchQuery && (
                    <span className="block sm:inline mt-1 sm:mt-0">
                      {' '}for "<span className="font-semibold text-gray-900">{searchQuery}</span>"
                    </span>
                  )}
                </p>
              </div>

              <MovieList movies={movies} />

              {totalResults > 10 && (
                <div className="mt-8 sm:mt-10 md:mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalResults={totalResults}
                    resultsPerPage={10}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};