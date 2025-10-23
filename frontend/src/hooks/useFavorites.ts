import { useState, useCallback, useEffect } from 'react';
import { Favorite, Movie } from '@/types/movie.types';
import { favoriteApi } from '@services/api/favoriteApi';
import { useToast } from './useToast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await favoriteApi.getFavorites();
      setFavorites(data.favorites);
      setFavoriteIds(new Set(data.favorites.map((f: Favorite) => f.imdbID)));
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch favorites';
      setError(err);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback(async (movie: Movie) => {
    const isFavorited = favoriteIds.has(movie.imdbID);

    // Optimistic update
    if (isFavorited) {
      setFavoriteIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(movie.imdbID);
        return newSet;
      });
      setFavorites(prev => prev.filter(f => f.imdbID !== movie.imdbID));
    } else {
      setFavoriteIds(prev => new Set(prev).add(movie.imdbID));
      const newFavorite: Favorite = {
        id: `temp-${movie.imdbID}`,
        imdbID: movie.imdbID,
        title: movie.title,
        year: movie.year,
        poster: movie.poster,
        type: movie.type,
        addedAt: new Date().toISOString(),
      };
      setFavorites(prev => [newFavorite, ...prev]);
    }

    try {
      const result = await favoriteApi.toggleFavorite({
        imdbID: movie.imdbID,
        title: movie.title,
        year: movie.year,
        poster: movie.poster,
        type: movie.type,
      });

      showSuccess(result.message);
      setError(null);

      await fetchFavorites();
    } catch (err: any) {
      if (isFavorited) {
        setFavoriteIds(prev => new Set(prev).add(movie.imdbID));
      } else {
        setFavoriteIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(movie.imdbID);
          return newSet;
        });
      }

      setError(err);
      await fetchFavorites();
    }
  }, [favoriteIds, showSuccess, showError, fetchFavorites]);

  const isFavorite = useCallback((imdbID: string): boolean => {
    return favoriteIds.has(imdbID);
  }, [favoriteIds]);

  const removeAllFavorites = useCallback(async () => {
    try {
      await favoriteApi.removeAllFavorites();
      setFavorites([]);
      setFavoriteIds(new Set());
      showSuccess('All favorites removed');
      setError(null);
    } catch (err: any) {
      setError(err);
      showError(err.message || 'Failed to remove favorites');
    }
  }, [showSuccess, showError]);

  return {
    favorites,
    favoriteIds,
    isLoading,
    error,
    toggleFavorite,
    isFavorite,
    removeAllFavorites,
    refreshFavorites: fetchFavorites,
  };
};
