import { Favorite, Movie } from './movie.types';

export interface FavoritesContextType {
  favorites: Favorite[];
  favoriteIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (movie: Movie) => Promise<void>;
  isFavorite: (imdbID: string) => boolean;
  removeAllFavorites: () => Promise<void>;
  refreshFavorites: () => Promise<void>;
}