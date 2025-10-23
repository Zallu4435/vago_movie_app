import { useFavoritesContext } from '@context/FavoritesContext';
import { MovieCard } from '@components/movies/MovieCard/MovieCard';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { EmptyState } from '@components/common/EmptyState/EmptyState';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { MESSAGES } from '@utils/constants';
import { Favorite, Movie } from '@/types/movie.types';
import { Trash2 } from 'lucide-react';

export const FavoritesList = () => {
  const { favorites, isLoading, error, removeAllFavorites, refreshFavorites } = useFavoritesContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refreshFavorites} />;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <EmptyState
          icon="❤️"
          title="No Favorites Yet"
          message={MESSAGES.FAVORITES_EMPTY}
        />
      </div>
    );
  }

  const moviesFromFavorites: Movie[] = favorites.map((fav: Favorite) => ({
    imdbID: fav.imdbID,
    title: fav.title,
    year: fav.year,
    poster: fav.poster,
    type: fav.type,
  }));

  const handleClearAll = () => {
    if (window.confirm(`Are you sure you want to remove all ${favorites.length} favorites?`)) {
      removeAllFavorites();
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats & Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Your Collection
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
          </p>
        </div>
        
        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {moviesFromFavorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};
