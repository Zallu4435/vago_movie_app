import { useState, useCallback } from 'react';
import { Movie, SearchResult } from '@/types/movie.types';
import { movieApi } from '@services/api/movieApi';
import { useToast } from './useToast';

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { showError, showInfo } = useToast();

  const searchMovies = useCallback(async (query: string, page: number = 1) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      setMovies([]);
      setTotalResults(0);
      setHasSearched(false);
      setError(null);
      return;
    }
    
    if (trimmedQuery.length < 2 || trimmedQuery.length > 100) {
      showInfo('Type between 2 and 100 characters to search');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const result: SearchResult = await movieApi.searchMovies(query, page);
      setMovies(result.movies);
      setTotalResults(result.totalResults);
      setCurrentPage(page);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to search movies';
      setError(errorMessage);
      showError(errorMessage);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setMovies([]);
    setTotalResults(0);
    setCurrentPage(1);
    setError(null);
    setHasSearched(false);
  }, []);

  return {
    movies,
    isLoading,
    error,
    totalResults,
    currentPage,
    hasSearched,
    searchMovies,
    clearSearch,
  };
};
