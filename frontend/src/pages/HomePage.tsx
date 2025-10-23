import { useState, useCallback } from 'react';
import { SearchBar } from '@components/movies/SearchBar/SearchBar';
import { MovieList } from '@components/movies/MovieList/MovieList';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { EmptyState } from '@components/common/EmptyState/EmptyState';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { Pagination } from '@components/common/Pagination/Pagination';
import { useMovieSearch } from '@hooks/useMovieSearch';
import { MESSAGES } from '@utils/constants';

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    movies,
    isLoading,
    error,
    totalResults,
    currentPage,
    hasSearched,
    searchMovies,
  } = useMovieSearch();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    searchMovies(query, 1);
  }, [searchMovies]);

  const handlePageChange = useCallback((page: number) => {
    if (searchQuery) {
      searchMovies(searchQuery, page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchQuery, searchMovies]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Discover Your Favorite Movies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search millions of movies and save your favorites
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Search Results */}
        <div className="mt-12">
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
              <div className="mb-8">
                <p className="text-gray-600 text-sm">
                  Found <span className="font-semibold text-gray-900">{totalResults}</span> results
                  {searchQuery && (
                    <span> for "<span className="font-semibold text-gray-900">{searchQuery}</span>"</span>
                  )}
                </p>
              </div>

              <MovieList movies={movies} />

              {totalResults > 10 && (
                <div className="mt-12">
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